import UserModel from '../models/user-model.js';

// Allow access only to authenticated administrator accounts.
export const authorizeAdmin = async (req, res, next) => {
    try {
        // Authentication middleware must run before this function.
        if (!req.user?.userId) {
            return res.status(401).json({
                message: 'Authentication required'
            });
        }

        // Retrieve the user from MongoDB.
        const user = await UserModel.findById(req.user.userId);

        // Check that the user exists and has administrator privileges.
        if (!user || user.role !== 'admin') {
            return res.status(403).json({
                message: 'Administrator access required'
            });
        }

        // Continue to the requested controller.
        next();

    } catch (error) {
        console.error('Administrator authorization error:', error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};