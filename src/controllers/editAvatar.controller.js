const fs = require("fs").promises;
const {v4: uuid} = require("uuid");

const Io = require("../utils/Io");
const Users = new Io("database/users.json");

const edit_avatar_to_read = async (req, res) => {
  try {
    const usersData = await Users.read();
  
    const access_id = req.verifyUser;
  
    const findUser = usersData.filter((el) => el.id === access_id);
  
    const findUser_avatar = findUser[0].image;
  
    res.render("editAvatar", {
      findUser_avatar,
    });
  } catch (error) {
    res.status(403).json({message: error.message});
  }
};

const editAvatar = async (req, res) => {
  try {
    const { image } = req.files;

    const access_id = req.verifyUser;

    const usersData = await Users.read();

    const imageName = `${uuid()}.${image.mimetype.split("/")[1]}`;

    image.mv(`${process.cwd()}/uploads/${imageName}`);

    usersData.forEach((el) => {
      if (el.id === access_id) {
        fs.unlink(`${process.cwd()}/uploads/${el.image}`);
        el.image = imageName;
        return el;
      }
    });

    Users.write(usersData);

    res.redirect("/api/home");
  } catch (error) {
    res.status(403).json({message: error.message});
  }
};

module.exports = {
  edit_avatar_to_read,
  editAvatar,
};
