const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            "mongodb://localhost:27017/todolist", 
        )
    } catch (err) {
        console.error(`Error: ${err}`)
    }

}

module.exports = connectDB;