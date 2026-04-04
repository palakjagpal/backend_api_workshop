import express  from 'express';
import {addItem, getAllItems,  getItemById , updateItem, deleteItem} from '../controllers/itemController.js';

const router=express.Router();

router.post('/add',addItem);
router.get('/getall',getAllItems);
router.get('/getbyid/:id',getItemById);
router.put('/update/:id',updateItem);
router.delete('/delete/:id',deleteItem);

export default router;