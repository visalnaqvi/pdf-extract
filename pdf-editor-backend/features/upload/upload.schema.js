import mongoose from "mongoose";

//User Schema
const uploadSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true,
    },
    files:{
        type:Array,
    }
})

const Upload = mongoose.model("Upload",uploadSchema)

export default Upload;