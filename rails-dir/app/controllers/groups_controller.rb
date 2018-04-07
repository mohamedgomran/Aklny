class GroupsController < ApplicationController
    def create
        params.require(:group).permit!
        user_id = 5 #to be get from authentication
		if User.find(user_id).user_groups.find_by(params[:group])
            render json: {success: false, message: params}
        else
        	params[:group][:user_id] = user_id
            @group = Group.new(params[:group]) 
            if @group.save
                render json: {success: true, message: "group added"}
            else
                render json: {success: false, message: @group.errors}
            end
        end
    end

    def add_friend
        # params.require(:group).permit!
        user_id = 5 #to be get from authentication
        @user = User.find(user_id)
        @group = Group.find(params[:gid])
        @friend = User.find(params[:friend_id])
		if @user.user_groups.include?(@group) && @group.users.include?(@friend)
            render json: {success: false, message: "already added"}
        else
        	@group.users << @friend
            render json: {success: true, message: "friend added"}
        end
    end
end
