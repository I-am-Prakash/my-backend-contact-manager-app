const mongoose = require("mongoose");


const dbConnect = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log(`DB Connected Successfully DB: ${connect.connection.name} & Host: ${connect.connection.host}`);
        // const {host,name} = connect;
        // console.log(host, name);
    } catch (error) {
        console.log(`Error while connecting to DB: ${error}`);
    }
}

module.exports = dbConnect;