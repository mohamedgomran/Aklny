class ApplicationController < ActionController::API
    # include ActionController::Serialization
    include Knock::Authenticable
    
    before_action :authenticate_user,  only: [:auth]
    def self.list_notifications(uid)
        user_id = uid
        @join_notif=[]
        @invite_notif = []
        @myorders = User.find(user_id).orders.find_each do |order|
            order.notifications.where(notification_type: "join").order(created_at: :desc).each do |notif|
                user= User.where(id: notif.user_id).select(:id,:name)[0]
                @join_notif << {order_id: notif.order_id, order_for: order.order_for, invited: user, created_at: notif.created_at}
            end
        end
        Notification.where(user_id: user_id,notification_type: "invitation").order(created_at: :desc).each do |notif|
            user = {name: Order.find(notif.order_id).user.name, id: Order.find(notif.order_id).user.id}
            @invite_notif << {order_id: notif.order_id, order_for: Order.find(notif.order_id).order_for, host: user, created_at: notif.created_at}
        end
        {success: true, message: {join_notif: @join_notif, invite_notif: @invite_notif }}
    end
end
