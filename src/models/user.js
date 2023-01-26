import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type:String,
        required: true,
        trim: true,
        min: 2,
        max: 20
    },
    username: {
        type:String,
        required: true,
        trim: true,
        lowercase:true,
        index:true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["user","admin"],
        default: "user"
    },
    contactNumber: {
        type: String
    },
    profilePicture: {
        type: String
    },
},{
    timestamps:true
})


const userModel = mongoose.model('User',userSchema);

export default userModel;