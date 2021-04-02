const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false
    })
    console.log(`MONGODB CONNECT ON: ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;