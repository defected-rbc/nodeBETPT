const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./route/User');
const app = express();
const PORT = 3000;
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const mongoConnection = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/TPT', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error in connecting", error);
  }
}

mongoConnection();

// Mount routes
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});