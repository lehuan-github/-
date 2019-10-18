// 引入mongoose
var mongoose = require("mongoose")
// 创建mongoose.Schema(官网代码)
//作用:查找数据库字段
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    createTime: Number
  });



  
// 创建model(官网代码)
//作用:转化成数据模型
var userModel = mongoose.model("users",userSchema)
//抛出 userModel 让其他文件接收
module.exports = userModel