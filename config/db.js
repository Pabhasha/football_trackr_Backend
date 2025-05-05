require('dotenv').config();
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

// Initialize GridFS bucket variable
let gfs;

const connectDB = async () => {
  try {
    // Connection options for MongoDB
    const connOptions = {
      dbName: 'adminDB',       // Explicit database name
      maxPoolSize: 10,           // Maximum connection pool size
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000      // Socket timeout
    };

    // Establish connection
    const conn = await mongoose.connect(process.env.MONGO_URI, connOptions);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📁 Using Database: ${conn.connection.db.databaseName}`);

    // Initialize GridFS
    const db = mongoose.connection.db;
    gfs = new GridFSBucket(db, {
      bucketName: 'studentFiles', // Custom bucket name
      chunkSizeBytes: 1024 * 1024 * 4 // 4MB chunk size
    });

    // Connection event handlers
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });

    // Close connection on app termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Mongoose connection closed due to app termination');
      process.exit(0);
    });

    return gfs;
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

// Function to get GridFS bucket instance
const getGfs = () => {
  if (!gfs) {
    throw new Error('GridFS not initialized. Call connectDB first.');
  }
  return gfs;
};

module.exports = {
  connectDB,
  getGfs,
  mongoose // Export mongoose for transactions or other operations
};