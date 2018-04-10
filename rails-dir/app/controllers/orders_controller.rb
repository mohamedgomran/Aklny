class OrdersController < ApplicationController
    before_action :authenticate_user,  only: [:auth]

    def create
        params.require(:order).permit!
        user_id = current_user.id
        params[:order][:user_id] = user_id
        @order = Order.new(params[:order])
        if @order.save
            invited = params[:invited]
            self.class.notify(invited,"invitation",@order.id,"true");
            render json: {success: true, message: @order}
        else
            render json: {success: false, message: @order.errors}
        end
    end

    def delete
    	Order.delete(params[:oid])
        list(current_user.id)
    end

    def finish
        # params.require(:order).permit!
    	@order = Order.find(params[:oid])
    	if @order
    		@order.update(status:"finished")
        	# return the updated orders, call list method
            list(current_user.id)
    	end
    end

    def list(uid=current_user.id)
        user_id = uid
        @orders = User.find(user_id).orders
        @orders = @orders.map { |order| 
            invited = order.notifications.where(notification_type:"invitation").count
            joined = order.notifications.where(notification_type:"join").count
            order = order.as_json
            order[:invited], order[:joined] = invited, joined
            order
        }
        render json: {success: true, message: @orders}
    end

    
    def join
        user_id = current_user.id
        p user_id
        orderOwner_id = Order.find(params[:oid]).user.id
        @notification = Notification.find_by(order_id: params[:oid], user_id: user_id, notification_type: "invitation")
        if @notification
            self.class.notify([user_id],"join",params[:oid],"false")
            render json: {success: true, message:  orderOwner_id}
        end
    end

    def self.notify(users,type,oid,invited) 
        users.each do |user|
            notif = {
                notification_type: type,
                order_id: oid,
                invited: invited,
                user_id: user,
            }
            @notification = Notification.create(notif);
            ActionCable.server.broadcast "notifications_#{user}",ApplicationController.list_notifications(user)
        end
        orderOwner_id = Order.find(oid).user.id
        ActionCable.server.broadcast "notifications_#{orderOwner_id}",ApplicationController.list_notifications(orderOwner_id)                    
    end

    def show_invited
        params.permit(:oid)
        @invited = []
        Notification.where(order_id: params[:oid], notification_type: "invitation").find_each do |notif|
            user = User.find(notif.user_id)
            @invited << user
        end
        render json: {success: true, message: @invited}
    end

    def show_joined
        params.permit(:oid)
        @joined = []
        Notification.where(order_id: params[:oid], notification_type: "join").find_each do |notif|
            user = User.find(notif.user_id)
            @joined << user
        end
        render json: {success: true, message: @joined}
    end
    def get_order
        params.permit(:oid)
        @order = Order.find(params[:oid])
        render json: {success: true, message: @order}
    end
end
