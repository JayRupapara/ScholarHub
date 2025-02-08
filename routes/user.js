// routes file
const userController = require("../controllers/user");
const { check } = require("express-validator");
const router = require("express").Router();
// signup route

router.post(
  "/signup",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
  ],
  userController.signup
);
// login route
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
  ],
  userController.login
);
module.exports = router;
