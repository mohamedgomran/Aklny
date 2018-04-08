class OrdersController < ApplicationController
    before_action :authenticate_user,  only: [:auth]

    def create
        params.require(:order).permit!
        # user_id = 1 #to be get from authentication
        user_id = current_user.id
        params[:order][:user_id] = user_id
        @order = Order.new(params[:order])
        if @order.save
            invited = params[:invited]
            self.class.notify(invited,"invitation",@order.id,"true");
            render json: {success: true, message: invited}
        else
            render json: {success: false, message: @order.errors}
        end
    end

    def delete
    	Order.delete(params[:oid])
        render json: {success: true, message: "order deleted"}
    end

    def edit
        params.require(:order).permit!
    	@order = Order.find(params[:oid])
    	if @order
    		@order.update(params[:order])
        	render json: {success: true, message: "order updated"}
    	end
    end

    def list
        # user_id = 1 #to be get from authentication
        user_id = current_user.id
        render json: User.find(user_id).orders
    end

    def join
        user_id = current_user.id
        p user_id
        @notification = Notification.find_by(order_id: params[:oid], user_id: user_id, notification_type: "invitation")
        if @notification
            self.class.notify([user_id],"join",params[:oid],"false")
            render json: {success: true, message:  @order}
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
            #action cable here
        end
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
end
