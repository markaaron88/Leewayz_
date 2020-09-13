export default class User {
  
  constructor(id, firstName, lastName, email, username, password, type) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
    this.type = type;
  }
  
  //getters
  get id() {
    return this.id;
  }
  
  get firstName() {
    return this.firstName;
  }
  
 get lastName() {
    return this.lastName;
  }

  get email() {
    return this.email;
  }
  
  get username() {
    return this.username;
  }
  
  get password() {
    return this.password;
  }
  
  get type() {
    return this.type;
  }
  
  //setters
  set firstName(newFirstName) {
    this.firstName = firstName;
  }
  
  set lastName(newLastName) {
    this.lastName = newLastName;
  }
  
  set id (newId) {
    this.id = newId;
  }
  
  set email(newEmail) {
    this.email = newEmail;
  }
  
  set password(newPassword){
    this.password = newPassword;
  }
  
  set type(newType){
    this.type = newType;
  }
  
}