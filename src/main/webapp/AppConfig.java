package readtrade.config;

import org.glassfish.jersey.server.ResourceConfig;

public class AppConfig extends ResourceConfig {
public AppConfig() {

packages("readtrade.controller");
//register(org.glassfish.jersey.media.multipart.MultiPartFeature.class);
}

}
