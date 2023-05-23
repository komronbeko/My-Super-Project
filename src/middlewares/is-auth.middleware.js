const {verify} = require("../utils/jwt")
const isAuth = (req, res, next)=>{
    
    token = req.cookies.token;

    if(!token){
       return res.redirect("auth/login");
    }

    const verifyToken = verify(token);

    req.verifyUser = verifyToken.payload;   // verifydan payload qaytyapti, userni id siga teng

    next();
}

module.exports = isAuth;