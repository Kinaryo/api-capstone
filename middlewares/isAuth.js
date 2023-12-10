// module.exports = (req,res,next)=>{
//     if(!req.isAuthenticated()){
//         req.flash('error_msg', 'Maaf! anda belum login')
//         return res.redirect('/login')


//     }
//     next();
// }

require('dotenv').config();

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';

module.exports = function isAuth(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Tidak diizinkan');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).send('Token tidak valid');
    }

    req.user = decoded;
    next();
  });
};