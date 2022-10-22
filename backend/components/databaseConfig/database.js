const mongoose = require("mongoose");

const dotenv = require("dotenv");
const path = require('path')

dotenv.config({ path: './components/config/config.env' })


const connectDatabase = () => {
    mongoose.connect(`${process.env.DB_LOCAL_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        connectTimeoutMS: 5000
    }).then(() => console.log("connect to database")).catch(err => console.error(err))
};

module.exports = connectDatabase;