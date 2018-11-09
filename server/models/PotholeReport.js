var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var PotholeReport = new Schema({
  user: {
    type: String
  },
  latitude: {
      type: String
  },
  longitude: {
      type: String
  },
  state: {
    type: String, default: 'Por reparar'
  },
  url: {
    type: String 
  },
  description: {
    type: String 
  }
},{
    collection: 'reports'
});

module.exports = mongoose.model('PotholeReport', PotholeReport);