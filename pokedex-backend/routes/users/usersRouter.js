var express = require("express");
var router = express.Router();

var {
	signUp,
	login,
	updateUserPassword,
} = require("./controller/userController");

var {
	checkIfEmptyMiddleware,
	checkForSymbolMiddleware,
	checkLoginIsEmpty,
} = require("../lib/validator");

var { checkIsUserHaveValidJwtToken } = require("../lib/authChecker");

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("Users");
});

router.post(
	"/sign-up",
	checkIfEmptyMiddleware,
	checkForSymbolMiddleware,
	signUp
);

router.post("/login", checkLoginIsEmpty, login);

router.put(
	"/update-user-password",
	checkIsUserHaveValidJwtToken,
	updateUserPassword
);

module.exports = router;