"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removePostFile = exports.uploadPostFile = void 0;

var _file = require("../../utils/file.js");

//hàm sử dụng service để upload file lên storage và xử lý các thông tin về file
var uploadPostFile = function uploadPostFile(file, _id) {
  var fileName, src, path, fileUrl, fileType, originalname;
  return regeneratorRuntime.async(function uploadPostFile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          //mã hóa tên file (mã hóa lần nữa để giảm thiểu tối đa tỉ lệ trùng tên)
          fileName = (0, _file.saltFileName)(file.filename); //đường dẫn file tạm thời

          src = file.path; //path để up lên storage

          path = "posts/" + _id.toString() + "/" + fileName; //đường dẫn để hiển thị

          _context.next = 6;
          return regeneratorRuntime.awrap((0, _file.moveFileToStorage)(src, path));

        case 6:
          fileUrl = _context.sent;
          //kiểu file - được xác định thông qua mimetype
          fileType = (0, _file.getTypeOfFile)(file.mimetype); //tên file ban đầu

          originalname = file.originalname; //trả về các thông tin trên

          return _context.abrupt("return", {
            fileUrl: fileUrl,
            fileType: fileType,
            path: path,
            originalname: originalname
          });

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          throw _context.t0;

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.uploadPostFile = uploadPostFile;

var removePostFile = function removePostFile(path) {
  try {
    //hàm này là async - nhưng ta không cần chờ nó
    (0, _file.removeFileFromStorage)(path);
  } catch (err) {
    throw err;
  }
};

exports.removePostFile = removePostFile;