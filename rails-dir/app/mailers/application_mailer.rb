class ApplicationMailer < ActionMailer::Base
  default from: 'yallanotlobiti38@gmail.com'
  # layout 'mailer'
  
  def send_email(user)
    @user = user
    #get user from db using this mail 
    mail(to: @user.email, subject: 'Your Password is ')
  end

end
