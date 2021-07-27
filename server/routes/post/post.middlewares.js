import { multerUploadImage } from "../../middlewares/multer-upload.js";
import postModels from "../../models/post.models.js";
//kiểm tra hình ảnh của post trước khi up lên
export const SingleImageUploadChecking = (req,res,next) => {
    const uploadResult = multerUploadImage.single("image");
    uploadResult(req,res,(err)=>{
        if(err){
            console.log(err);
        }
        console.log(req.file);
        next();
    }) 
}

//kiểm tra sự tồn tại của dữ liệu post - thông qua id được gửi lên
export const checkExistPost = async (req,res,next) => {
    console.log(req.query)
    console.log(req.body);
    const _id = req.body._id;
    try{
        const post = await postModels.findOne({_id});
        if(!post){
            return res.status(400).json({
                message:"Data id is not exist",
            })
        }
    }
    //thường là do id không hợp lệ
    catch(err){
        return res.status(400).json({
            message:"Data id is not valid",
        })
    }

    return next();
}
