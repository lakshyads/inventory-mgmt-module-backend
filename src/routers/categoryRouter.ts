import express from 'express';
const router = express.Router();
import * as categoryController from '../controllers/categoryController'; // TODO
import requireLogin from '../utils/middlewares/requireLogin';

router.use('/api/categories', requireLogin);

router.route('/api/categories')
    .get(categoryController.findAll)
    .post(categoryController.create);

router.route('/api/categories/:categoryId')
    .get(categoryController.findOne)
    .put(categoryController.update)
    .delete(categoryController.remove);

// Exports ---------------------------------------
export default router;
