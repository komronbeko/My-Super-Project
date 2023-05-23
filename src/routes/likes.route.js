const {Router} = require("express");
const isAuth = require("../middlewares/is-auth.middleware");
const { likesGetController, likedPostController, dislikedPostController } = require("../controllers/likes.controller");


const router = Router();

router.get("/posts/likes", isAuth, likesGetController);
router.post("/likes/:id", isAuth, likedPostController);
router.post("/dislikes/:id", isAuth, dislikedPostController);

module.exports = router;