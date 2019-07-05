
const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile("server.log", log + "\n", (err) => { });
    next();
});
app.use((req, res, next) => {
    // res.render("maintenance.hbs");
    next();
});
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("screamIt", (text) => text.toUpperCase());

app.get("/", (req, res) => {
    res.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to my website",
    });
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page",
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Unabled to handle request"
    });
});

var server = app.listen(port, () => {
    console.log("Server is up on port " + server.address().port);
});


