import jwt from "jsonwebtoken"

export const isAuthenticated = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        res.status(401).json({
            message:"Authentication tokn not available"
        })
    }
    
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                res.status(401).json({
                    message:"Not a valid Auth token"
                })
            }else{
                req.user=user
                next()
            }
        })

}