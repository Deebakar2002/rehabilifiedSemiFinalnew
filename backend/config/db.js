const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://social:Deebakar@contact.43hocpo.mongodb.net/PhysicoFriend?retryWrites=true&w=majority&appName=Contact";

exports.connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected!');
    } catch (err) {
        console.log('Error connecting to MongoDB:', err);
    }
};