class OrderDetailsController < ApplicationController
    before_action :authenticate_user,  only: [:auth]

    def create
        params.require(:order_detail).permit!
        user_id = current_user.id
        @order = Order.find(params[:oid])
        if @order
        	params[:order_detail][:order_id] = params[:oid].to_i
        	params[:order_detail][:user_id] = user_id
        	@order_item = OrderDetail.new(params[:order_detail])
            if @order_item.save
                Notification.where(order_id=params[:oid], notification_type="join").find_each do |notif|
                    p "sssssssssssssssssssssssssssssssssssssssssssssssss"
                    ActionCable.server.broadcast "order_details_#{params[:oid]}_#{notif.user_id}", self.listRefresh(params[:oid])
                end
                ActionCable.server.broadcast "order_details_#{params[:oid]}_#{@order.user_id}", self.listRefresh(params[:oid])                
	            render json: {success: true, message: user_id}
	        else
	            render json: {success: false, message: @order_item.errors}
	        end
    	end
    end
    def listRefresh(oid)
        @order_details = Order.find(oid).order_details.map{ |order|
                user_name = User.find(order.user_id)
                order = order.as_json
                order[:user_name] = user_name
                order
            }
            @order_details
    end
    
    def list
        user_id = current_user.id
        if User.find(user_id).orders.include?(Order.find(params[:oid])) || Notification.where(order_id: params[:oid], user_id: user_id).count > 0
            @order_details = listRefresh(params[:oid])
            render json: {success: true, message:@order_details}
        else
            render json: {success: false, message: 'Order Not Found'}            
        end
    end

    def delete
        user_id = current_user.id
        if OrderDetail.where(user_id: user_id, id: params[:iid] )
            OrderDetail.delete(params[:iid])
            Notification.where(order_id=params[:oid], notification_type="join").find_each do |notif|
                ActionCable.server.broadcast "order_details_#{params[:oid]}_#{notif.user_id}", self.listRefresh(params[:oid])
            end
            ActionCable.server.broadcast "order_details_#{params[:oid]}_#{@order.user_id}", self.listRefresh(params[:oid])  
            render json: {success: true, message: "item deleted"}
        end
        render json: {success: false, message: "item Not Found"}
    end
end
