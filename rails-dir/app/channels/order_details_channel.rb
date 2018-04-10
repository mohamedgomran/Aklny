class OrderDetailsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "order_details_#{params[:oid]}_#{current_user.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
