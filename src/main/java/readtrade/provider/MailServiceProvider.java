package readtrade.provider;

import jakarta.mail.Authenticator;
import jakarta.mail.PasswordAuthentication;
import readtrade.mail.Mailable;
import readtrade.util.Env;

import java.util.Properties;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class MailServiceProvider {
    private static MailServiceProvider mailServiceProvider;
private final BlockingQueue<Runnable> blockingQueue=new LinkedBlockingQueue<>();
private final Properties properties=new Properties();
private ThreadPoolExecutor executor;
private Authenticator authenticator;

    public MailServiceProvider() {
properties.setProperty("mail.smtp.auth", "true");
properties.setProperty("mail.smtp.starttls.enable", "true");
properties.setProperty("mail.smtp.host", Env.getProperty("mail.host"));
properties.setProperty("mail.smtp.port", Env.getProperty("mail.port"));


    }
public static MailServiceProvider getInstance(){
          if(mailServiceProvider==null) mailServiceProvider=new MailServiceProvider();
          return mailServiceProvider;
       }
       public void start(){
        authenticator= new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(Env.getProperty("mail.username"),Env.getProperty("mail.password"));

            }
        };
        executor=new ThreadPoolExecutor(2,5,5,
                TimeUnit.SECONDS,blockingQueue,new ThreadPoolExecutor.AbortPolicy());
executor.prestartAllCoreThreads();
           System.out.println("\u001B[32mEmailServiceProvider initialized...");

       }
public  Properties getProperties(){return properties;}

public Authenticator getAuthenticator(){return authenticator;}

public void shutdown(){if(executor!=null)executor.shutdown();}
public void sendMail(Mailable  mailable){boolean offer=blockingQueue.offer(mailable);}
}
