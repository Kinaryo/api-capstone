
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {generateLogToken} = require('../utils/generateLogToken')

module.exports.register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ error: 'User with the given email already exists' });
    }

    const newUser = await new User({
      fullname: req.body.fullname,
      email: req.body.email,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
    }).save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
  }
};


module.exports.login = async (req,res)=>{
  const user = await User.findOne({email:req.body.email})
  if (user){
    if(bcrypt.compare(req.body.password, user.password)){
      res.send(
        {
          _id:user._id,
          fullname:user.fullname,
          email:user.email,
          password: user.password,
          token:generateLogToken(user),
        }
      )
    }
  }
}





module.exports.registerForm = async (req, res) => {
    res.status(200).json({ message: 'Render registration form' });
}

// module.exports.register = async (req, res) => {
//     try {
//         const { email, username, password, name } = req.body;
//         const user = new User({ email, username, name });
//         const registerUser = await User.register(user, password);

//         req.login(registerUser, (err) => {
//             if (err) return next(err);
//             req.flash('success_msg', 'Registrasi berhasil, Anda berhasil login');
//             res.status(200).json({ success: true, message: 'Registrasi berhasil' });
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

module.exports.loginForm = (req, res) => {
    res.status(200).json({ message: 'Render login form' });
}

// module.exports.login = (req, res) => {
//     res.status(200).json({ success: true, message: 'Login berhasil' });
// };

// module.exports.login = async (req, res) => {
//     // Jika autentikasi berhasil, buat token JWT
//     const payload = { user_id: req.user._id, username: req.user.username };
//     const secretKey = 'motositefindr123'; // Ganti dengan kunci rahasia yang aman
//     const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Tambahkan opsi expiresIn jika diperlukan

//     // Kirim token sebagai respons
//     res.status(200).json({ success: true, message: 'Login berhasil', token });
// }





module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success_msg', 'Anda berhasil logout');
        res.status(200).json({ success: true, message: 'Logout berhasil' });
})}


