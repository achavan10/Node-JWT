require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth");
const dashboardRouter = require("./routes/dashboard");

const app = express();
app.use(express.json());

// auth router
app.use('/api/auth', authRouter);
// dashboard router with JWT authentication
app.use('/api', dashboardRouter);

const startServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on Port ${process.env.PORT}`);
  });
};

startServer();
