class MyNotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notifications_#{current_user.id}"
    p {current_user.id}
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
