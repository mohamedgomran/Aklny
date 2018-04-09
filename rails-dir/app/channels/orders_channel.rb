class OrdersChannel < ApplicationCable::Channel
  def subscribed
    stream_from "joined"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
