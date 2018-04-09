class ApplicationMailer < ActionMailer::Base
  default from: 'yallanotlobiti38@gmail.com'
  # layout 'mailer'

  def send_mail(email, body, subject)
    mail(
        to: email,
        subject: subject,
        content_type: "text/html",
        body: body
    )
 end

end
