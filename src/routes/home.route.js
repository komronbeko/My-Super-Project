const {Router} = require("express");
const isAuth = require("../middlewares/is-auth.middleware");

const homeControlller = require("../controllers/home.controller");

const router = Router();

router.get("/home", isAuth, homeControlller)

module.exports = router;