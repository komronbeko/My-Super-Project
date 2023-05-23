const {Router} = require("express");
const isAuth = require("../middlewares/is-auth.middleware");
const { historiesGetController } = require("../controllers/histories.controller");


const router = Router();

router.get("/posts/histories", isAuth, historiesGetController);

module.exports = router;