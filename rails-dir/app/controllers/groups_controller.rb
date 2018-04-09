class GroupsController < ApplicationController
    before_action :authenticate_user,  only: [:auth]



    def create
        params.require(:group).permit!
        # user_id = 1
        user_id = current_user.id
        @user = User.find(user_id)
        if @user.user_groups.find_by(params[:group])
            render json: {success: false, message: 'Dublicate!'}
        else
        	params[:group][:user_id] = user_id
            @group = Group.new(params[:group]) 
            if @group.save
                render json: {success: true, message: @user.user_groups}
            else
                render json: {success: false, message: @group.errors}
            end
        end
    end

    def list
        #  user_id = 44 #to be get from authentication
        user_id = current_user.id
        puts user_id
        @user = User.find(user_id)
        render json: @user.user_groups.select(:id, :name)
    end

    def delete
        # user_id = 5 #to be get from authentication
        user_id = current_user.id
        @user = User.find(user_id)
        @group = Group.find(params[:gid])
        if @user.user_groups.include?(@group)
            @user.user_groups.delete(@group)
            render json: {success: true, message: @user.user_groups}
        else
            render json: {success: false, message: "error"}
        end
    end

    def add_member
        # params.require(:group).permit!
        # user_id = 5 #to be get from authentication
        user_id = current_user.id
        @user = User.find(user_id)
        @group = Group.find(params[:gid])
        @friend = User.find_by(email: params[:email])
		if @user.user_groups.include?(@group) && @group.users.include?(@friend)
            render json: {success: false, message: "already added"}
        elsif @group && @friend
        	@group.users << @friend
            render json: {success: true, message: @group.users.select(:email, :name, :id)}
        else
            render json: {success: false, message: "Email not found"}
        end
    end

    def del_member
        # user_id = 5 #to be get from authentication
        user_id = current_user.id
        @user = User.find(user_id)
        @group = Group.find(params[:gid])
        @friend = User.find(params[:fid])
		if @user.user_groups.include?(@group) && @group.users.include?(@friend)
			@group.users.delete(@friend)
            render json: {success: true, message: @group.users}
        else
            render json: {success: false, message: "group or friend not found"}
        end
    end

    def list_members
        @group = Group.find(params[:gid])
        render json: {success: true, message: @group.users.select(:email, :name, :id)}
    end
end
