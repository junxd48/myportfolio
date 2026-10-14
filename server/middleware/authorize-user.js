// Allow a user to modify only their own account.
export const authorizeUser = (req, res, next) => {

    // req.user.userId was populated by authenticateToken().
    const authenticatedUserId = req.user.userId;

    // Compare the authenticated user's ID with the requested account ID.
    if (authenticatedUserId !== req.params.id) {
        return res.status(403).json({
            message: 'Access denied. You cannot modify another user account.'
        });
    }

    // The authenticated user owns the requested account.
    next();
};