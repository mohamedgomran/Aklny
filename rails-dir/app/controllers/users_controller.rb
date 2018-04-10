class UsersController < ApplicationController
     before_action :authenticate_user,  only: [:auth]

    def register
        # password_digest
        uparams = params.permit(:name, :email, :password)
        # puts uparams
        @user = User.create(uparams)
        if User.find_by(email:uparams[:email])
            render json: { success: false, message:  User.find_by(email:uparams[:email]).select(:email, :name, :id, :pic)}
        elsif @user.save
            render json: { success: true, message: 'user added' }
        else
            render json: { success: false, message: @user.errors }
        end 
    end
    ###########################################forgetPassword###############33

        def forgetPassword()
                    
              uparams = params.permit(:email) 
            @user=User.find_by(email:uparams[:email])
            if User.find_by(email:uparams[:email])
                @user.update_attributes(password: 'yallanotlob38')
                 ApplicationMailer.send_mail(@user.email,'yallanotlob38','Yallanotlob Reset Password').deliver_now
                render json: { success: true, message:  User.find_by(email:uparams[:email]).select(:email, :name, :id, :pic)}
            else
                render json: { success: false, message:'invalid user mail in db' }
            end 
          
        end


    ################################user id to be get from authentication ##################################
    def add_friend
        # user_id = 5 #to be get from authentication
        user_id = current_user.id
        @user = User.find(user_id);
        @friend = User.find_by(email: params[:email]).select(:email, :name, :id, :pic);

        if @user.friends.include?(@friend)
            render json: {success: false, message: "already a friend"}
        elsif @friend != [] && params[:email] != @user.email && @friend
        	@user.friends << @friend
            render json: {success: true, message: @user.friends}
        else
            render json: {success: false, message: "Friend Not found"}
        end
    end            

    ################################user id to be get from authentication ##################################
    def del_friend
        user_id = current_user.id
        @user = User.find(user_id);
        @friend = User.find(params[:friend_id].to_i).select(:email, :name, :id, :pic);

        if User.find(user_id).friends.include?(@friend)
			@user.friends.delete(@friend)
            render json: {success: true, message: "friend deleted"}
        else
            render json: {error: true, message: @friend}
        end
    end
  
    ################################user id to be get from authentication ##################################    
    def list_friends
        # user_id = ####
        user_id = current_user.id        
        @friends = User.find(user_id).friends.select(:email, :name, :id, :pic)
        render json: {success: true, message: @friends}
    end

    ################################user id to be get from authentication ##################################        
    def list_notifications
        user_id = current_user.id
        @join_notif=[]
        @invite_notif = []
        @myorders = User.find(user_id).orders.find_each do |order|
            order.notifications.where(notification_type: "join").limit(5).order(created_at: :desc).each do |notif|
                user= User.where(id: notif.user_id).select(:id,:name, :pic)[0]
                @join_notif << {order_id: notif.order_id, order_for: order.order_for, invited: user, created_at: notif.created_at}
            end
        end
        Notification.where(user_id: user_id,notification_type: "invitation").limit(5).order(created_at: :desc).each do |notif|
            user = {name: Order.find(notif.order_id).user.name, id: Order.find(notif.order_id).user.id}
            @invite_notif << {order_id: notif.order_id, order_for: Order.find(notif.order_id).order_for,res_name: Order.find(notif.order_id).res_name , host: user, created_at: notif.created_at}
        end
        render json: {success: true, message: {join_notif: @join_notif, invite_notif: @invite_notif }}
    end

    ################################user id to be get from authentication ##################################            
    def list_my_orders
        p "current user is ",current_user.id
        user_id= current_user.id
        render json: User.find(user_id).orders
    end

    ################################user id to be get from authentication ##################################            
    def list_joined_orders
        user_id= current_user.id    
        @joinedOrders = []
        Notification.where(user_id: user_id, notification_type: "join", notification_type: "invitation" ).find_each do |notif|
            @joinedOrders << Order.find(notif.order_id)
        end
        render json: {success: true, message: @joinedOrders}
    end
end
