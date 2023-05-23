const Io = require("../utils/Io");
const Histories = new Io("database/histories.json");

const historiesGetController = async (_, res) => {
  try {
    const deletedPosts = await Histories.read();

    res.render("histories", {
        deletedPosts
    });
  } catch (error) {
    res.status(403).json({message: error.message});
  }
};

module.exports = {historiesGetController}