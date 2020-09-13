const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv").config({ path: "./.env" });
const app = express();
const path = require("path");
const MYSQL = require("mysql");
const multer = require("multer");

const PORT = 3000;
// const DB = "db";
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/dist", express.static(path.join(__dirname + "/dist")));
process.on("warning", (e) => console.warn(e.stack));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/dist/public/");
  },
  filename: function (req, file, cb) {
    cb(null, "uploads/" + Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

//////ARRAY PICS LISTINGS
var bodyParser = require("body-parser");
var upload2 = multer({ storage: storage }).array("listingPhoto", 3);

const request = require("request");
app.use("/static", express.static("./static/"));
app.use(express.urlencoded({ extended: true }));
const bcrypt = require("bcrypt");

app.use(
  session({
    secret: "leewayz secret!",
    resave: true,
    saveUninitialized: true,
  })
);

//b9b952c4815809:b3bd4a82@us-cdbr-east-02.cleardb.com/heroku_cf5b8f62683ad6e?reconnect=true
const connection = MYSQL.createPool({
  connectionLimit: 10,
  host: "us-cdbr-east-02.cleardb.com",
  user: "	b9b952c4815809",
  password: "	b3bd4a82",
  database: "heroku_cf5b8f62683ad6e",
});

// const connection = MYSQL.createPool({
//   host: DB,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   connectionLimit: 10,
//   multipleStatements: true
// });

// const connection = MYSQL.createPool({
//   host: "localhost",
//   user: "leewayz",
//   password: "password",
//   database: "leewayz",
//   connectionLimit: 10,
//   multipleStatements: true,
//    insecureAuth : true
// });

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//******************************************************************************
//Get Routes
//******************************************************************************
app.get("/", async function (req, res) {
  res.render("index", { menuItem: buildLogin(req) });
});

app.get("/legal", function (req, res) {
  res.render("legal", { menuItem: buildLogin(req) });
});

//Search listings by city or ZIP code...
app.get("/searchresults", async function (req, res) {
  let sql = "SELECT * from leewayz.listings WHERE ";
  let zipcode = Number(req.query.cityNameSearch);

  if (zipcode) {
    sql += "zipcode = ?";
  } else {
    sql += "city = ?";
  }
  let city = [req.query.cityNameSearch];
  let status = await connection.query(sql, city, function (
    error,
    rows,
    fields
  ) {
    if (error) {
      console.log("error with query");
      res.send(
        JSON.stringify({
          status: 500,
          error: error,
          response: null,
        })
      );
    } else if (rows.length == 0) {
      console.log("city not found");
      res.render("noresults", { menuItem: buildLogin(req) });
    } else {
      console.log("city found");
      res.render("searchresults", {
        title: "search",
        data: rows,
        menuItem: buildLogin(req),
      });
    } // else
  }); // query
});

//listing just queries the database
var router = express.Router();
app.get("/listings", async function (req, res, next) {
  let sql = "SELECT * from leewayz.listings";
  let status = await connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.render("listings", {
      title: "names",
      menuItem: buildLogin(req),
      data: rows,
    });
  }); // query
});

//profile just queries the database of all users who have created a user profile
app.get("/profiles", async function (req, res, next) {
  let sql = "SELECT * from leewayz.renter";
  let status = await connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.render("profiles", {
      title: "names",
      data: rows,
      menuItem: buildLogin(req),
    });
  }); // query
});
module.exports = router;

//Search Profile by city or ZIP code...
app.get("/profileresults", async function (req, res) {
  let sql = "SELECT * from leewayz.renter WHERE ";
  let zipcode = Number(req.query.cityNameSearch);
  if (zipcode) {
    sql += "zipcode = ?";
  } else {
    sql += "city = ?";
  }
  let city = [req.query.cityNameSearch];
  let status = await connection.query(sql, city, function (
    error,
    rows,
    fields
  ) {
    if (error) {
      console.log("error with query");
      res.send(
        JSON.stringify({
          status: 500,
          error: error,
          response: null,
        })
      );
    } else if (rows.length == 0) {
      console.log("user not found in your area");
      res.render("noprofile", { menuItem: buildLogin(req) });
    } else {
      console.log("profile found in your area");
      res.render("profileresults", {
        title: "search",
        data: rows,
        menuItem: buildLogin(req),
      });
    } // else
  }); // query
});

