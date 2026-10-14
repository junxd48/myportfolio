
import mongoose from 'mongoose';
import ProjectModel from '../models/project-model.js';

// CRUD - Create, Read, Update, Delete

// GET: Retrieve all projects.
export const getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find();

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET: Retrieve a single project using its MongoDB ID.
export const getProjectById = async (req, res) => {
    try {
        // Validate the ID before querying MongoDB.
        if (!mongoose.isObjectIdOrHexString(req.params.id)) {
            return res.status(400).json({ message: 'Invalid project ID' });
        }

        const project = await ProjectModel.findById(req.params.id);

        // A valid ID does not necessarily correspond to an existing project.
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST: Create a new project.
export const createProject = async (req, res) => {
    try {
        // Accept only the fields defined for a project.
        const {
            title,
            description,
            image,
            role,
            outcome,
            startDate,
            endDate,
            completionDate
        } = req.body;

        const newProject = new ProjectModel({
            title,
            description,
            image,
            role,
            outcome,
            startDate,
            endDate,
            completionDate
        });

        // Save the project and run Mongoose schema validation.
        const savedProject = await newProject.save();

        res.status(201).json(savedProject);
    } catch (error) {
        if (error.name === 'ValidationError' ||
            error.name === 'CastError') {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};

// PUT: Update an existing project.
export const updateProject = async (req, res) => {
    try {
        if (!mongoose.isObjectIdOrHexString(req.params.id)) {
            return res.status(400).json({ message: 'Invalid project ID' });
        }

        // Allow only the fields defined by our project schema.
        const allowedFields = [
            'title',
            'description',
            'image',
            'role',
            'outcome',
            'startDate',
            'endDate',
            'completionDate'
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (Object.hasOwn(req.body, field)) {
                updates[field] = req.body[field];
            }
        }

        const updatedProject = await ProjectModel.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            {
                returnDocument: 'after',    // Return the updated document.
                runValidators: true         // Apply schema validation.
            }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        if (error.name === 'ValidationError' ||
            error.name === 'CastError') {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};

// DELETE: Remove a project using its MongoDB ID.
export const deleteProject = async (req, res) => {
    try {
        if (!mongoose.isObjectIdOrHexString(req.params.id)) {
            return res.status(400).json({ message: 'Invalid project ID' });
        }

        const deletedProject = await ProjectModel.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({
            message: 'Project deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
