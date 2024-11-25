const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { corsMiddleware } = require("./middleware/corsMiddleware");
const connectDB = require("./config/db");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(corsMiddleware);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Connect to DB
connectDB();

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
