// const jwt = require('jsonwebtoken');

const { json } = require("body-parser");

// const isAuthToken = (req, res, next) => {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(401).json({ error: 'Token not provided' });
//   }

//   // Menggunakan secret key yang disimpan di lingkungan
//   const secretKey = process.env.JWT_PASS;

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ error: 'Token not valid' });
//     }

//     // Setelah verifikasi berhasil, set objek user pada req
//     req.user = decoded;

//     next();
//   });
// };

// module.exports.isAuthToken = isAuthToken;

const jwt = require('jsonwebtoken');

module.exports.isAuth = (req,res,next)=>{
  const token = req.cookies.access_token;

  if(!token){
    return res.status(401).json('no token faund')
  }

  jwt.verify(token, process.env.JWT_PASS,(err,payload)=>{
    if(err){
      return res.status(403).json('invalid Token')
    }

    req.user = {
      id: payload.id
    }
    next();
  })
}