app.get("/admin", function (req, res) {
  res.render("adminlogin", { menuItem: buildLogin(req) });
});

app.get("/login", function (req, res) {
  res.render("login", { menuItem: buildLogin(req) });
}); //login page

app.get("/userchoice", function (req, res) {
  res.render("userchoice", { menuItem: buildLogin(req) });
}); //user choice unsure if we need this page or not

app.get("/addlisting", function (req, res) {
  let validation = req.session.authenticated;
  if (validation == false || validation == undefined) {
    res.render("login", { menuItem: buildLogin(req) });
  } else {
    res.render("addlisting", { menuItem: buildLogin(req) });
  }
}); //add listing

app.get("/aboutus", function (req, res) {
  res.render("aboutus", { menuItem: buildLogin(req) });
}); //about us page

app.get("/logout", function (req, res) {
  req.session.authenticated = false;
  console.log("logged out");
  res.render("index", { menuItem: buildLogin(req) });
}); //logout

app.get("/signup", function (req, res) {
  res.render("signup", { menuItem: buildLogin(req) });
}); //signup page

app.get("/renterprofile", function (req, res) {
  let userId = req.query.userid;
  res.render("renterprofile", { userId: userId, menuItem: buildLogin(req) });
}); //renters page

//******************************************************************************
// Post Routes
//******************************************************************************

app.post("/viewprofile", async function (req, res) {
  let validation = req.session.authenticated;
  if (validation == false || validation == undefined) {
    res.render("login", { menuItem: buildLogin(req) });
  } else {
    // Get Owner ID
    let email = req.session.email;
    let result = await getUserIdViaEmail(email);
    let owner = result[0].id;

    let data = await getRenterProfileByUserId(owner);
    res.render("viewprofile", { menuItem: buildLogin(req), data: data });
  }
});

app.post("/viewlisting", async function (req, res) {
  let validation = req.session.authenticated;
  if (validation == false || validation == undefined) {
    res.render("login", { menuItem: buildLogin(req) });
  } else {
    let listingId = req.body.listing;
    let listing = await getListingById(listingId);
    res.render("viewlisting", {
      menuItem: buildLogin(req),
      listing: listing[0],
    });
  }
});

app.post("/listingowner", async function (req, res) {
  let validation = req.session.authenticated;
  if (validation == false || validation == undefined) {
    res.render("login", { menuItem: buildLogin(req) });
  } else {
    let ownerId = req.body.ownerId;
    let owner = await getOwnerById(ownerId);
    res.render("viewowner", { menuItem: buildLogin(req), owner: owner[0] });
  }
});

app.post("/adminchooser", function (req, res) {
  let choice = req.body.routing;
  switch (choice) {
    case "addUser":
      console.log("adduser selected");
      res.render("adduser", { menuItem: buildLogin(req) });
      break;
    case "delUserEmail":
      res.render("deleteuseremail", {
        menuItem: buildLogin(req),
      });
      break;
    case "delUser":
      res.render("deleteuserid", {
        menuItem: buildLogin(req),
      });
      break;
    case "addListing":
      res.render("addlistingadmin", {
        menuItem: buildLogin(req),
      });
      break;
    case "delListing":
      res.render("deletelistingadmin", {
        menuItem: buildLogin(req),
      });
      break;
    default:
      res.render("admin", {
        menuItem: buildLogin(req),
      });
  }
});

