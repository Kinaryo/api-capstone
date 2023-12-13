const jwt = require('jsonwebtoken');

module.exports.generateLogToken = (user)=>{
    return jwt.sign(
        {
            _id:user._id,
            username:user.username,
            email:user.email
        },
        process.env.JWT_PASS
    )
}