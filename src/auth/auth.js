import jwt from 'jsonwebtoken';
require('dotenv').config();

let authenToken = (req, res, next) => {
    let authHeader = req.headers['authorization'];
    let token = authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        //console.log(err, data)
        if(err) return res.status(403).json({
            err: false,
            message: "Token hết hạn!"
        });
    next();
    })
    
}
module.exports = {
    authenToken:authenToken
}