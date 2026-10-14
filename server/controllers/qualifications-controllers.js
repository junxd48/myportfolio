import mongoose from 'mongoose';
import QualificationModel from '../models/qualification-model.js';

// GET /api/qualifications
// Retrieve all qualifications.
export const getAllQualifications = async (req, res) => {
    try {
        const qualifications = await QualificationModel.find();

        return res.status(200).json(qualifications);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// GET /api/qualifications/:id
// Retrieve a qualification by MongoDB ID.
export const getQualificationById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid qualification ID'
            });
        }

        const qualification = await QualificationModel.findById(req.params.id);
        if (!qualification) {
            return res.status(404).json({
                message: 'Qualification not found'
            });
        }

        return res.status(200).json(qualification);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// POST /api/qualifications
// Create a qualification.
// CREATE - Add a new qualification to MongoDB.
export const createQualification = async (req, res) => {
  try {
    // Extract the qualification fields from the request body.
    const {
      title,
      institution,
      category,
      year,
      completionDate,
      inProgress,
      description
    } = req.body ?? {};

    // Create a qualification document.
    const newQualification = new QualificationModel({
      title,
      institution,
      category,
      year,
      completionDate,
      inProgress,
      description
    });

    // Save the document to MongoDB.
    const savedQualification = await newQualification.save();

    // Return the saved qualification.
    return res.status(201).json(savedQualification);

  } catch (error) {
    if (error.name === 'ValidationError' ||
        error.name === 'CastError') {
      return res.status(400).json({
        message: error.message
      });
    }

    console.error('Create qualification error:', error);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// PUT /api/qualifications/:id
// Update an existing qualification.
export const updateQualification = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid qualification ID'
            });
        }

        // Restrict updates to fields defined in the schema.
        const allowedFields = [
            'title',
            'institution',
            'category',
            'year',
            'completionDate',
            'inProgress',
            'description'
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

        const updatedQualification =
            await QualificationModel.findByIdAndUpdate(
                req.params.id,
                updates,
                {
                    returnDocument: 'after',
                    runValidators: true
                }
            );

        if (!updatedQualification) {
            return res.status(404).json({
                message: 'Qualification not found'
            });
        }

        return res.status(200).json(updatedQualification);
    } catch (error) {
        if (error.name === 'ValidationError' ||
            error.name === 'CastError') {
            return res.status(400).json({
                message: error.message
            });
        }

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// DELETE /api/qualifications/:id
// Delete a qualification.
export const deleteQualification = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid qualification ID'
            });
        }

        const deletedQualification =
            await QualificationModel.findByIdAndDelete(req.params.id);

        if (!deletedQualification) {
            return res.status(404).json({
                message: 'Qualification not found'
            });
        }

        return res.status(200).json({
            message: 'Qualification deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};