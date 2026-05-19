package readtrade.dto;

public class UserDTO {
 private int id;
 private String firstName;
 private String lastName;
 private String email;
 private String password;
 private String role;
private String lineone;
 private String linetwo;
 private String verificationCode;
 private String postalCode;
 private boolean isPrimary;
 private int cityId;
    private String sinceAt;
    private String newPassword;
    private String confirmPassword;
    private String roleName;
    private String mobile;

    public UserDTO(int id, String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;

    }
    public UserDTO(){

    }

    public UserDTO(int id, String firstName, String lastName, String email, String password, String verificationCode) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.verificationCode = verificationCode;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getLineone() {
        return lineone;
    }

    public void setLineone(String lineone) {
        this.lineone = lineone;
    }

    public String getLinetwo() {
        return linetwo;
    }

    public void setLinetwo(String linetwo) {
        this.linetwo = linetwo;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public boolean isPrimary() {
        return isPrimary;
    }

    public void setPrimary(boolean primary) {
        isPrimary = primary;
    }

    public int getCityId() {
        return cityId;
    }

    public void setCityId(int cityId) {
        this.cityId = cityId;
    }

    public String getSinceAt() {
        return sinceAt;
    }

    public void setSinceAt(String sinceAt) {
        this.sinceAt = sinceAt;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
