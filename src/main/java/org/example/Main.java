package org.example;

import org.apache.catalina.Context;
import org.apache.catalina.startup.Tomcat;
import org.glassfish.jersey.servlet.ServletContainer;
import readtrade.config.AppConfig;

import java.io.File;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {

    private static final int SERVER_PORT = 8080;
  private static final String CONTEXT_PATH="/ReadTrades";

    public static void main(String[] args) {


        try {
            Tomcat tomcat = new Tomcat();
            tomcat.setPort(SERVER_PORT);
            tomcat.getConnector();


            Context context = tomcat.addWebapp(CONTEXT_PATH, new File("src/main/webapp").getAbsolutePath());
            Tomcat.addServlet(context, "JerseyServlet", new ServletContainer(new AppConfig()));
            context.addServletMappingDecoded("/api/*", "JerseyServlet");
//            context.addApplicationListener(ContextPathListener.class.getName());


            tomcat.start();
            System.out.println("App URL: http://localhost:" + SERVER_PORT + CONTEXT_PATH);
            tomcat.getServer().await();
        } catch (Exception e) {
            e.printStackTrace();
        }



    }
}