app.post("/signup", async function (req, res) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let username = req.body.username;
  let passwd = bcrypt.hashSync(req.body.psw, 10); //password hashed
  let type = req.body.type;

  req.session.authenticated = true;
  req.session.email = email;
  req.session.firstName = firstName;
  req.session.type = type;
  req.session.lastName = lastName;
  query =
    "INSERT INTO leewayz.users (firstName, lastName, email, username, password, type, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?)";

  let search = await connection.query(
    query,
    [firstName, lastName, email, username, passwd, type, false],
    function (err, rows, fields) {
      if (err) throw err;
      let id = rows.insertId;
      res.render("signupsuccess", {
        query: query,
        id: id,
        menuItem: buildLogin(req),
      });
    }
  ); //connect
}); //route

////Renter Profile
app.post("/renterprofile", async function (req, res) {
  let userid = req.body.userId;
  let city = req.body.city;
  let zipcode = req.body.zipcode;
  let refnames = req.body.refnames;
  let description = req.body.description;
  let numpeople = req.body.numpeople;
  let length = req.body.length;
  let pets = req.body.pets;
  let smoking = req.body.smoking;

  query =
    "INSERT INTO leewayz.renter (userid,city, zipcode,refnames, description, numpeople,length, pets, smoking) VALUES (?,?, ?, ?, ?, ?, ?,?,?)";
  let search = await connection.query(
    query,
    [
      userid,
      city,
      zipcode,
      refnames,
      description,
      numpeople,
      length,
      pets,
      smoking,
    ],
    function (err, rows, fields) {
      if (err) throw err;
      console.log("Insert execution: ", rows, fields);
      let id = rows.insertId;
      res.render("profilesuccess", {
        query: query,
        id: id,
        menuItem: buildLogin(req),
      });
    }
  ); //connect
}); //route

app.post("/profilesuccess", upload.single("image"), async (req, res) => {
  let id = req.body.renterid;
  let data = req.body;
  data.propic = req.file.filename;
  console.log(req);

  query = "UPDATE leewayz.renter SET image = ? WHERE id = ?";
  await connection.query(query, [data.propic, id], function (
    err,
    rows,
    fields
  ) {
    if (err) throw err;

    console.log(data.propic);

    res.render("profilephoto", {
      menuItem: buildLogin(req),
      data: data,
    });
  });
});

//Landlord listing
app.post("/addlisting", async function (req, res) {
  let streetAddress = req.body.streetAddress;
  let state = req.body.state;
  let city = req.body.city;
  let zipcode = req.body.zipcode;
  let rooms = req.body.rooms;
  let sqft = req.body.sqft;
  let bathrooms = req.body.bathrooms;
  let pets = req.body.pets;

  let dateAvailable = req.body.dateAvailable;
  let cooling = req.body.cooling;
  let heating = req.body.heating;
  let parking = req.body.parking;
  let deposit = req.body.deposit;

  let fees = req.body.fees;
  let utilities = req.body.utilities;
  let description = req.body.description;
  let propertyType = req.body.propertyType;
  let handicapAccessible = req.body.handicapAccessible;
  let smokingArea = req.body.smokingArea;

  // Get Owner ID
  let email = req.session.email;
  let result = await getUserIdViaEmail(email);
  let owner = result[0].id;

  // Insert listing to db
  query =
    "INSERT INTO leewayz.listings(streetAddress,state,city,zipcode,owner,rooms,sqft,bathrooms,pets,dateAvailable,cooling,heating,parking,deposit,fees,utilities,description,propertyType,handicapAccessible,smokingArea) VALUES (?,?, ?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?,?,?)";

  let search = await connection.query(
    query,
    [
      streetAddress,
      state,
      city,
      zipcode,
      owner,
      rooms,
      sqft,
      bathrooms,
      pets,
      dateAvailable,
      cooling,
      heating,
      parking,
      deposit,
      fees,
      utilities,
      description,
      propertyType,
      handicapAccessible,
      smokingArea,
    ],
    function (err, rows, fields) {
      if (err) throw err;
      console.log("Insert execution: ", rows, fields);
      let id = rows.insertId;
      console.log(req.session.authenticated);
      res.render("listingsuccess", {
        query: query,
        id: id,
        menuItem: buildLogin(req),
      });
    }
  ); //connect
}); //route

