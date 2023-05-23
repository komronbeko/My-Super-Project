const { subscribeController } = require("../controllers/subscribe.controller");
const isAuth = require("../middlewares/is-auth.middleware")

const router = require("express").Router();

router.post("/subscribe/:id", isAuth, subscribeController);

module.exports = router;