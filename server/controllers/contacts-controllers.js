import mongoose from 'mongoose';
import ContactModel from '../models/contact-model.js';

// GET /api/contacts
// Retrieve all contact records.
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactModel.find();

        return res.status(200).json(contacts);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// GET /api/contacts/:id
// Retrieve one contact by its MongoDB ID.
export const getContactById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid contact ID'
            });
        }

        const contact = await ContactModel.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        return res.status(200).json(contact);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// POST /api/contacts
// Create a new contact record.
export const createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, contactNumber, message } = req.body ?? {};

        const newContact = new ContactModel({
            firstName,
            lastName,
            email,
            contactNumber,
            message
        });

        const savedContact = await newContact.save();

        return res.status(201).json(savedContact);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: error.message
            });
        }

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// PUT /api/contacts/:id
// Update an existing contact.
export const updateContact = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid contact ID'
            });
        }

        const allowedFields = [
            'firstName',
            'lastName',
            'email',
            'contactNumber',
            'message'
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body?.[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: 'No valid fields provided for update'
            });
        }

        const updatedContact = await ContactModel.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!updatedContact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        return res.status(200).json(updatedContact);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: error.message
            });
        }

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// DELETE /api/contacts/:id
// Delete an existing contact.
export const deleteContact = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid contact ID'
            });
        }

        const deletedContact = await ContactModel.findByIdAndDelete(req.params.id);

        if (!deletedContact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        return res.status(200).json({
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};