"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTypeOfFile = exports.saltFileName = exports.removeFileFromStorage = exports.moveFileToStorage = exports.moveSingleFile = exports.removeTmpFile = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _firebase = _interopRequireDefault(require("../services/firebase.js"));

var _uuidV = _interopRequireDefault(require("uuid-v4"));

var _saltedMd = _interopRequireDefault(require("salted-md5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//xóa file tạm
var removeTmpFile = function removeTmpFile(path) {
  try {
    //kiểm tra tồn tại trước khi xóa
    _fsExtra["default"].exists(path, function (exist) {
      if (exist) {
        _fsExtra["default"].removeSync(path);
      }
    });
  } catch (err) {
    console.log(err);
  }
}; //di chuyển 1 file (local)


exports.removeTmpFile = removeTmpFile;

var moveSingleFile = function moveSingleFile(src, path) {
  try {
    _fsExtra["default"].moveSync(src, path);
  } catch (err) {
    throw new Error("Error happened when moving file");
  } //xóa file tạm


  removeTmpFile(src);
}; //di chuyển 1 file lên nơi lưu trữ (firebase storage)


exports.moveSingleFile = moveSingleFile;

var moveFileToStorage = function moveFileToStorage(src, path) {
  var uuid, result, bucketName, fileName, url;
  return regeneratorRuntime.async(function moveFileToStorage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          uuid = (0, _uuidV["default"])(); //tạo một token dành cho việc up file lên firebase storage

          _context.next = 4;
          return regeneratorRuntime.awrap(_firebase["default"].storage().bucket().upload( //đường dẫn file ban đầu
          src, {
            destination: path,
            metadata: {
              //thêm dữ liệu này để tạo một access token cho phép xem file
              metadata: {
                firebaseStorageDownloadTokens: uuid
              }
            }
          }));

        case 4:
          result = _context.sent;
          //lấy ra tên bucket name từ kết quả upload
          bucketName = result[0].metadata.bucket; //lấy ra tên file name từ kết quả upload

          fileName = result[0].name; //lấy ra đường dẫn để hiển thị file

          url = "https://firebasestorage.googleapis.com/v0/b/" + bucketName + "/o/" + encodeURIComponent(fileName) + "?alt=media&token=" + uuid; //xóa file tạm

          removeTmpFile(src); //trả về đường dẫn để hiển thị

          return _context.abrupt("return", url);

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
}; //xóa 1 file trên nơi lưu trữ (storage firebase)


exports.moveFileToStorage = moveFileToStorage;

var removeFileFromStorage = function removeFileFromStorage(path) {
  var result;
  return regeneratorRuntime.async(function removeFileFromStorage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_firebase["default"].storage().bucket().file(path)["delete"]());

        case 3:
          result = _context2.sent;
          return _context2.abrupt("return", result);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; //thực hiện mã hóa tên file


exports.removeFileFromStorage = removeFileFromStorage;

var saltFileName = function saltFileName(fileName) {
  return (0, _saltedMd["default"])(fileName, "SUPER-S@LT!") + "_" + fileName;
}; //lấy kiểu file (thông qua mimtype)
//ex:  image/jpeg => image


exports.saltFileName = saltFileName;

var getTypeOfFile = function getTypeOfFile(mimetype) {
  var splitVal = mimetype.split("/");
  return splitVal[0];
};

exports.getTypeOfFile = getTypeOfFile;