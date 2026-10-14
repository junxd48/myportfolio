import jwt from 'jsonwebtoken';

// Middleware that verifies a JWT before allowing access to a route.
export const authenticateToken = (req, res, next) => {
    // Retrieve the Authorization header from the HTTP request.
    const authHeader = req.headers.authorization;

    // Expected format: Authorization: Bearer <token>
    const token = authHeader?.split(' ')[1];

    // Reject requests without a token or with an incorrect header format.
    if (!authHeader?.startsWith('Bearer ') || !token) {
        return res.status(401).json({
            message: 'Access denied. Authentication token required.'
        });
    }

    // Ensure the server has a secret for verifying tokens.
    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not configured');

        return res.status(500).json({
            message: 'Authentication configuration error'
        });
    }

    try {
        // Verify the token's signature and expiration.
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256']
        });

        // Attach the authenticated user's ID to the request.
        // Other middleware and controllers can access req.user.userId.
        req.user = {
            userId: decoded.userId
        };

        // Continue to the next middleware or route controller.
        next();

    } catch (error) {
        // Reject expired, modified, or otherwise invalid tokens.
        return res.status(401).json({
            message: 'Invalid or expired authentication token.'
        });
    }
};