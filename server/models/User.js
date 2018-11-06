var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;


var User = new Schema({
  firstName: {
    type: String,
    default: ''
  },

  lastName: {
    type: String,
    default: ''
  },
  
  email: {
    type: String,
    default: ''
  },

  password: {
    type: String,
    default: ''
  },

  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
    collection: 'users'
});

User.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

};

// User.methods.validPassword = function(password){
//     return bcrypt.compareSync(password, this.password);
// };

User.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};

module.exports = mongoose.model('User', User);
