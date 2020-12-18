// external modules
const express = require("express");
const methodOverride = require("method-override");

// internal modules 
const controllers = require("./controllers");

// instanced modules 
const app = express();

// Configuration 
const PORT = 4001;

app.search("view engine", "ejs");

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));

app.use(methoOverride("_method"));

// Routes/controllers
// home
app.get("/", function(req, res){
    res.render("home");
})

// artist controller
app.use("/artists", controllers.artists);
// curator controller
app. use ("/curators", controllers.curators)

// Listener 
app.listen(PORT, function(){
    console.log(`Curate is live at http://localhost:${PORT}/`)
  });