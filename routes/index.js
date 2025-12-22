const router = require("express").Router();

const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const auth = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");

// Public routes (no auth)
router.post("/signin", login);
router.post("/signup", createUser);

// Protect all routes below
router.use(auth);

router.use("/users", userRouter);
router.use("/items", clothingItem);

module.exports = router;
