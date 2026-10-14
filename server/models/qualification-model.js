import mongoose from 'mongoose';

// Define the structure of a qualification document.
const qualificationSchema = new mongoose.Schema(
  {
    // Name of the credential, certificate, or qualification.
    title: {
      type: String,
      required: true,
      trim: true
    },

    // School or organization associated with the qualification.
    institution: {
      type: String,
      required: true,
      trim: true
    },

    // Qualification category.
    category: {
      type: String,
      enum: ['Education', 'Certification', 'Training'],
      required: true
    },

    // Display year, such as "2026" or "2021".
    year: {
      type: String,
      required: true,
      trim: true
    },

    // Completion date, if the qualification is completed.
    completionDate: {
      type: Date
    },

    // Indicates whether the qualification is still in progress.
    inProgress: {
      type: Boolean,
      default: false
    },

    // Additional information about the qualification.
    description: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    collection: 'qualifications'
  }
);

export default mongoose.model('Qualification', qualificationSchema);