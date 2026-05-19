package readtrade.service;

import jakarta.servlet.ServletContext;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.glassfish.jersey.media.multipart.ContentDisposition;
import readtrade.util.Env;
import org.apache.commons.io.FilenameUtils;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FileUploadSevice {

private static final String UPLOAD_DIRECTORY_NAME="/upload";
private final ServletContext context;

public FileUploadSevice(ServletContext context){
    this.context=context;
}

public FileItem uploadFile(String directName, InputStream inputStream , ContentDisposition fileMetaData){
    return writeFile(UPLOAD_DIRECTORY_NAME + "/" + directName, inputStream, fileMetaData);
}

private FileItem writeFile(String pathName,InputStream inputStream, ContentDisposition contentDisposition){

    Path uploadPath = Paths.get(context.getRealPath(pathName));
    String extension = FilenameUtils.getExtension(contentDisposition.getFileName());
String fileName=System.currentTimeMillis()+"."+extension;

        if(!Files.exists(uploadPath)){
         try {

             System.out.println("Upload path not found. Creating Directory: \"" + uploadPath + "\"");
             Files.createDirectories(uploadPath);
         }catch (IOException e){
            throw new RuntimeException(e.getMessage());
         }
        }

   try {

       int read;
       byte[] bytes = new byte[1024];
       OutputStream outputStream = new FileOutputStream(uploadPath +"/" +fileName);
     while ((read = inputStream.read(bytes)) != -1){
         outputStream.write(bytes,0,read);
     }
outputStream.flush();
     outputStream.close();
   }catch (Exception e){
       throw new RuntimeException(e.getMessage());
   }

   String appUrl= Env.getProperty("app.url");

String url= context.getContextPath() + pathName + "/" + fileName;
String path=uploadPath+"/"+fileName;
String fullUrl=appUrl +"/" +uploadPath+"/"+fileName;

return new FileItem(fileName,contentDisposition.getFileName(),path,url,fullUrl);
}

public static class FileItem{
    private String fileName;
    private String originalFileName;
    private String contentDisposition;
    private String path;
    private String url;

    public FileItem(String fileName, String originalFileName, String contentDisposition, String path, String url) {
        this.fileName = fileName;
        this.originalFileName = originalFileName;
        this.contentDisposition = contentDisposition;
        this.path = path;
        this.url = url;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getOriginalFileName() {
        return originalFileName;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }

    public String getContentDisposition() {
        return contentDisposition;
    }

    public void setContentDisposition(String contentDisposition) {
        this.contentDisposition = contentDisposition;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
}
