import express from 'express';
import { admin, protect } from 'src/middleware/auth';
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
