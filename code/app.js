const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const app = express();
const uri =
  "mongodb+srv://sample:sample@cluster0-2c0kl.mongodb.net/test?retryWrites=true&w=majority";

var database, collection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index", { status: "" });
});

app.get("/lakelevel", (req, res) => {
  collection = database.collection("lake");
  collection.find({}).toArray((err, result) => {
    const lake = result;
    res.render("pages/lakelevel", { lake: lake });
  });
});

app.get("/watertank", (req, res) => {
  collection = database.collection("tank");
  collection.find({}).toArray((err, result) => {
    const tank = result;
    res.render("pages/watertank", { tank: tank });
  });
});

app.get("/tanker", (req, res) => {
  collection = database.collection("tanker");
  collection.find({}).toArray((err, result) => {
    const tanker = result;
    res.render("pages/tanker", { tanker: tanker });
  });
});

app.get("/booktanker", (req, res) => {
  res.render("pages/booktanker");
});

app.get("/booksewage", (req, res) => {
  res.render("pages/booksewage");
});

app.get("/about", (req, res) => {
  res.render("pages/about");
});

app.get("/newconnection", (req, res) => {
  res.render("pages/newConnection");
});
app.get("/events", (req, res) => {
  collection = database.collection("events");
  collection.find({}).toArray((err, result) => {
    const events = result;
    res.render("pages/events", { events: events });
  });
});

app.get("/feedback", (req, res) => {
  collection = database.collection("feedbacks");
  collection.find({}).toArray((err, result) => {
    const feeds = result;
    res.render("pages/feedback", { feeds: feeds });
  });
});

app.post("/booktanker", (req, res) => {
  collection = database.collection("trequest");
  let newuser = {
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    category: req.body.category,
    address: req.body.address,
    log: new Date()
  };
  collection.insert(newuser, (err, result) => {
    console.log(result);
  });
  res.render("pages/index", { status: "sucess" });
});
app.post("/booksewage", (req, res) => {
  collection = database.collection("srequest");
  let newuser = {
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    category: req.body.category,
    address: req.body.address,
    log: new Date()
  };
  collection.insert(newuser, (err, result) => {
    console.log(result);
  });
  res.render("pages/index", { status: "sucess" });
});
app.post("/newconnection", (req, res) => {
  collection = database.collection("user");
  let newuser = {
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    category: req.body.category,
    address: req.body.address
  };
  collection.insert(newuser, (err, result) => {
    console.log(result);
  });
  res.render("pages/index", { status: "sucess" });
});

app.post("/feedback", (req, res) => {
  collection = database.collection("feedbacks");
  let newfeed = {
    comment: req.body.comment,
    rating: req.body.rating
  };
  collection.insert(newfeed, (err, result) => {
    console.log(result);
  });
  res.redirect("/feedback");
});

app.get("/admin", (req, res) => {
  var trequest = {},
    srequest = {},
    nfeed = {};
  collection = database.collection("trequest");
  collection.find({}).toArray((err, result) => {
    trequest = result;
    console.log(trequest);
  });
  collection = database.collection("srequest");
  collection.find({}).toArray((err, result) => {
    srequest = result;
    sample();
    console.log(srequest);
  });
  collection = database.collection("feedbacks");
  collection.find({ rating: { $lt: 3 } }).toArray((err, result) => {
    nfeed = result;
    console.log(nfeed);
  });
  const sample = () => {
    res.render("pages/admin", {
      trequest: trequest,
      srequest: srequest,
      nfeed: nfeed
    });
  };
});

app.listen(3000, () => {
  console.log("server running on the port 3000");
  MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      console.log("connection failed");
    }
    database = client.db("kaar");
    console.log("Connected to " + "sample" + "!");
  });
});
