class OrdersController < ApplicationController
    def create
        params.require(:order).permit!
        user_id = 1 #to be get from authentication
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

    def list
        user_id = 1 #to be get from authentication
        render json: User.find(user_id).orders
    end

end
