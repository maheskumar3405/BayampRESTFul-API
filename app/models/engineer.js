var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EngineerSchema = new Schema({

  name : String,
  id: String

});

module.exports = mongoose.model('BayampEngineer',EngineerSchema);
