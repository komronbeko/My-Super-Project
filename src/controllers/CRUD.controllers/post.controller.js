const { v4: uuid } = require("uuid");
const Joi = require("joi");

const Io = require("../../utils/Io");
const Posts = new Io("database/posts.json");
const Histories = new Io("database/histories.json");

const Post = require("../../models/Post");

const readToPost = (_, res) => {
  try {
    res.render("homePost");
  } catch (error) {
    res.status(403).json({message: error.message});
  }
};

const postController = async (req, res) => {
  try {
    const { title, description, place } = req.body;
    const { video } = req.files;

    const schema = Joi.object({
      username: Joi.string().alphanum().required(),
      password: Joi.string().required(),
      place: Joi.string()
  });


  const {error} = schema.validate({username, password, place});
  if(error){
      return res.render("post");
  } 

    const postsData = await Posts.read();

    const user_id = req.verifyUser;
    const id = uuid();

    const date = new Date();

    const videoName = `${uuid()}.${video.mimetype.split("/")[1]}`;

    video.mv(`${process.cwd()}/uploads/${videoName}`);

    const newPost = new Post(
      id,
      user_id,
      title,
      place,
      description,
      videoName,
      date
    );

    const newPostsData = postsData ? [...postsData, newPost] : [newPost];

    Posts.write(newPostsData);

    res.redirect("home");
  } catch (error) {
    res.status(403).json({message: error.message});
  }
};

const recreate = async (req, res) => {
  try {
    const { id } = req.params;
  
    const postsData = await Posts.read();
    const deletedPosts = await Histories.read();
  
    const findDeleted = deletedPosts.find((el) => el.id === id);
  
    const newPostsData = postsData ? [...postsData, findDeleted] : [findDeleted];
  
    const filteredHistories = deletedPosts.filter((el) => el.id !== id);
  
    Posts.write(newPostsData);
    Histories.write(filteredHistories);
  
    res.redirect(`/api/posts/histories`);
  } catch (error) { 
    res.status(403).json({message: error.message});
  }
};

module.exports = { postController, readToPost, recreate };
