import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the structure of documents in the users collection.
const userSchema = new mongoose.Schema(
    {
        // User's full name.
        name: {
            type: String,
            required: true,
            trim: true
        },

        // Email address used to identify the user.
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        // Store the hashed password, not the original password.
        password: {
            type: String,
            required: true,
            select: false
        },

        // Identify whether the user is an administrator or regular user.
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        // Automatically maintain createdAt and updatedAt.
        timestamps: true
    }
);

// Execute before a user document is saved.
userSchema.pre('save', async function () {

    // Only hash the password when it has changed.
    if (!this.isModified('password')) {
        return;
    }

    // Convert the plain-text password into a bcrypt hash.
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare a login password with the stored password hash.
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Create and export the User model.
export default mongoose.model('User', userSchema);