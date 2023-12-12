const { json } = require("body-parser");
const jwt = require('jsonwebtoken');

module.exports.isAuth = (req,res,next)=>{
  const token = req.cookies.access_token;

  if(!token){
    return res.status(401).json('no token faund')
  }

  jwt.verify(token, 'motosite',(err,payload)=>{
    if(err){
      return res.status(403).json('invalid Token')
    }

    req.user = {
      id: payload.id
    }
    next();
  })
}