app.post("/listingsuccess", async function (req, res) {
  upload2(req, res, async function (err) {
    let id = req.body.listingid;
    let data = req.body;
    // data.propic = req.files[0].filename + req.files[1].filename + req.files[2].filename;

    let file1 = req.files[0].filename;
    let file2 = req.files[1].filename;
    let file3 = req.files[2].filename;

    query =
      "UPDATE leewayz.listings SET image1 = ?, image2 = ?, image3 = ? WHERE id = ? ";
    await connection.query(query, [file1, file2, file3, id], function (
      err,
      rows,
      fields
    ) {
      if (err) throw err;
      console.log(req.session);
      res.render("listingphotos", {
        menuItem: buildLogin(req),
        data: data,
      });
    });
  });
});

app.post("/adminreroute", function (req, res) {
  res.render("admin", { menuItem: buildLogin(req) });
});

app.post("/admin", async function (req, res) {
  let username = req.body.uname;
  let passwd = req.body.psw;
  let sql = "SELECT * FROM leewayz.users WHERE username = ?";
  let sqlParams = [username];

  let result = await checkUsername(username);
  if (result.length > 0) {
    dbPassword = result[0].password;
  }
  let passwordMatch = await checkPassword(passwd, dbPassword);
  let isAdmin = result[0].isAdmin;

  if (passwordMatch && isAdmin) {
    console.log("password is matched, admin");
    req.session.authenticated = true;

    req.session.firstName = result[0].firstName;
    req.session.lastName = result[0].lastName;
    req.session.email = result[0].email;
    req.session.id = result[0].id;
    req.session.type = result[0].type;

    console.log("email is: " + req.session.email);
    res.render("admin", { menuItem: buildLogin(req) });
  } else {
    console.log("password does NOT match");
    req.session.authenticated = false;
    res.render("adminlogin", { menuItem: buildLogin(req) });
  }
});

app.post("/login", async function (req, res) {
  let username = req.body.uname;
  let passwd = req.body.psw;

  let sql = "SELECT * FROM leewayz.users WHERE username = ?";
  let sqlParams = [username];

  let dbPassword = "";
  let result = await checkUsername(username);

  if (result.length > 0) {
    dbPassword = result[0].password;
  }
  let passwordMatch = await checkPassword(passwd, dbPassword);

  if (passwordMatch) {
    console.log("password is matched");
    req.session.authenticated = true;

    req.session.firstName = result[0].firstName;
    req.session.lastName = result[0].lastName;
    req.session.email = result[0].email;
    req.session.id = result[0].id;
    req.session.type = result[0].type;

    console.log("logged in");

    res.render("index", { menuItem: buildLogin(req), uname: username });
  } else {
    console.log("password does NOT match");
    req.session.authenticated = false;
    res.render("login", { menuItem: buildLogin(req) });
  } //if else statement.
}); //login post

app.post("/insertuser", async function (req, res) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let username = req.body.username;
  let passwd = bcrypt.hashSync(req.body.psw, 10); //password hashed
  let type = req.body.type;
  var isAdmin;
  if (req.body.adminStatus === "false") {
    isAdmin = false;
  } else {
    isAdmin = true;
  }
  try {
    let result = await insertUser(
      firstName,
      lastName,
      email,
      username,
      passwd,
      type,
      isAdmin
    );
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  } catch (err) {
    console.log(err);
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  }
});

app.post("/deluseremail", async function (req, res) {
  let email = req.body.email;
  try {
    let result = await deleteUserByEmail(email);
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  } catch (err) {
    console.log(err);
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  }
});

app.post("/deluseremail", async function (req, res) {
  let email = req.body.email;
  try {
    let result = await deleteUserByEmail(email);
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  } catch (err) {
    console.log(err);
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  }
});

