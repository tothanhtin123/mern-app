import {check} from "express-validator";


export const postFormValidator = [
    check("title")
    .exists().withMessage("Please enter the Title")
    .notEmpty().withMessage("Please enter the Title"),
    
    check("description")
    .exists().withMessage("Please enter the Description")
    .notEmpty().withMessage("Please enter the Description"),
    
    
];