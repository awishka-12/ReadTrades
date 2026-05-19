import org.hibernate.Session;
import org.hibernate.Transaction;
import readtrade.entity.Status;
import readtrade.mail.VerificationMail;
import readtrade.provider.MailServiceProvider;
import readtrade.util.HibernateUtil;

public class test {
    public static void main(String[] args) {

        HibernateUtil.getSessionFactory().openSession();
//
//      MailServiceProvider.getInstance().start();
//      VerificationMail verificationMail = new VerificationMail("awishkanipun62@gmail.com", "123456");
//      MailServiceProvider.getInstance().sendMail(verificationMail);
//
//
//       try (Session session = HibernateUtil.getSessionFactory().openSession()) {
//           Transaction tx = session.beginTransaction();
//
//           for (Status.Type type : Status.Type.values()) {
//
//               Status status = new Status();
//               status.setName(type.name()); // ACTIVE, PENDING ...
//
//               session.persist(status);
//           }
//
//           tx.commit();
//        }
//
//       System.out.println("Status table seeded successfully!");
//
//    }
    }
}
