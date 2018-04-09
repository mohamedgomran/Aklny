class OrderDetailsController < ApplicationController
    before_action :authenticate_user,  only: [:auth]

    def create
        params.require(:order_detail).permit!
        # user_id = 1 #to be get from authentication
        user_id = current_user.id
        @order = Order.find(params[:oid])
        if @order
        	params[:order_detail][:order_id] = params[:oid].to_i
        	params[:order_detail][:user_id] = user_id
        	@order_item = OrderDetail.new(params[:order_detail])
	    	if @order_item.save
	            render json: params
	        else
	            render json: {success: false, message: @order_item.errors}
	        end
    	end
    end

    def list
        # @user = (Order.find(params[:oid]).user_id)
        @order_details = Order.find(params[:oid]).order_details
        @order_details = @order_details.map{ |order|
            user_name = User.find(order.user_id)
            order = order.as_json
            order[:user_name] = user_name
            order
        }
        render json: {success: true, message:@order_details}
        # render json: @user
        
    end

    def delete
    	OrderDetail.delete(params[:iid])
        render json: {success: true, message: "item deleted"}
    end
end
