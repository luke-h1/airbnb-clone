import express from 'express';
import { admin, protect } from '../middleware/auth';
import {
  getProperties,
  getPropertyById,
  deleteProperty,
  createProperty,
  updateProperty,
  createPropertyReview,
  getTopProperties,
} from '../controllers/propertyController';

const router = express.Router();

router.route('/').get(getProperties).post(protect, admin, createProperty);
router.route('/:id/reviews').post(protect, createPropertyReview);
router.get('/top', getTopProperties);
router
  .route('/:id')
  .get(getPropertyById)
  .delete(protect, admin, deleteProperty)
  .put(protect, admin, updateProperty);
