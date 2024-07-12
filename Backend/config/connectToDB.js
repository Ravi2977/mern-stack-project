
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}else{
    require("dotenv").config(); 
}
const mongoose = require("mongoose")

async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("COnnected to database")
    } catch (err) {
        console.log("Some eroor occurs", err)
    }
}
module.exports = connectToDb;