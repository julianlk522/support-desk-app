const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        // const conn = await mongoose.connect('mongodb+srv://julianlk:ilovecoding@cluster0.xeqer.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

module.exports = connectDB