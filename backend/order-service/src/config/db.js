const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(' MongoDB connected for Order Service');
    } catch (err) {
        console.error(' MongoDB Connection Error (Order Service):', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
