import { check,validationResult } from "express-validator";
export const validateSignupReq =
    [
        check("firstName")
        .notEmpty()
        .withMessage('First name is required'),
        check("lastName")
        .notEmpty()
        .withMessage("Last name is required"),
        check("email")
        .isEmail()
        .withMessage("Valid emial is required"),
        check("password")
        .isLength({min:6})
        .withMessage("Password must be at least 6 charecter long")
]

export const validateSigninReq = [
        check("email")
        .isEmail()
        .withMessage("Valid emial is required"),
        check("password")
        .isLength({min:6})
        .withMessage("Password must be at least 6 charecter long")
]

export const isAuthRequesteValidated = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({
            errors:errors.array()[0].msg
        })
    }
    next();
}