const mongoose = require('mongoose')

const Connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Database Connection successful");
        console.log("Connected DB:", mongoose.connection.name); // 👈 ADD THIS

    } catch (error) {
        console.log("Error while connecting Database", error);
    }
}

module.exports = Connection;