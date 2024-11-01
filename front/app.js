const express = require('express');
const path = require('node:path');

const app = express();

// Routes

// Set up CSS
app.use(express.static(__dirname + "/css"));

// Set up ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Used for req.body
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/", (req, res) => res.render("waldo"));

app.listen(3000, () => console.log("App listening on port 3000!"));