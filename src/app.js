const fileUpload = require("express-fileupload");
require("dotenv").config();
const cors = require("cors");
const cookie = require("cookie-parser");
const express = require("express");

const routes = require("./routes")

const app = express();

app.use(cookie());

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(fileUpload());


app.use("/api", express.static(process.cwd() + "/uploads"));

app.set("view engine", "ejs");

app.use("/api", routes);

const PORT = process.env.PORT;   

app.listen(PORT, ()=>{
    console.log(`on Port ${PORT}`);
});