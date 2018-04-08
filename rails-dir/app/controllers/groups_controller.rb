class GroupsController < ApplicationController
    before_action :authenticate_user,  only: [:auth]


    def create
        params.require(:group).permit!
        # user_id = 5 #to be get from authentication
        user_id = current_user.id
		if User.find(user_id).user_groups.find_by(params[:group])
            render json: {success: false, message: 'dublicate'}
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

    def list
        user_id = 5 #to be get from authentication
        @user = User.find(user_id)
        render json: @user.user_groups.select(:id, :name)
    end

    def add_member
        # params.require(:group).permit!
        user_id = 5 #to be get from authentication
        @user = User.find(user_id)
        @group = Group.find(params[:gid])
        @friend = User.find(params[:friend_id])
		if @user.user_groups.include?(@group) && @group.users.include?(@friend)
            render json: {success: false, message: "already added"}
        elsif @group && @friend
        	@group.users << @friend
            render json: {success: true, message: "friend added"}
        end
    end

    def del_member
        user_id = 5 #to be get from authentication
        @user = User.find(user_id)
        @group = Group.find(params[:gid])
        @friend = User.find(params[:fid])
		if @user.user_groups.include?(@group) && @group.users.include?(@friend)
			@group.users.delete(@friend)
            render json: {success: true, message: "friend deleted"}
        else
            render json: {success: false, message: "group or friend not found"}
        end
    end

    def list_members
        @group = Group.find(params[:gid])
        render json: @group.users.select(:id, :name)
    end
end