app.post("/deluserid", async function (req, res) {
  let id = parseInt(req.body.id);
  if (isNaN(id)) {
    console.log("Failure to parse Id");
    res.render("admin", {
      menuItem: buildLogin(req),
    });
    return;
  }
  try {
    let result = await deleteUserById(id);
    console.log(result);
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  } catch (err) {
    console.log(err);
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  }
});

app.post("/insertlisting", async function (req, res) {
  let address = req.body.address;
  let state = req.body.state;
  let city = req.body.city;
  let parking = req.body.parking;
  let desc = req.body.desc;
  let type = req.body.type;
  let date = "2020-05-26";

  let zipcode = parseInt(req.body.zipcode);
  let owner = parseInt(req.body.owner);
  let rooms = parseInt(req.body.rooms);
  let sqft = parseInt(req.body.sqft);
  let bath = parseInt(req.body.baths);
  let deposit = parseInt(req.body.deposit);
  let fees = parseInt(req.body.fees);
  let utilities = parseInt(req.body.utilities);

  var pets;
  var cooling;
  var heating;
  var accessibility;
  var smoking;

  // Hella type conversion
  if (req.body.pets === "false") {
    pets = false;
  } else {
    pets = true;
  }
  if (req.body.cooling === "false") {
    cooling = false;
  } else {
    cooling = true;
  }
  if (req.body.heating === "false") {
    heating = false;
  } else {
    heating = true;
  }
  if (req.body.accessibility === "false") {
    accessibility = false;
  } else {
    accessibility = true;
  }
  if (req.body.smoking === "false") {
    smoking = false;
  } else {
    smoking = true;
  }

  // Hella typechecking
  if (isNaN(zipcode)) {
    console.log("Failure to parse Int");
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  }
  if (isNaN(owner)) {
    console.log("Failure to parse Int");
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  }
  if (isNaN(rooms)) {
    console.log("Failure to parse Int");
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  }
  if (isNaN(sqft)) {
    console.log("Failure to parse Int");
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  }

  if (isNaN(zipcode)) {
    console.log("Failure to parse Int");
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  }
  if (isNaN(fees)) {
    console.log("Failure to parse Int");
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  }
  if (isNaN(bath)) {
    console.log("Failure to parse Int");
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  }
  if (isNaN(deposit)) {
    console.log("Failure to parse Int");
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  }

  if (isNaN(utilities)) {
    console.log("Failure to parse Int");
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  }
  try {
    let result = await insertListing(
      address,
      state,
      city,
      zipcode,
      owner,
      rooms,
      sqft,
      bath,
      pets,
      date,
      cooling,
      heating,
      parking,
      deposit,
      fees,
      utilities,
      desc,
      type,
      accessibility,
      smoking
    );
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  } catch (err) {
    console.log(err);
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  }
});

app.post("/deletemylisting", async function (req, res) {
  let validation = req.session.authenticated;
  if (validation == false || validation == undefined) {
    res.render("login", { menuItem: buildLogin(req) });
  } else {
    try {
      let owner = await getUserIdViaEmail(req.session.email);
      let ownerId = owner[0].id;
      let data = await getListingsByOwnerId(ownerId);
      console.log(data);
      res.render("ownedlistings", {
        menuItem: buildLogin(req),
        data: data,
      });
    } catch (err) {
      console.log(err);
      res.render("admin", {
        menuItem: buildLogin(req),
      });
    }
  }
});

app.post("/ownerdelete", async function (req, res) {
  try {
    let id = req.body.listing;
    let result = await deleteListing(id);
    console.log(result);
    res.render("delconfirmation", {
      menuItem: buildLogin(req),
    });
  } catch (err) {
    console.log(err);
    res.render("index", {
      menuItem: buildLogin(req),
    });
  }
});

app.post("/dellistingid", async function (req, res) {
  let id = parseInt(req.body.id);
  console.log(id);
  if (isNaN(id)) {
    console.log("Failure to parse Id");
    res.render("admin", {
      menuItem: buildLogin(req),
    });
    return;
  }
  try {
    let result = await deleteListing(id);
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  } catch (err) {
    console.log(err);
    res.render("admin", {
      menuItem: buildLogin(req),
    });
  }
});

