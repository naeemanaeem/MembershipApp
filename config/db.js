const mongoose = require('mongoose');

const connectDB = async function (ENV) {
    try {
        let MONGO_URI = process.env.MONGO_URI; 
        if(ENV === 'DEV') {
            MONGO_URI = process.env.MONGO_URI_DEV;
        } 
            
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`MongoDB connected: ${conn.connection.host} - ${conn.connection.db.databaseName}`);

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;