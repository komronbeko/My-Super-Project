const {v4: uuid} = require("uuid");
const bcrypt = require("bcrypt");

const {sign} = require("../utils/jwt")

const Io = require("../utils/Io");
const Users = new Io("database/users.json");

const User = require("../models/User");

const register =  async(req, res)=>{
    try {
        const {username, password} = req.body;
        const {image} = req.files;
    
        const usersData = await Users.read();
        
        const findUser = usersData.find(el=>el.username === username);
    
        if(findUser){
            return res.render("register", {
                message: "User already exists"
            })
        }
    
        const id = uuid(); 
        const hashPass = await bcrypt.hash(password, 12);
    
        const imageName = `${uuid()}.${image.mimetype.split("/")[1]}`;
        
        image.mv(`${process.cwd()}/uploads/${imageName}`);
    
        const newUser = new User(id, username, hashPass, imageName);
    
        const newUsersData = [...usersData, newUser];
        
        const token = sign(id);
        
        res.cookie("token", token);
    
        
        Users.write(newUsersData);
        
        res.redirect("/api/home");
        
    } catch (error) {
        res.status(403).json({message: error.message});
    }
}

const login = async(req, res)=>{
    try {
        const {username, password} = req.body;
    
        const usersData = await Users.read();
        
        const findUser = usersData.find(el=>el.username === username);
        
    
        if (!findUser) {
            return res.render("login", {
                message: "Incorrect username or password"
            })
        }
    
        const comparePass = await bcrypt.compare(password, findUser.password);
    
        if (!comparePass) {
            return res.render("login", {
                message: "Incorrect username or password"
            })
        }
    
    
        const token = sign(findUser.id);
        
    
        res.cookie("token", token);
    
        res.redirect("/api/home");
        
    } catch (error) {
        res.status(403).json({message: error.message});
    }
}

module.exports = {login, register}