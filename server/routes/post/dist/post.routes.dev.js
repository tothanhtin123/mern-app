"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _postControllers = require("./post.controllers.js");

var _postMiddlewares = require("./post.middlewares.js");

var _form = require("../../middlewares/form.js");

var _postValidators = require("./post.validators.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var route = _express["default"].Router(); //origin: /posts
//lấy toàn bộ posts


route.get("/", _postControllers.getPosts); //thêm post

route.post("/", _postMiddlewares.SingleImageUploadChecking, _postValidators.postFormValidator, _form.formValid, _postControllers.createPost); //update post

route.post("/update", _postMiddlewares.SingleImageUploadChecking, _postValidators.postFormValidator, _form.formValid, _postControllers.updatePost); //increase like

route.post("/increase-like", _postMiddlewares.checkExistPost, _postControllers.increaseLike);
var _default = route;
exports["default"] = _default;