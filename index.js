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



// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

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






