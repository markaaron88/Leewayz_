export default class Profile {
  
  constructor(id, firstName, lastName, references, description, numberPeople, duration,pets,smoking
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.references = references;
    this.description = description;
    this.numberPeople = numberPeople;
    this.duration = duration;
    this.pets = pets;
    this.smoking = smoking;
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

  get references() {
    return this.references;
  }
  
  get description() {
    return this.description;
  }
  
  get numberPeople() {
    return this.numberPeople;
  }
  
  get duration() {
    return this.duration;
  }
  get pets() {
    return this.pets;
  }
  get smoking() {
    return this.smoking;
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
  
  set references(newReferences) {
    this.references = newReferences;
  }
  
  set description(newDescription){
    this.description = newDescription;
  }
  
  set numberPeople(newNumberPeople){
    this.numberPeople = newNumberPeople;
  }
  
  set duration(newDuration){
     this.duration = newDuration;
    }
  
  set pets(newPets){
      this.pets = newPets;
  }

  set smoking(newSmoking){
      this.smoking = newSmoking;
  }

}





