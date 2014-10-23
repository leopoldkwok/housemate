class PaypalController < ApplicationController

  require "pp-adaptive"

  def index
    # Here you will choose who to pay
  end

  def pay

    # p params[:email]
    # p params[:amount]
    # p current_user.email

    # Here we are paying that person
    client = AdaptivePayments::Client.new(
      :user_id       => ENV["PAYPAL_USERNAME"],
      :password      => ENV["PAYPAL_PASSWORD"],
      :signature     => ENV["PAYPAL_SIGNATURE"],
      :app_id        => ENV["PAYPAL_APP_ID"],
      :sandbox       => true
    )

    client.execute(:Pay,
      :action_type     => "PAY",
      :receiver_email  => params[:email],
      :receiver_amount => params[:amount],
      :currency_code   => "GBP",
      :cancel_url      => "http://localhost:3000",
      :return_url      => "http://localhost:3000"
    ) do |response|

      if response.success?
        puts "Pay key: #{response.pay_key}"

        # send the user to PayPal to make the payment
        # e.g. https://www.sandbox.paypal.com/webscr?cmd=_ap-payment&paykey=abc
        redirect_to client.payment_url(response)

      else
        puts "#{response.ack_code}: #{response.error_message}"
      end
      # p response
    end
  end
end