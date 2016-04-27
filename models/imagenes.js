var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var imageSchema = new Schema({
  title: {type: String, required: true, minlength: [3, "Es muy corto"]}
});

var Imagen = mongoose.model("Imagen", imageSchema);

module.exports = Imagen;