app.post("/deletemyprofile", async function (req, res) {
  let validation = req.session.authenticated;
  if (validation == false || validation == undefined) {
    res.render("login", { menuItem: buildLogin(req) });
  } else {
    try {
      let id = req.body.renterId;
      let email = req.session.email;
      let userDeleted = await deleteUserByEmail(email);
      let profileDeleted = await deleteRenterById(id);
      req.session.authenticated = false;
      console.log(userDeleted);
      console.log(profileDeleted);
      res.render("profiledeleted", {
        menuItem: buildLogin(req),
      });
    } catch (err) {
      console.log(err);
      res.render("index", {
        menuItem: buildLogin(req),
      });
    }
  }
});

app.post("/myprofile", async function (req, res) {
  let validation = req.session.authenticated;
  if (validation == false || validation == undefined) {
    res.render("login", { menuItem: buildLogin(req) });
  } else {
    try {
      let owner = await getUserIdViaEmail(req.session.email);
      console.log(owner);
      let ownerId = owner[0].id;
      console.log(ownerId);
      let data = await getRenterProfileByUserId(ownerId);
      console.log(data);
      res.render("myprofile", {
        menuItem: buildLogin(req),
        data: data,
      });
    } catch (err) {
      console.log(err);
      res.render("profiles", {
        menuItem: buildLogin(req),
      });
    }
  }
});

app.post("/contactrenter", async function (req, res) {
  let validation = req.session.authenticated;
  if (validation == false || validation == undefined) {
    res.render("login", { menuItem: buildLogin(req) });
  } else {
    try {
      let renterId = req.body.renter;
      let userInfo = await getUserIdByRenterId(renterId);
      let user = await getOwnerById(userInfo[0].userid);
      let renterInfo = await getRenterProfileByUserId(userInfo[0].userid);
      console.log(userInfo);
      console.log(renterInfo);
      res.render("contactrenter", {
        menuItem: buildLogin(req),
        userInfo: user[0],
        renter: renterInfo[0],
      });
    } catch (err) {
      console.log(err);
      res.render("contactrenter", {
        menuItem: buildLogin(req),
      });
    }
  }
});

//******************************************************************************
// Functions
//******************************************************************************
// Checks the provided password against the database password for authentication

function getUserIdByRenterId(id) {
  let sql = "SELECT userid FROM leewayz.renter WHERE id = ?";
  let params = [id];
  return new Promise(function (resolve, reject) {
    connection.query(sql, params, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    }); //query
  }); //promise
}

function getListingsByOwnerId(id) {
  let sql = "SELECT * FROM leewayz.listings WHERE owner = ?";
  let params = [id];
  return new Promise(function (resolve, reject) {
    connection.query(sql, params, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    }); //query
  }); //promise
}

function checkPassword(password, dbPassword) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, dbPassword, function (err, result) {
      resolve(result);
    }); //compare.
  }); // promise
}

function checkUsername(username) {
  let sql = "SELECT * FROM leewayz.users WHERE username = ? ";
  return new Promise(function (resolve, reject) {
    connection.query(sql, [username], function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    }); //query
  }); //promise
}

function uploadImagesListing(file1, file2, file3, id) {
  let sql =
    "UPDATE leewayz.listings SET image1 = ?, image2 = ?, image3 = ? WHERE id = ?";
  let sqlParams = [file1, file2, file3, id];
  return new Promise(function (resolve, reject) {
    connection.query(sql, sqlParams, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    }); //query
  }); //promise
}

function insertUser(
  firstname,
  lastname,
  email,
  username,
  password,
  type,
  adminStatus
) {
  let sql =
    "INSERT INTO leewayz.users (firstName, lastName, email, username, password, type, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?)";
  let sqlParams = [
    firstname,
    lastname,
    email,
    username,
    password,
    type,
    adminStatus,
  ];
  return new Promise(function (resolve, reject) {
    connection.query(sql, sqlParams, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    }); //query
  }); //promise
}

