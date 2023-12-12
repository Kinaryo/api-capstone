// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     name: {
//         type: String,
//         required: true,
//     },
// });

// userSchema.plugin(passportLocalMongoose)
//     // { usernameField: 'email' })
// // userSchema.methods.verifyPassword = async function(candidatePassword) {
// //     return this.authenticate(candidatePassword);
// // };
// module.exports = mongoose.model('User', userSchema);



const mongoose = require('mongoose');
const {isEmail} = require('validator')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true,'Please enter an Name']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase:true,
    validate:[isEmail, 'Please enter a valid email']
  },
  username: {
    type: String,
    required : [true, 'please enter username']
  },
  password: {
    type: String,
    required:[true, 'Please enter an password'],
    minLength : [6, 'Minimun password length is 6 characters']
  },
});

module.exports = mongoose.model('User', userSchema);
