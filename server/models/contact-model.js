import mongoose from 'mongoose';

// Define the structure of a contact document.
const contactSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        contactNumber: {
            type: String,
            trim: true
        },

        message: {
            type: String,
            trim: true
        }
    },
    {
        // Automatically create createdAt and updatedAt fields.
        timestamps: true,

        // Explicitly use the contacts collection in MongoDB.
        collection: 'contacts'
    }
);

// Create and export the Contact model.
export default mongoose.model('Contact', contactSchema);