//hàm sử dụng service để upload file lên storage và xử lý các thông tin về file
import { moveFileToStorage, saltFileName, getTypeOfFile, removeFileFromStorage } from "../../utils/file.js";
export const uploadPostFile = async (file, _id) => {
  try {
    //mã hóa tên file (mã hóa lần nữa để giảm thiểu tối đa tỉ lệ trùng tên)
    const fileName = saltFileName(file.filename);
    //đường dẫn file tạm thời
    const src = file.path;
    //path để up lên storage
    const path = "posts/" + _id.toString() + "/" + fileName;
    //đường dẫn để hiển thị
    const fileUrl = await moveFileToStorage(src, path);
    //kiểu file - được xác định thông qua mimetype
    const fileType = getTypeOfFile(file.mimetype);
    //tên file ban đầu
    const originalname = file.originalname;
    //trả về các thông tin trên
    return {
        fileUrl,
        fileType,
        path,
        originalname,
    }

  } catch (err) {
    throw err;
  }
};

export const removePostFile = (path) => {
  try{
    //hàm này là async - nhưng ta không cần chờ nó
    removeFileFromStorage(path);
  }
  catch(err){
    throw err;
  }
}