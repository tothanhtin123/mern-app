"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkExistPost = exports.SingleImageUploadChecking = void 0;

var _multerUpload = require("../../middlewares/multer-upload.js");

var _postModels = _interopRequireDefault(require("../../models/post.models.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//kiểm tra hình ảnh của post trước khi up lên
var SingleImageUploadChecking = function SingleImageUploadChecking(req, res, next) {
  var uploadResult = _multerUpload.multerUploadImage.single("image");

  uploadResult(req, res, function (err) {
    if (err) {
      console.log(err);
    } // console.log(req.file);


    next();
  });
}; //kiểm tra sự tồn tại của dữ liệu post - thông qua id được gửi lên


exports.SingleImageUploadChecking = SingleImageUploadChecking;

var checkExistPost = function checkExistPost(req, res, next) {
  var _id, post;

  return regeneratorRuntime.async(function checkExistPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _id = req.body._id;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_postModels["default"].findOne({
            _id: _id
          }));

        case 4:
          post = _context.sent;

          if (post) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Data id is not exist"
          }));

        case 7:
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", res.status(400).json({
            message: "Data id is not valid"
          }));

        case 12:
          return _context.abrupt("return", next());

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.checkExistPost = checkExistPost;