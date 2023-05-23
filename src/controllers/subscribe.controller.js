const Io = require("../utils/Io");
const Users = new Io("database/users.json");

const subscribeController = async(req,res)=>{
    try {
        const {id} = req.params;
        const subscriber_id = req.verifyUser;
    
        const users = await Users.read();
    
        users.forEach((user) => {
          if (user.id === id) {
            const subscribe = user.subscribe;
    
            if (!subscribe.length) {
              subscribe.push({
                state: "true",
                subscriber_id: subscriber_id
              });
            } else {
              const boolArr = [];
    
              subscribe.map((el) => {
                if (el.subscriber_id === subscriber_id) {
                  return boolArr.push("bor");
                } else {
                  return boolArr.push("yoq");
                }
              });
    
              if (boolArr.includes("bor")) {
                subscribe.forEach((el) => {
                  if (el.subscriber_id === subscriber_id) {
                    if (el.state === "true") {
                      el.state = "false";
                    } else {
                      el.state = "true";
                    }
                    return el;
                  }
                });
              } else if (boolArr.includes("yoq")) {
                subscribe.push({
                  state: "true",
                  subscriber_id: subscriber_id,
                });
              }
            }
    
            return subscribe;
          }
        });
    
        Users.write(users);
    
        res.redirect(`/api/post/${id}`);
        
    } catch (error) {
        res.status(403).json({message: error.message});
    }
}

module.exports = {subscribeController}