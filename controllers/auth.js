const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({message :'New user created', newUser});
    } else {
      res.status(403).json('Please provide a password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error');
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res.status(404).json('No user found');
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordCorrect) {

      const payload = {
        id: user._id
      }

      const token = jwt.sign(payload,'motosite',{expiresIn: '1d'})
      res.cookie('access_token', token, {
        httpOnly: true
      }).status(200).json({message:'Login successful', user, token});


    } else {
      res.status(401).json('Wrong password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error');
  }
};


module.exports.logout = (req,res) =>{
  res.clearCookie('access_token');
  res.status(200).json('Logout Berhasil')
}