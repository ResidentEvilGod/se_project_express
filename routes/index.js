const router = require("express").Router();

const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const auth = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/items", clothingItem);

router.use(auth);
router.use("/users", userRouter);

module.exports = router;
