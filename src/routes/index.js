const authRoute = require("./auth.routes");
const homeRoute = require("./home.route");
const CRUDroutes = require("./CRUD.routes");
const likesRoute = require("./likes.route");
const editAvatarRoute = require("./editAvatart.route");
const historiesRoute = require("./histories.route.");
const subscribeRoute = require("./subscribe.route");

module.exports = [authRoute, homeRoute, CRUDroutes, likesRoute, editAvatarRoute, historiesRoute, subscribeRoute];