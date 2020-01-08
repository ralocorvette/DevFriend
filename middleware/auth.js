const jwt = require('jsonwebtoken');
const config = require('config');
//(request,response,next is call back we gotta run before it goes to next piece in the middleware) verifies json web token
module.exports= function(req,res,next){
//Get the Token form the header
const token = req.header('x-auth-token');

//check if no token
if(!token){
    return res.status(401).json({msg: 'No token, authorization denied'});
}
//verify token
try{
    const decoded = jwt.verify(token,config.get('jwtSecret'));
    req.user = decoded.user;
    next();
}catch(err){
    res.status(401).json({msg:'Token is not valid'});
}
};