// src/utils/db.js
const mongoose = require('mongoose');

async function connectDB(uri) {
  try {
    mongoose.set('strictQuery', false); // optional, avoids a deprecation warning
    // NOTE: do NOT pass legacy options like useNewUrlParser or useUnifiedTopology
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect DB', err);
    throw err;
  }
}

module.exports = connectDB;