function getRenterProfileByUserId(id) {
  let sql = "SELECT * FROM leewayz.renter WHERE userid = ?";
  let sqlParams = [id];
  return new Promise(function (resolve, reject) {
    connection.query(sql, sqlParams, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    }); //query
  }); //promise
}

function getListingById(id) {
  let sql = "SELECT * FROM leewayz.listings WHERE id = ?";
  let params = [id];
  return new Promise(function (resolve, reject) {
    connection.query(sql, params, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    }); //query
  }); //promise
}

function getOwnerById(id) {
  let sql = "SELECT * FROM leewayz.users WHERE id = ?";
  let params = [id];
  return new Promise(function (resolve, reject) {
    connection.query(sql, params, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    }); //query
  }); //promise
}

function deleteUserByEmail(email) {
  console.log("in del function");
  let sql = "DELETE FROM leewayz.users WHERE email = ?";
  let sqlParams = [email];
  return new Promise(function (resolve, reject) {
    connection.query(sql, sqlParams, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    }); //query
  }); //promise
}

function deleteRenterById(id) {
  let sql = "DELETE FROM leewayz.renter WHERE id = ?";
  let sqlParams = [id];
  return new Promise(function (resolve, reject) {
    connection.query(sql, sqlParams, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    }); //query
  }); //promise
}

function deleteUserById(id) {
  let sql = "DELETE FROM leewayz.users WHERE id = ?";
  let sqlParams = [id];
  return new Promise(function (resolve, reject) {
    connection.query(sql, sqlParams, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    }); //query
  }); //promise
}

function getUserIdViaEmail(email) {
  let sql = "SELECT id FROM leewayz.users WHERE email = ?";
  let sqlParams = [email];
  return new Promise(function (resolve, reject) {
    connection.query(sql, sqlParams, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    }); //query
  }); //promise
}

function insertListing(
  streetAddr,
  state,
  city,
  zip,
  owner,
  rooms,
  sqft,
  bath,
  pets,
  date,
  cooling,
  heating,
  parking,
  deposit,
  fees,
  utilities,
  desc,
  propType,
  handicapAccess,
  smokingArea
) {
  let sql =
    "INSERT INTO leewayz.listings (streetAddress,state,city,zipcode,owner,rooms,sqft,bathrooms,pets,dateAvailable,cooling,heating,parking,deposit,fees,utilities,description,propertyType,handicapAccessible,smokingArea) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let sqlParams = [
    streetAddr,
    state,
    city,
    zip,
    owner,
    rooms,
    sqft,
    bath,
    pets,
    date,
    cooling,
    heating,
    parking,
    deposit,
    fees,
    utilities,
    desc,
    propType,
    handicapAccess,
    smokingArea,
  ];
  return new Promise(function (resolve, reject) {
    connection.query(sql, sqlParams, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    }); //query
  }); //promise
}

function deleteListing(id) {
  let sql = "DELETE FROM leewayz.listings WHERE id = ?";
  let sqlParams = [id];
  return new Promise(function (resolve, reject) {
    connection.query(sql, sqlParams, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    }); //query
  }); //promise
}

// Middleware function that keeps a user session active
function isAuthenticated(req, res, next) {
  if (!req.session.authenticated) {
    res.redirect("/");
  } else {
    next();
  }
}

//login, signup or logout on header menu
function buildLogin(req) {
  let menuItem = '<li> <a data-page="logout" href="/logout">LOGOUT</a></li>';
  if (!req.session.authenticated) {
    menuItem = '<li> <a data-page="login" href="/login">LOGIN</a></li>';
    menuItem += '<li><a data-page="signup" href="/signup">SIGN UP</a></li>';
  }
  return menuItem;
}

//server listener
// app.listen(PORT, "0.0.0.0", function () {
//   console.log("express server is working");
// });

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("Express Server is Running...");
});
