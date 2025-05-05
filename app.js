require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const {connectDB} = require('./config/db');
const app = express();
app.use(cors({
origin: 'http://localhost:5173',
credentials: true, 
allowedHeaders: ['Content-Type', 'Authorization'], 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Database connection
connectDB();
//routes
const adminRoutes = require('./Routes/AdminRoutes');    
app.use('/api/admin', adminRoutes); 