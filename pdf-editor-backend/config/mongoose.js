import mongoose from 'mongoose'
// import dotenv from 'dotenv';
// dotenv.config();
//url to connect to mongo db 
const url = "mongodb+srv://visal:visal@mydatabase.3zuii7q.mongodb.net/?retryWrites=true&w=majority"

//initializing connection
mongoose.connect(url)

const connection = mongoose.connection;


//checking connection for any error
connection.on("error",function(){
    console.log("error")
})

//checking if connection is open or not
connection.once("open",function(){
    console.log("connected")
})

export default connection;