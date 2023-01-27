import bcrypt from "bcrypt"
import User from "../../models/user.js"
import jwt from "jsonwebtoken"

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
                role:"admin",
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


export const signinController = (req,res,next)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(error) return res.status(400).json({error})
        if(user){
            const isValidPassword=bcrypt.compareSync(req.body.password,user.hash_password);
            if(isValidPassword && user.role === "admin"){
                const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})

                const {_id,firstName,lastName,email,role}=user;
                res.status(200).json({
                    token,
                    user:{
                        _id,firstName,lastName,email,role 
                    }
                })

            }else{
                return res.status(400).json({
                    message:"Wrong Password or User is not permitted to access this route"
                })
            }
        }else{
            return res.status(400).json({
                message:"Something went wrong!"
            })
        }
    })
}