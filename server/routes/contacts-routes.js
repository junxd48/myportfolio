import express from 'express';
import { authorizeAdmin } from '../middleware/authorize-admin.js';

import {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
} from '../controllers/contacts-controllers.js';

import { authenticateToken } from '../middleware/auth-middleware.js';

const router = express.Router();

// PUBLIC ROUTE:
// Allow portfolio visitors to submit contact messages.
router.post('/', createContact);    // CREATE

// PROTECTED ROUTES:
// Require a valid JWT to read, update, or delete messages.
router.get('/', authenticateToken, authorizeAdmin, getAllContacts);         // READ
router.get('/:id', authenticateToken, authorizeAdmin, getContactById);      // READ
router.put('/:id', authenticateToken, authorizeAdmin, updateContact);       // UPDATE  
router.delete('/:id', authenticateToken, authorizeAdmin, deleteContact);    // DELETE

export default router;
