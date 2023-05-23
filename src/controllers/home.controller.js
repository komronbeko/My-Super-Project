const Io = require("../utils/Io");
const Users = new Io("database/users.json");

const homeControlller = async(req, res)=>{
    try {
        const users = await Users.read();
    
        const verifiedUser = req.verifyUser;
    
        const personalAccount  = users.find(el=>el.id === verifiedUser);
        
        res.render("home", {
            users,
            personalAccount
        });
        
    } catch (error) {
        res.status(403).json({message: error.message});
    }

}

module.exports = homeControlller;