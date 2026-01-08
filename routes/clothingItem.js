const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");
const { validateCreateItem, validateUpdateItem, validateItemId } =
  require('../middlewares/validation');

router.post('/', validateCreateItem, createItem);
router.put('/:itemId', validateItemId, validateUpdateItem, updateItem);
router.delete('/:itemId', validateItemId, deleteItem);
router.put('/:itemId/likes', validateItemId, likeItem);
router.delete('/:itemId/likes', validateItemId, dislikeItem);


router.get("/", getItems);

router.use(auth);

router.post("/", createItem);
router.put("/:itemId", updateItem);
router.delete("/:itemId", deleteItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
