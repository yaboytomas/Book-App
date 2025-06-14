require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const booksRoute = require("./routes/booksRoute");
const authorsRoute = require("./routes/authorsRoute");
const userRoute = require("./routes/userRoute");
const authRoutes = require("./routes/authRoutes");
const rateLimit = require("express-rate-limit");

// Essential middleware for parsing JSON and handling CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Enable CORS for all routes

// Rate limiting middleware here to apply to all routes simply
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later."
});
app.use(limiter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});


// Birth route
app.get("/", (req, res) => {
  res.send("Backend Server is Running");
});

// Initializing the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} `);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("Connected to MongoDB Atlas!");
}).catch((err) => {
  console.log(err);
});


// Routes
app.use("/books", booksRoute);
app.use("/authors", authorsRoute);
app.use("/users", userRoute);
app.use("/auth", authRoutes);






