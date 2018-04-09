class ApplicationMailer < ActionMailer::Base
  default from: 'yallanotlobiti38@gmail.com'
  # layout 'mailer'

  def send_email(user)
    @user = user
    # @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Yallanotlob')
  end

end
