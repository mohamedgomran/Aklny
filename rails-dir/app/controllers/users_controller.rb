class UsersController < ApplicationController
    def register
        # password_digest
        uparams = params.permit(:name, :email, :password)
        # puts uparams
        @user = User.create(uparams)
        if @user.save
            render json: { success: true, message: 'user added' }
        else
            render json: { success: false, message: @user.errors }
        end 
    end


    def add_friend
        # user_id = 5 #to be get from authentication
        @user = User.find(params[:id].to_i);
        @friend = User.where(email: params[:email]);

        if @user.friends.include?(@friend)
            render json: {success: false, message: "already a friend"}
        elsif @friend != [] && params[:email] != @user.email
        	@user.friends << @friend
            render json: {success: true, message: @user.friends}
        else
            render json: {error: true, message: @friend}
        end
    end            

    def del_friend
        # user_id = 5 #to be get from authentication
        @user = User.find(params[:id].to_i);
        @friend = User.find(params[:friend_id].to_i);

        if @user.friends.include?(@friend)
			@user.friends.delete(@friend)
            render json: {success: true, message: "friend deleted"}
        else
            render json: {error: true, message: @friend}
        end
    end            
end
