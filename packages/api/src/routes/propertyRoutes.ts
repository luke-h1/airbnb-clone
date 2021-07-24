import express from 'express';
import { isAuth } from '../middleware/isAuth';

import {
  createProperty,
  updateProperty,
  deleteProperty,
  properties,
  property,
} from '../controllers/propertyController';

const router = express.Router();

router.route('/').get(properties).post(isAuth, createProperty);

router
  .route('/:id')
  .put(isAuth, updateProperty)
  .delete(isAuth, deleteProperty)
  .get(property);

export default router;
