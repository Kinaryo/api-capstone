// const jwt = require('jsonwebtoken');

// module.exports.generateLogToken = (user)=>{
//     return jwt.sign(
//         {
//             _id:user._id,
//             fullname:user.fullname,
//             email:user.email
//         },
//         process.env.JWT_PASS || '****',
//         {
//             expiresIn: '10d',
//         }
//     )
// }