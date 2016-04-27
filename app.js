var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var session = require("express-session");
var routerApp = require("./routes");
var sessionMiddleware = require("./middleware/session");

var app = express();

// Middleware for static files
app.use("/public", express.static("public"));
// Middleware for parameters
app.use(bodyParser.json()) // JSON parameters
app.use(bodyParser.urlencoded({extended: true}));
// Middleware for sessions
app.use(session({
  secret: '43zhB2A7Fw2s48Qn921IkQIbJ4ZjvyCL',
  resave: false,
  saveUninitialized: false
}));

app.set("view engine", "jade");

app.get('/', function(req, res) {
  console.log("_id: " + req.session.user_id);
  res.render("index");
});

app.get('/signin', function(req, res) {
  User.find(function(err,user) {
    if (err) return console.log(err);
    //console.log(JSON.stringify(user));
    res.render("signin");
  });
});

app.get('/signup', function(req, res) {
  User.find(function(err,user) {
    if (err) return console.log(err);
    //console.log(JSON.stringify(user));
    res.render("signup");
  });
});

app.post('/register', function(req, res) {
    console.log("Correo electrónico: " + req.body.email);
    console.log("Contraseña: " + req.body.password);
    var user = new User({
      email: req.body.email, 
      password: req.body.password, 
      password_repeat: req.body.password_repeat,
      username: req.body.username
    });
    console.log("Repeat: " + user.password_repeat);
    // Save with promises
    user.save().then(function(user) {
      res.send("Datos guardados");
    }, function(err, objeto, filas) {
      /* objeto: en este caso User
       * filas: registros o documentos afectados
       * err: error recibido
       */      
      console.log(String(err));
      res.send("Ocurrio un error al guardar los datos");
    });
});

app.post('/session', function(req, res) {
  User.findOne({
    email: req.body.email, 
    password: req.body.password
  },function(err, user) {
    req.session.user_id = user._id;
    console.log("_id: " + req.session.user_id);
    res.redirect("/app");
  });
});

app.use("/app", sessionMiddleware);
app.use("/app", routerApp);

app.listen(8080);

console.log("Listen on port 8080");
