//引入mongoose
var mongoose = require("mongoose")
//连接数据库(class1912)
mongoose.connect("mongodb://localhost/project",{
    useNewUrlParser: true,
  useUnifiedTopology: true
})

// connect() 返回一个状态待定（pending）的连接， 接着我们加上成功提醒和失败警告。(官网代码)
var db = mongoose.connection;
db.on('error',(err)=>{
    console.log('数据库连接错误')
});
db.once('open', ()=>{
    console.log('数据库连接成功')
});