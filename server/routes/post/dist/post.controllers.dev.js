"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.increaseLike = exports.updatePost = exports.createPost = exports.getPosts = void 0;

var _postModels = _interopRequireDefault(require("../../models/post.models.js"));

var _postMethods = require("./post.methods.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getPosts = function getPosts(req, res) {
  var posts;
  return regeneratorRuntime.async(function getPosts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_postModels["default"].find());

        case 3:
          posts = _context.sent;
          return _context.abrupt("return", res.status(200).json(posts));

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            error: _context.t0
          }));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getPosts = getPosts;

var createPost = function createPost(req, res) {
  var newPost, post, file, uploadInfo;
  return regeneratorRuntime.async(function createPost$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          //tạo post
          newPost = req.body;
          post = new _postModels["default"](newPost); //di chuyển file

          file = req.file; //gọi method upload file và nhận về các thông tin để lưu trong db
          //post._id để dùng đặt tên đường dẫn thư mục cho file

          _context2.next = 6;
          return regeneratorRuntime.awrap((0, _postMethods.uploadPostFile)(file, post._id));

        case 6:
          uploadInfo = _context2.sent;
          post.attachment = uploadInfo;
          console.log(post);
          _context2.next = 11;
          return regeneratorRuntime.awrap(post.save());

        case 11:
          return _context2.abrupt("return", res.status(200).json(post));

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            error: _context2.t0
          }));

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.createPost = createPost;

var updatePost = function updatePost(req, res) {
  var _updatePost, path, file, uploadInfo, post;

  return regeneratorRuntime.async(function updatePost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _updatePost = req.body;
          path = req.body.path; //xóa đi field likeCount - vì ta sẽ update like thông qua một api khác
          //nếu không người dùng có thể tự update nhiều like thông qua chỉnh sửa code giao diện

          delete _updatePost["likeCount"]; //xóa đi field path (nếu có)

          delete _updatePost["path"]; //nếu có path => phải xóa file cũ

          if (!path) {
            _context3.next = 12;
            break;
          }

          (0, _postMethods.removePostFile)(path); //sau đó thêm file mới

          file = req.file; //gọi method upload file và nhận về các thông tin để lưu trong db

          _context3.next = 10;
          return regeneratorRuntime.awrap((0, _postMethods.uploadPostFile)(file, _updatePost._id));

        case 10:
          uploadInfo = _context3.sent;
          //thêm dữ liệu
          _updatePost.attachment = uploadInfo;

        case 12:
          console.log(_updatePost); //tiến hành cập nhật
          //mặc định khi update thì post sẽ nhận được giá trị trước khi update
          //nếu ta ghi new:true thì sẽ nhận được giá trị sau khi update

          _context3.next = 15;
          return regeneratorRuntime.awrap(_postModels["default"].findOneAndUpdate({
            _id: _updatePost._id
          }, {
            updatePost: _updatePost
          }, {
            "new": true
          }));

        case 15:
          post = _context3.sent;
          return _context3.abrupt("return", res.status(200).json(post));

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).json({
            error: _context3.t0
          }));

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 19]]);
};

exports.updatePost = updatePost;

var increaseLike = function increaseLike(req, res) {
  var _id, postUpdated;

  return regeneratorRuntime.async(function increaseLike$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _id = req.body._id; //update post bằng việc tăng lượt like {$inc: {likeCount: 1} }
          //sau khi update thì trả về luôn một đối tượng mới

          _context4.next = 4;
          return regeneratorRuntime.awrap(_postModels["default"].findOneAndUpdate({
            _id: _id
          }, {
            $inc: {
              likeCount: 1
            }
          }, {
            "new": true
          }));

        case 4:
          postUpdated = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            postUpdated: postUpdated
          }));

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            error: _context4.t0
          }));

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.increaseLike = increaseLike;