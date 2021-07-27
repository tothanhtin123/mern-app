import postModels from "../../models/post.models.js";
import { uploadPostFile, removePostFile } from "./post.methods.js";
export const getPosts = async (req, res) => {
  try {
    const posts = await postModels.find();
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const createPost = async (req, res) => {
  try {
    //tạo post
    const newPost = req.body;
    const post = new postModels(newPost);
    //di chuyển file
    const file = req.file;

    //gọi method upload file và nhận về các thông tin để lưu trong db
    //post._id để dùng đặt tên đường dẫn thư mục cho file
    const uploadInfo = await uploadPostFile(file, post._id);

    post.attachment = uploadInfo;
    console.log(post);

    await post.save();

    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatePost = req.body;
    const path = req.body.path;
    //xóa đi field likeCount - vì ta sẽ update like thông qua một api khác
    //nếu không người dùng có thể tự update nhiều like thông qua chỉnh sửa code giao diện
    delete updatePost["likeCount"];
    //xóa đi field path (nếu có)
    delete updatePost["path"];
    
    //nếu có path => phải xóa file cũ
    if (path) {
      removePostFile(path);
      //sau đó thêm file mới
      const file = req.file;
      //gọi method upload file và nhận về các thông tin để lưu trong db
      const uploadInfo = await uploadPostFile(file, updatePost._id);
      //thêm dữ liệu
      updatePost.attachment = uploadInfo;
    }
   
    //tiến hành cập nhật
    //mặc định khi update thì post sẽ nhận được giá trị trước khi update
    //nếu ta ghi new:true thì sẽ nhận được giá trị sau khi update
    const post = await postModels.findOneAndUpdate({_id:updatePost._id},updatePost,{new:true});
    console.log(updatePost);
    console.log(post);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const increaseLike = async (req, res) => {
  try {
    const _id = req.body._id;
    //update post bằng việc tăng lượt like {$inc: {likeCount: 1} }
    //sau khi update thì trả về luôn một đối tượng mới
    const postUpdated = await postModels.findOneAndUpdate(
      { _id },
      { $inc: { likeCount: 1 } },
      { new: true }
    );
    return res.status(200).json({ postUpdated });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};


export const deletePost = async (req,res) => {
  try{
    const _id = req.body._id;
    //lấy thông tin file ra để xóa
    const post = await postModels.findOne({_id});
    //path để xóa file
    const path = post.attachment.path;
    removePostFile(path);
    //xóa post
    //ta sẽ nhận được toàn bộ dữ liệu đã xóa
    const result = await postModels.findOneAndDelete({_id});
    console.log(result);
    return res.status(200).json({message:"Delete is successfully"});
  }
  catch(err){
    return res.status(500).json({ error: err });
  }
}