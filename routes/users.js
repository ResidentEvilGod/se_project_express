const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { validateUpdateProfile } = require('../middlewares/validation');

router.patch('/me', validateUpdateProfile, updateProfile);


router.get("/me", getCurrentUser);
router.patch("/me", updateProfile);

module.exports = router;
