import mongoose from 'mongoose';

const schema = mongoose.Schema;

const postSchema = schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
        default:"Anonymous"
    },
    attachment: {
        //kiểu file: hình ảnh, video, tệp tin khác,...
        fileType: String,
        //đường dẫn để hiển thị
        fileUrl: String,
        //đường dẫn để tương tác
        path: String,
        //tên file ban đầu
        originialName: String,
        
    },
    likeCount:{
        type:Number,
        default:0,
    }

},{timestamps:true,});


export default mongoose.model("post",postSchema);