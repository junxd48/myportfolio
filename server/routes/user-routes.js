import express from 'express';
import { authenticateToken } from '../middleware/auth-middleware.js';
import { authorizeUser } from '../middleware/authorize-user.js';
import { authorizeAdmin } from '../middleware/authorize-admin.js';

import {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById,
    loginUser
} from '../controllers/user-controllers.js';

const router = express.Router();

// PUBLIC ROUTES

// Register a new user.
router.post('/', createUser);

// Sign in and obtain a JWT.
router.post('/login', loginUser);

// Optional alias for the assignment's signin terminology.
router.post('/signin', loginUser);

// PROTECTED ROUTES

// Retrieve all users.
router.get('/', authenticateToken, authorizeAdmin, getAllUsers);

// Retrieve a specific user.
router.get('/:id', authenticateToken, authorizeUser, getUserById);

// Update a user.
router.put('/:id', authenticateToken, authorizeUser, updateUser);

// Delete a user.
router.delete('/:id', authenticateToken, authorizeUser, deleteUser);

export default router;