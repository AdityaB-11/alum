const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.connect('mongodb://localhost:27017/mydb');
    
    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    
    db.once('open', function() {
      console.log('Connected to MongoDB');
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {connectDB}
