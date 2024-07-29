import express from 'express';
import ItemController from '../controllers/itemController.js';

const router = express.Router();

router.post('/', ItemController.createItem);
router.get('/', ItemController.getItems);
router.get('/:id', ItemController.getItemById);
router.put('/:id', ItemController.updateItem);
router.delete('/:id', ItemController.deleteItem);

export default router;