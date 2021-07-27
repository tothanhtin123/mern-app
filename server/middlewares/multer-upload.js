import multer from 'multer';

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/tmp");
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null, + Date.now()  + file.originalname);
    }
})

export const multerUploadImage = multer({
    storage,
    //checkfile
    fileFilter:(req,file,cb)=>{
        if(!file.mimetype.startsWith("image/")){
            cb(new Error("File is not image"),false);
        }
        else{
            cb(null,true);
        }
        
    }
})