package readtrade.util;

import java.io.InputStream;
import java.util.Properties;

public class Env {
private static final Properties APP_PROPERTIES = new Properties();

static {
InputStream is =
        Thread.currentThread().getContextClassLoader()
                .getResourceAsStream("app.properties");

    System.out.println("app.properties stream = " + is);
    if(is == null){
throw  new RuntimeException("app.properties resource not found");
    }

System.out.println("app.properties loaded = " + is);

    try {
      APP_PROPERTIES.load(is);
    }catch(Exception e){
throw  new RuntimeException(e);
    }
}

public static String getProperty(String key){
    return APP_PROPERTIES.getProperty(key);
}
public static Properties getProperty(String key,String defaultValue){
    return APP_PROPERTIES;
}

}
