var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
	},
	password: {
		type: String
	}
});
var url = 'mongodb://localhost:27017/User';
var User = module.exports = mongoose.model('account', UserSchema);

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, res) {
    	if(err) throw err;
    	callback(null, res);
	});
}