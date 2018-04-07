class UsersController < ApplicationController
    def register
        uparams = params.permit(:name, :email, :password_digest)
        @user = User.create(uparams)
        if @user.save
            render json: { success: true, message: 'user added' }
        else
            render json: { success: false, message: @user.errors }
        end 
    end


    def add_friend
        params.permit(:email)
        # user_id = 5 #to be get from authentication
        @user = User.find(params[:id].to_i);
        @friend = User.where(email: params[:email]);

        render json: {error: true, message: params}
        # email = params[:fid]
        # @friend = User.where(email: params[:email]);

        # if @user.friends.include?(@friend)
        #     render json: {success: false, message: "already a friend"}
        # elsif @friend != [] && params[:friend_email] != @user.email
        # 	@user.friends << @friend
        #     render json: {success: true, message: "user added"}
        # else
        #     render json: {error: true, message: "error"}
        # end
    end
            

end
