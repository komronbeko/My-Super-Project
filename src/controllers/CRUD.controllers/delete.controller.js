const fs = require("fs").promises;

const Io = require("../../utils/Io");
const Posts = new Io("database/posts.json");
const Histories = new Io("database/histories.json");

const deleteController = async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await Posts.read();
    const histories = await Histories.read();

    const findPost = posts.find((el) => el.id === id);

    if (!findPost) {
      throw new Error("Book with this id is not detected");
    }

    const newHistoriesData = histories ? [...histories, findPost] : [findPost];

    const filteredPosts = posts.filter((el) => el.id !== id);


    Histories.write(newHistoriesData)
    Posts.write(filteredPosts);

    res.redirect("/api/home");
  } catch (error) {
    res.status(403).json({message: error.message});
  }
};

const completeDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const histories = await Histories.read();

    const findPost = histories.find((el) => el.id === id);

    if (!findPost) {
      throw new Error("Book with this id is not detected");
    }

    const filteredHistories = histories.filter((el) => el.id !== id);

    Histories.write(filteredHistories);

    res.redirect("/api/posts/histories");
  } catch (error) {
    res.status(403).json({message: error.message});
  }
};



module.exports = {
  deleteController,
  completeDelete
};
