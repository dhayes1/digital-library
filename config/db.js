const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,           
        })
        
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB




// const dotenv = require("dotenv");
// dotenv.config();
// const MongoClient = require('mongodb').MongoClient;

// let _db;

// const initDb = (callback) => {
//     if (_db) {
//         console.log('Db is already initiallized!');
//         return callback(null, _db);
//     }
//     MongoClient.connect(process.env.MONGODB_URI)
//         .then((client) => {
//             _db = client;
//             callback(null, _db);
//         })
//         .catch((err) => {
//             callback(err);
//         });
// };

// const getDb = () => {
//     if (!_db) {
//         throw Error('Db not initialized');
//     }
//     return _db;
// };

// module.exports = { initDb, getDb };