import bcrypt from "bcrypt"
import User from "../models/user.js"

export const signupController= (req,res,next)=>{
    User.findOne({email:req.body.email})
    .exec((err,user)=>{
        if(user){
            return res.status(400).json({
                message:"User already registered"
            })
        }

        const {
            firstName,
            lastName,
            email,
            password,
        }=req.body

        const hash_password = bcrypt.hashSync(password,10);
        const _user = new User(
            {
                firstName,
                lastName,
                email,
                hash_password,
                username:new Date().getTime().toString()
            }
        )
        _user.save((error,data)=>{
            if(error){
                console.log(error)
                return res.status(400).json({
                    message:"Something went wrong"
                })
            }

            if(data){
                return res.status(201).json({
                    message:"Users created successfully"
                })
            }
        })

    })
}