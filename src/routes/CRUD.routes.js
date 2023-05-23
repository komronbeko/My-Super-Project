const {Router} = require("express");
const isAuth = require("../middlewares/is-auth.middleware");

const router = Router();

const {postController, readToPost, recreate} = require("../controllers/CRUD.controllers/post.controller");
const {editController, editGetController} = require("../controllers/CRUD.controllers/edit.controller");
const {deleteController, completeDelete} = require("../controllers/CRUD.controllers/delete.controller");
const { getIndividualController, getAllController, get_posts_of_specific_user } = require("../controllers/CRUD.controllers/get.controller");


// <!---------------- CREATE ---------------!>
router.get("/post", isAuth, readToPost);
router.post("/post", isAuth, postController);
router.post("/posts/histories/recreate/:id", isAuth, recreate);


// <!---------------- READ ---------------!>
router.get("/allPosts", isAuth, getAllController);
router.get("/post/:id", isAuth, get_posts_of_specific_user);
router.get("/postOne/:id", isAuth, getIndividualController);


// <!---------------- EDIT ---------------!>
router.get("/post/edit/:id", isAuth, editGetController);
router.post("/post/edit/:id", isAuth, editController);


// <!---------------- DELETE ---------------!>
router.post("/post/delete/:id", isAuth, deleteController);
router.post("/posts/histories/delete/:id", isAuth, completeDelete);


module.exports = router;


