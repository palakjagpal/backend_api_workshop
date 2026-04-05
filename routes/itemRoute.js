import express  from 'express';
import {addItem, getAllItems,  getItemById , updateItem, deleteItem,bulkUpload} from '../controllers/itemController.js';
import { protectedRoute } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { uploadMiddleware } from '../middlewares/imageMiddleware.js';

const router=express.Router();

router.post('/add',authMiddleware,uploadMiddleware,addItem);
router.get('/getall',getAllItems);
router.get('/getbyid/:id',authMiddleware,getItemById);
router.put('/update/:id',authMiddleware,updateItem);
router.delete('/delete/:id',authMiddleware,deleteItem);
router.post('/bulk-upload', authMiddleware, bulkUpload);

export default router;
