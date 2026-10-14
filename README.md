### Environment Configuration

The Express backend uses environment variables to configure its MongoDB connection and JWT authentication.

1. Copy `server/.env.example` to `server/.env`.
2. Set `MONGODB_URI` to the MongoDB connection string.
3. Replace `JWT_SECRET` with a secure, randomly generated secret.
4. Ensure MongoDB is running before starting the application.
5. Run `npm install` in the root, `client`, and `server` directories to install dependencies.
6. From the project root, run `npm run dev` to start the React frontend and Express backend.

The `.env` file is excluded from Git to protect sensitive configuration values.