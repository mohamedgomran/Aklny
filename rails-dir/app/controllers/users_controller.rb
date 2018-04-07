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


    



end
