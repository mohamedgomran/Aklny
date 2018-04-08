class OrdersController < ApplicationController
    before_action :authenticate_user,  only: [:auth]

    def create
        params.require(:order).permit!
        # user_id = 5 #to be get from authentication
        user_id = current_user.id
        params[:order][:user_id] = user_id
        @order = Order.new(params[:order])
        if @order.save
            render json: {success: true, message: "order created"}
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

end
