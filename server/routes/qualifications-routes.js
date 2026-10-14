import express from 'express';
import { authorizeAdmin } from '../middleware/authorize-admin.js';

import {
    getAllQualifications,
    getQualificationById,
    createQualification,
    updateQualification,
    deleteQualification
} from '../controllers/qualifications-controllers.js';

import { authenticateToken } from '../middleware/auth-middleware.js';

const router = express.Router();

// Public READ endpoints.
// Portfolio visitors can view education and qualifications.
router.get('/', getAllQualifications);
router.get('/:id', getQualificationById);

// Protected endpoints for modifying qualifications.
router.post('/', authenticateToken, authorizeAdmin, createQualification);
router.put('/:id', authenticateToken, authorizeAdmin, updateQualification);
router.delete('/:id', authenticateToken, authorizeAdmin, deleteQualification);

export default router;