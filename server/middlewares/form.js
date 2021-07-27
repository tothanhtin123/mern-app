import {validationResult} from 'express-validator';

export const formValid = (req,res,next) => {
    const validResult = validationResult(req);
    //nếu có lỗi
    if(validResult.errors.length){
        const errorMessage = validResult.errors[0].msg;
        console.log(errorMessage)
        return res.status(400).json({
            message:errorMessage,
        })
    }
    next();
}