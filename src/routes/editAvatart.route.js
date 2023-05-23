const {Router} = require("express");
const isAuth = require("../middlewares/is-auth.middleware");
const { edit_avatar_to_read, editAvatar } = require("../controllers/editAvatar.controller");

const router = Router();

router.get("/editAvatar", isAuth, edit_avatar_to_read);

router.post("/editAvatar", isAuth, editAvatar);

module.exports = router;