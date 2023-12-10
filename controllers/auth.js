const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config();
// const jwt = require('jsonwebtoken')
// const User = require('../models/user');

// module.exports.registerForm = async (req, res) => {
//     res.status(200).json({ message: 'Render registration form' });
// }

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

// module.exports.loginForm = (req, res) => {
//     res.status(200).json({ message: 'Render login form' });
// }

// // module.exports.login = (req, res) => {
// //     res.status(200).json({ success: true, message: 'Login berhasil' });
// // };

// module.exports.login = async (req, res) => {
//     // Jika autentikasi berhasil, buat token JWT
//     const payload = { user_id: req.user._id, username: req.user.username };
//     const secretKey = 'motositefindr123'; // Ganti dengan kunci rahasia yang aman
//     const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Tambahkan opsi expiresIn jika diperlukan

//     // Kirim token sebagai respons
//     res.status(200).json({ success: true, message: 'Login berhasil', token });
// }





// module.exports.logout = (req, res) => {
//     req.logout(function (err) {
//         if (err) { return next(err); }
//         req.flash('success_msg', 'Anda berhasil logout');
//         res.status(200).json({ success: true, message: 'Logout berhasil' });
//     });
// }


module.exports.register = async (req, res) => {
    const { fullname, email, username, password } = req.body;
  
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = new User({ fullname, email, username, password: hashedPassword });
      await user.save();
  
      res.status(200).json({
        message: 'User terdaftar dengan sukses',
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          username: user.username,
        },
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Error saat mendaftarkan user' });
    }
  };



  module.exports.login= async (req, res) => {
    const { username, password } = req.body;
  
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
  
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(401).json({ error: 'Username atau password salah' });
    }
  
    const validPassword = await bcrypt.compare(password, user.password);
  
    if (!validPassword) {
      return res.status(401).json({ error: 'Username atau password salah' });
    }
  
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
  
    res.json({
      message: 'Berhasil login',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
      },
      token,
    });
  };