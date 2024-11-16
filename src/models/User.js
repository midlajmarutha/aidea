import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    projects:[{
        domain:String,
        projectId:mongoose.Types.ObjectId,
        config:{
            theme:{
                baseColor:String,
            },
            welcomeMessage:String,
        }
    }]
})

const User = mongoose.models.User || mongoose.model("User",UserSchema)

export default User;