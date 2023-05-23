const { Router } = require("express");

const { login, register } = require("../controllers/auth.controllers");

const router = Router();

// <!---------- REGISTER ---------------!>
router.get("/auth/register", (_, res) => {
  res.render("register");
});
router.post("/auth/register", register);


// <!---------- LOGIN ---------------!>
router.get("/auth/login", (_, res) => {
  res.render("login");
});
router.post("/auth/login", login);


// <!---------- LOG OUT ---------------!>
router.get("/logout", async(_, res)=>{
  res.clearCookie("token");
  res.redirect("/api/auth/login");
})


module.exports = router;
