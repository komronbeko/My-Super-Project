const Io = require("../utils/Io");
const Posts = new Io("database/posts.json");

const likesGetController = async (req, res) => {
  try {
    const posts = await Posts.read();

    const user_id = req.verifyUser;

    const likedPosts = [];

    for (let i = 0; i < posts.length; i++) {
      const liked = posts[i].liked;
      for (let j = 0; j < liked.length; j++) {
        if (liked[j].user_id === user_id && liked[j].state === "true") {
          likedPosts.push(posts[i])
        }
      }
    }

    res.render("likes", {
      likedPosts,
    });
  } catch (error) {
    console.log(error);
  }
};


const likedPostController = async (req, res) => {
  try {
    const { id } = req.params;

    const user_id = req.verifyUser;

    const posts = await Posts.read();

    posts.forEach((post) => {
      if (post.id === id) {
        const liked = post.liked;
        const disliked = post.disliked;

        disliked.forEach((el) => {
          if (el.user_id === user_id) {
            el.state = "false";
          }
          return el;
        });

        if (!liked.length) {
          liked.push({
            state: "true",
            user_id: user_id,
          });
        } else {
          const boolArr = [];

          liked.map((el) => {
            if (el.user_id === user_id) {
              return boolArr.push("bor");
            } else {
              return boolArr.push("yoq");
            }
          });

          if (boolArr.includes("bor")) {
            liked.forEach((el) => {
              if (el.user_id === user_id) {
                if (el.state === "true") {
                  el.state = "false";
                } else {
                  el.state = "true";
                }
                return el;
              }
            });
          } else if (boolArr.includes("yoq")) {
            liked.push({
              state: "true",
              user_id: user_id,
            });
          }
        }

        return liked, disliked;
      }
    });

    Posts.write(posts);

    res.redirect(`/api/postOne/${id}`);
  } catch (error) {
    res.status(403).json({message: error.message});
  }
};


const dislikedPostController = async (req, res) => {
  try {
    const { id } = req.params;
  
    const user_id = req.verifyUser;
  
    const posts = await Posts.read();
  
    posts.forEach((post) => {
      if (post.id === id) {
        const disliked = post.disliked;
        const liked = post.liked;
  
        liked.forEach((el) => {
          if (el.user_id === user_id) {
            el.state = "false";
          }
          return el;
        });
  
        if (!disliked.length) {
          disliked.push({
            state: "true",
            user_id: user_id,
          });
        } else {
          const boolArr = [];
          disliked.map((el) => {
            if (el.user_id === user_id) {
              return boolArr.push("bor");
            } else {
              return boolArr.push("yoq");
            }
          });
          if (boolArr.includes("bor")) {
            disliked.forEach((el) => {
              if (el.user_id === user_id) {
                if (el.state === "true") {
                  el.state = "false";
                } else {
                  el.state = "true";
                }
                return el;
              }
            });
          } else if (boolArr.includes("yoq")) {
            disliked.push({
              state: "true",
              user_id: user_id,
            });
          }
        }
  
        return disliked, liked;
      }
    });
  
    Posts.write(posts);
  
    res.redirect(`/api/postOne/${id}`);
    
  } catch (error) {
    res.status(403).json({message: error.message});
  }
};

module.exports = {
  likesGetController,
  likedPostController,
  dislikedPostController,
};
