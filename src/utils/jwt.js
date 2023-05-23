const jwt = require("jsonwebtoken");

const verify = (payload) =>  jwt.verify(payload, process.env.SECURITY_KEY);
const sign = (payload) =>  jwt.sign({payload}, process.env.SECURITY_KEY);


module.exports = {
    sign,
    verify
}
