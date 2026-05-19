package readtrade.mail;

import io.rocketbase.mail.model.HtmlTextEmail;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import readtrade.util.Env;

public class VerificationMail extends Mailable{

    private final String to;
    private final String verificationCode;

    public VerificationMail(String to, String verificationCode) {
        this.to = to;
        this.verificationCode=verificationCode;
    }

    @Override
    public void build(Message message) throws MessagingException {

        message.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
        message.setSubject("Email Verification Code - " + Env.getProperty("app.name"));

        String appURL = Env.getProperty("app.url");
        String verifyURL = appURL + "/verify-account.html?email=" + to + "&code=" + verificationCode;

        // Button HTML with inline styling
        String buttonHtml = "<div style=\"text-align: center; margin: 20px 0;\">" +
                "<a href=\"" + verifyURL + "\" style=\"" +
                "display: inline-block; " +
                "padding: 12px 30px; " +
                "background-color: #3498db; " +
                "color: #ffffff; " +
                "text-decoration: none; " +
                "border: 1px solid #3498db; " +
                "border-radius: 4px; " +
                "font-size: 16px; " +
                "font-weight: bold;" +
                "\">Verify Your Email</a></div>";

        HtmlTextEmail htmlTextEmail = getEmailTemplateConfigBuilder()
                .header()
                .logo("https://upload.wikimedia.org/wikipedia/commons/e/eb/SmartTradePI.png\n").logoHeight(50).and()
                .text("Email Verification Code - " + Env.getProperty("app.name")).h1().center().and()

                .text("WELCOME " + to).h2().center().and()
                .text("Thanks for registering on our website").center().and()
                .text("To verify your email please click on the button below.").center().and()
                .text("Your Verification Code:").center().and()
                .html("<div style=\"text-align: center; margin: 20px 0; font-size: 28px; font-weight: bold; letter-spacing: 2px; color: #2c3e50;\">" + verificationCode + "</div>").and()
                .html(buttonHtml).and()
                .text("If you have any trouble please paste this link in your browser:").center().and()
                .html("<div style=\"text-align: center; margin: 15px 0; word-break: break-all;\"><a href=\"" + verifyURL + "\" style=\"color: #3498db; text-decoration: none;\">" + verifyURL + "</a></div>").and()

                .copyright(Env.getProperty("app.name")).url(appURL).and()
                .build();

        message.setContent(htmlTextEmail.getHtml(), "text/html; charset=utf-8");
    }
}
