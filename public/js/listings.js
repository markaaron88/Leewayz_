export default class listings {
  
  constructor(streetAddress,state,city,zipCode,propertyOwner,rooms,sqft,bathrooms,pets,dateAvailable,cooling,heating,parking,laundry,deposit,fees,utilites,community,description
  ,propertyType,handicapAccessible, smokingArea) {
    this.streetAddress = streetAddress;
    this.state = state;
    this.city = city;
    this.zipCode = zipCode;
    this.propertyOwner = propertyOwner;
    this.rooms = rooms;
    this.sqft = sqft;
    this.bathrooms = bathrooms;
    this.pets = pets;
    this.dateAvailable = dateAvailable;
    this.cooling = cooling;
    this.heating = heating;
    this.parking = parking;
    this.deposit = deposit;
    this.fees = fees;
    this.utilities = utilities;
    this.description = description;
    this.propertyType = propertyType; 
    this.handicapAccessible = handicapAccessible;
    this.smokingArea = smokingArea;
  }
  
  //getters
  get streetAddress() {
    return this.streetAddress;
  }
  
  get state() {
    return this.state;
  }
  
  get city() {
    return this.city;
  }
  
    get zipCode() {
    return this.zipCode;
  }
  
  get propertyOwner() {
    return this.propertyOwner;
  }
  
  get rooms() {
    return this.rooms;
  }

  get sqft() {
    return this.sqft;
  }
  
  
  get bathrooms() {
    return this.bathrooms;
  }
  
  get pets(){
      return this.pets;
  }
 
  get dateAvailable() {
    return this.dateAvailable;
  }
  
  get cooling() {
    return this.cooling;
  }
  
  get heating() {
    return this.heating;
  }
  
  get parking(){
      return this.parking;
  }

  get deposit() {
    return this.deposit;
  }
  
  get fees() {
    return this.fees;
  }
  
  get utilities() {
    return this.utilities;
  }
  
  get community(){
      return this.community;
  }

  get description() {
    return this.description;
  }
  
  get propertyType() {
    return this.propertyType;
  }
  
  get handicapAccessible(){
      return this.handicapAccessible;
  }

  get smokingArea(){
      return this.smokingArea;
  }
    
  
  //setters
  
  set streetAddress(newStreetAddress) {
    this.streetAddress = newStreetAddress;
  }
  
  set state (newState) {
    this.state = newState;
  }
  
  set city(newCity) {
    this.city = newCity;
  }
  
  set zipCode(newZipCode) {
    this.zipCode = newZipCode;
  }

  set propertyOwner(newPropertyOwner){
    this.propertyOwner = newPropertyOwner;
  }

  set rooms(newRoom){
      this.rooms = newRoom;
  }

  set sqft(newSqft){
      this.sqft = newSqft;
  }

  set bathrooms(newBathrooms){
    this.bathrooms = newBathrooms;
  }
  
  set pets(newPets){
    this.pets = newPets;
  }
  
  set dateAvailable(newDateAvailable){
    this.dateAvailable = newDateAvailable;
  }
  
  set cooling(newCooling){
    this.cooling = newCooling;
  }
  
  set heating(newHeating){
    this.heating = newHeating;
  }
  
  set deposit(newDeposit){
    this.deposit = newDeposit;
  }
  
  set fees(newFees){
    this.fees = newFees;
  }
  
  set utilities(newUtilities){
    this.utilities = newUtilities;
  }
  
  set community(newCommunity){
    this.community = newCommunity;
  }
  
  set description(newDescription){
    this.description = newDescription;
  }
  

  set propertyType(newPropertyType){
    this.propertyType = newPropertyType;
  }


  set handicapAccessible(newHandicapAccessible){
    this.handicapAccessible = newHandicapAccessible;
  }

 set smokingArea(newSmokingArea){
     this.smokingArea = newSmokingArea;

 }

}





