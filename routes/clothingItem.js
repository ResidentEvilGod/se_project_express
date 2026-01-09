const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require('../controllers/clothingItem');

const {
  validateCreateItem,
  validateUpdateItem,
  validateItemId,
} = require('../middlewares/validation');

router.get('/', getItems);

router.use(auth);

router.post('/', validateCreateItem, createItem);
router.put('/:itemId', validateItemId, validateUpdateItem, updateItem);
router.delete('/:itemId', validateItemId, deleteItem);
router.put('/:itemId/likes', validateItemId, likeItem);
router.delete('/:itemId/likes', validateItemId, dislikeItem);

module.exports = router;

