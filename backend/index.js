const connectDB = require("./src/config/dbConnection");
const colors = require("colors");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const profileRoutes = require("./src/routes/profileRoutes");

const PORT = process.env.PORT || 8000;

const app = express();

const allowedOrigins = ["http://localhost:3000"];

// CORS to allow requests
app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  })
);

// Parse application/json requests
// app.use(bodyParser.json({ limit: "50mb" }));

// Parse application/x-www-form-urlencoded requests
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//middleware
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/auth/profile", profileRoutes);
// app.post("/auth/token/validate", middleware, (req, res) => {
//   // If the middleware passes, the token is valid
//   res.status(200).json({ valid: true });
// });

//database connection using mongoose
connectDB()
  .then(() => {
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${PORT}`.bgCyan.white);
    });
  })
  .catch((err) => {
    console.log(err);
  });
