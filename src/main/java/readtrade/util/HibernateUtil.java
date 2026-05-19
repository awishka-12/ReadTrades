package readtrade.util;

import org.glassfish.jersey.server.ParamException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {

public static final SessionFactory sessionFactory;
static {
try {
    sessionFactory = new Configuration().configure().buildSessionFactory();
}catch (ParamException.HeaderParamException ex) {

throw new ExceptionInInitializerError(ex.getMessage());
   }
  }

public static   SessionFactory getSessionFactory() {
return sessionFactory;
}
public static void shutdown() {
sessionFactory.close();
}
}
