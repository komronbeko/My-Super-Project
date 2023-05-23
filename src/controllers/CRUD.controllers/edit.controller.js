const Io = require("../../utils/Io");
const Posts = new Io("database/posts.json");

const editController = async (req, res) => {
  try {
    const { title, description, place } = req.body;

    const { id } = req.params;

    const date = new Date()

    const postsData = await Posts.read();

    postsData.forEach((el) => {
      if (el.id === id) {
        el.title = title;
        el.description = description;
        el.place = place;
        el.date = date;
        return el;
      }
    });

    Posts.write(postsData);

    res.redirect(`/api/postOne/${id}`);
  } catch (error) {
    res.status(403).json({message: error.message});
  }
};

const editGetController = async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await Posts.read();

    const filteredPost = posts.filter((el) => el.id === id);

    const postAssets = filteredPost[0];

    res.render("postEdit", {
      postAssets,
    });
  } catch (error) {
    res.status(403).json({message: error.message});
  }
};

module.exports = { editController, editGetController };
