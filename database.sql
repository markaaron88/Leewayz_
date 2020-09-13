
USE  heroku_c20abffc710345a;

SET @@auto_increment_increment=1;

# Generate User Data
CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    firstName VARCHAR
(255),
    lastName VARCHAR
(255),
    email VARCHAR
(255),
    username VARCHAR
(255),
    password VARCHAR
(255),
    type VARCHAR
(255),
    image VARCHAR
(255),
    isAdmin BOOLEAN NOT NULL
);

CREATE TABLE renter (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    userid INT,
    city VARCHAR
(255),
	zipcode INT,
    refnames VARCHAR
(255),
    description VARCHAR
(255),
    numpeople INT,
    length VARCHAR
(255),
    pets VARCHAR
(255),
    smoking VARCHAR
(255),
    image VARCHAR
(255)
);

CREATE TABLE listings (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	streetAddress VARCHAR
(255),
    state VARCHAR
(255),
    city VARCHAR
(255),
    zipcode INT,
    owner INT,
    rooms INT,
    sqft INT,
    bathrooms INT,
    pets BOOLEAN,
    dateAvailable DATE,
    cooling BOOLEAN,
    heating BOOLEAN,
    parking VARCHAR
(255),
    deposit INT,
    fees INT,
    utilities INT,
    description VARCHAR
(255),
    propertyType VARCHAR
(255),
    handicapAccessible BOOLEAN,
    image1 VARCHAR
(255),
    image2 VARCHAR
(255),
    image3 VARCHAR
(255),
    smokingArea BOOLEAN
);

# Listings
INSERT INTO leewayz.listings
VALUES
    (
        1, "1234 Main Street", "CA", "Small Town", 12345, 2, 8, 15000, 5, false, "2020-05-27", true, true,
        "Five Car Garage", 8000, 500, 300, "A Mansion", "room for rent", true, "uploads/mansion1.jpg", "uploads/mansion2.jpg", "uploads/mansion3.jpg", false
);
INSERT INTO leewayz.listings
VALUES
    (
        2, "1234 F Avenue", "CA", "Suburbia", 12347, 7, 3, 4000, 2, true, "2020-05-27", false, true,
        "DrivewaySpot", 1000, 200, 100, "An Average House", "room for rent", true, "uploads/house1.jpg", "uploads/house2.jpg", "uploads/house3.jpg", true
);
INSERT INTO leewayz.listings
VALUES
    (
        3, "1 Market Street", "CA", "Big City", 12347, 9, 1, 800, 1, false, "2020-05-27", false, false,
        "None", 900, 100, 50, "Small Apartment", "room for rent", false, "uploads/apartment1.jpg", "uploads/apartment2.jpg", "uploads/apartment3.jpg", false
);


# Admins
INSERT INTO leewayz.users
VALUES
    (1, "Mark", "Mariscal", "mamariscal@csumb.edu", "mmariscal", "$2b$10$XyDOKkA4v2z8Ex2ZfR.tOuKlX2XzsPY1FtogOeFsW9fJC4ddoikkC", "developer", "uploads/Mark_Mariscal.png", true);
INSERT INTO leewayz.users
VALUES
    (2, "Christopher", "Piwarski", "cpiwarski@csumb.edu", "cpiwarski", "$2b$10$XyDOKkA4v2z8Ex2ZfR.tOuKlX2XzsPY1FtogOeFsW9fJC4ddoikkC", "developer", "uploads/Chris.jpg", true);
INSERT INTO leewayz.users
VALUES
    (3, "Wais", "Robleh", "wrobleh@csumb.edu", "wrobleh", "$2b$10$XyDOKkA4v2z8Ex2ZfR.tOuKlX2XzsPY1FtogOeFsW9fJC4ddoikkC", "developer", "uploads/myphotowais.jpg", true);

# Test Renters
INSERT INTO leewayz.users
VALUES
    (4, "Renter", "One", "fakeemail1@gmail.com", "tr1", "$2a$10$pk4VUSqUyayrsegnQ4M74uxtk/J86kpAetaWlJbXK77qMegrPWo2m", "Testrenter", "uploads/person1.jpeg", false);
INSERT INTO leewayz.users
VALUES
    (5, "Renter", "Two", "fakeemail2@gmail.com", "tr2", "$2a$10$pk4VUSqUyayrsegnQ4M74uxtk/J86kpAetaWlJbXK77qMegrPWo2m", "Testrenter", "uploads/person2.jpg", false);
INSERT INTO leewayz.users
VALUES
    (6, "Renter", "Three", "fakeemail3@gmail.com", "tr3", "$2a$10$pk4VUSqUyayrsegnQ4M74uxtk/J86kpAetaWlJbXK77qMegrPWo2m", "Testrenter", "uploads/person3.jpg", false);

INSERT INTO leewayz.renter
VALUES
    (1, 4, "Campbell", 95008, "Suzie", "Average Person", 1, "6 months", "A Pug", "Hell Yeah", "uploads/person2.jpg");
INSERT INTO leewayz.renter
VALUES
    (2, 5, "Chicago", 00000, "Bob", "Average Person", 3, "3 Years", "Eight cats", "No", "uploads/person5.jpg");
INSERT INTO leewayz.renter
VALUES
    (3, 6, "Dublin", 12346, "Joe", "Total Weirdo", 1, "6 months", "Three Chickens", "Only Vape", "uploads/person4.jpg");

# Test Leasers
INSERT INTO leewayz.users
VALUES
    (7, "Leaser", "One", "fakeemail4@gmail.com", "tl1", "$2a$10$pk4VUSqUyayrsegnQ4M74uxtk/J86kpAetaWlJbXK77qMegrPWo2m", "Testleaser", "uploads/person4.jpg", false);
INSERT INTO leewayz.users
VALUES
    (8, "Leaser", "Two", "fakeemail5@gmail.com", "tl2", "$2a$10$pk4VUSqUyayrsegnQ4M74uxtk/J86kpAetaWlJbXK77qMegrPWo2m", "Testleaser", "uploads/person5.jpg", false);
INSERT INTO leewayz.users
VALUES
    (9, "Leaser", "Three", "fakeemail6@gmail.com", "tl3", "$2a$10$pk4VUSqUyayrsegnQ4M74uxtk/J86kpAetaWlJbXK77qMegrPWo2m", "Testleaser", "uploads/person6.jpg", false);
