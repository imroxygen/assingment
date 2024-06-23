const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);

// MongoDB connection
mongoose.connect('mongodb+srv://testing:AmitSarkar_2000@cluster0.awlo7q9.mongodb.net/')
    .then(() => console.log("Database connected"))
    .catch((error) => console.log('Failed to connect to MongoDB: ', error));

// Global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
