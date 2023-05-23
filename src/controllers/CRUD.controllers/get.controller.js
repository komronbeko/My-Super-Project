const Io = require("../../utils/Io");
const Posts = new Io("database/posts.json");
const Users = new Io("database/users.json");

const getAllController = async (_, res) => {
  try {
    const posts = await Posts.read();

    res.render("allPosts", {
      posts,
    });
  } catch (error) {
    res.status(403).json({message: error.message});
  }
};

const get_posts_of_specific_user = async (req, res) => {
  try {
    const { id } = req.params;
    const subscriber_id = req.verifyUser;

    const posts = await Posts.read();
    const users = await Users.read();

    const findUser = users.find(el=>el.id === id);

    const filteredPosts = posts.filter((el) => el.user_id === id);

    const subscribeAssets = findUser.subscribe.find(el=>el.subscriber_id === subscriber_id);


    res.render("userPosts", {
      filteredPosts,
      findUser,
      subscribeAssets
    });
  } catch (error) {
    res.status(403).json({message: error.message});
  }
};

const getIndividualController = async (req, res) => {
  try {
    const { id } = req.params;

    const access_id = req.verifyUser;

    const posts = await Posts.read();

    posts.forEach((el) => {
      if(el.id === id){
        if(!el.views.includes(access_id)){
          el.views.push(access_id);
        }
      }
    });

    Posts.write(posts);

    const postAssets = posts.find((el) => el.id === id);

    const likeAssets =
      postAssets.liked.find((el) => el.user_id === access_id);
    const dislikeAssets =
      postAssets.disliked.find((el) => el.user_id === access_id);

    const like_quantity = postAssets.liked.filter((el) => el.state === "true");
    const dislike_quantity = postAssets.disliked.filter(
      (el) => el.state === "true"
    );

    res.render("postOne", {
      postAssets,
      access_id,
      likeAssets,
      dislikeAssets,
      like_quantity,
      dislike_quantity,
    });
  } catch (error) {
    res.status(403).json({message: error.message});
  }
};

module.exports = {
  getIndividualController,
  getAllController,
  get_posts_of_specific_user,
};
