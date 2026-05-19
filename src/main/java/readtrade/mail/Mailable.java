package readtrade.mail;

import io.rocketbase.mail.EmailTemplateBuilder;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import readtrade.provider.MailServiceProvider;
import readtrade.util.Env;

import java.util.Properties;

public abstract class Mailable implements Runnable{

private final MailServiceProvider mailServiceProvider;
private final EmailTemplateBuilder.EmailTemplateConfigBuilder emailTemplateConfigBuilder;

public Mailable(){

this.mailServiceProvider = MailServiceProvider.getInstance();
this.emailTemplateConfigBuilder =EmailTemplateBuilder.builder();
}

    @Override
    public void run() {
try {
Session mailsession = Session.getInstance(mailServiceProvider.getProperties(),mailServiceProvider.getAuthenticator());
MimeMessage mimeMessage = new MimeMessage(mailsession);
mimeMessage.setFrom(new InternetAddress(Env.getProperty("app.mail")));
build(mimeMessage);
if(mimeMessage.getRecipients(Message.RecipientType.TO).length>0){

    Transport.send(mimeMessage);
    System.out.println("\u001B[32mEmail sending successful...\u001B[32m");
}else {
throw new RuntimeException("Email recipients can not be empty...");
}

}catch (MessagingException e) {

    throw  new RuntimeException(e);
}
    }
    public abstract void build(Message message) throws MessagingException;

public EmailTemplateBuilder.EmailTemplateConfigBuilder getEmailTemplateConfigBuilder() {
return this.emailTemplateConfigBuilder;
}
}
