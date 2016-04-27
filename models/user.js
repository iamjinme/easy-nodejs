var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");

var sex_values = ["M","F"];
var email_match = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var userSchema = new Schema({
  name: String,
  username: {type: String, required: true, maxlength: [50, "Es muy grande"]},
  password: {
    type: String, 
    required: true, 
    minlength: [8, "Password muy corto"],
    validate: {
        validator: function(value) {
          return this.password_repeat == value;
        },
        message: "Las contraseñas no son iguales"
    }
  },
  age: {type: Number, min: [18, "Debes ser mayor de edad"], max: [100, "¿Aun estás vivo?"]},
  email: {type: String, required: "El correo es obligatorio", match: email_match},
  birthday: Date,
  sex: {type: String, enum: {values: sex_values, message: "Sexo imposible"}}
});

userSchema.virtual("password_repeat").get(function() {
  return this.pwd_repeat;
}).set(function(password) {
  this.pwd_repeat = password;
});

var User = mongoose.model("User", userSchema);

/* Data types for MongoDB
  String
  Number
  Date
  Buffer
  Boolean
  Mixed
  Objectid
  Array
*/

module.exports.User = User;
