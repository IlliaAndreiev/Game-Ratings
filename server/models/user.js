const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
 
const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

// User.pre('save', async function (next) {
//   const user = this;

//   if (user.isModified('password') || user.isNex) {
//     try {
//       const hash = await bcrypt.hash(user.password, 10);
//       user.password = hash;
//       next();
//     } catch (e) {
//       console.log('e sign-up', e);
//     }
//   }

//   next();
// });

// user.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// }

module.exports = mongoose.model('users', User);