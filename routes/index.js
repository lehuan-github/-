var express = require('express');
var router = express.Router();
var articleModel = require("../db/articleModel")
var moment = require("moment")

/* 首页路由 */
router.get('/', function (req, res, next) {
  //数据类型是int
  let page = parseInt(req.query.page || 1)
  let size = parseInt(req.query.size || 2)
  let username = req.session.username
  console.log(page, size)
  //第一步:查询文章总数
  articleModel.find().count().then((total) => {
    var pages = Math.ceil(total / size)

    //第二步:查询分页
    articleModel.find().sort({
      "createTime": -1
    }).limit(size).skip((page - 1) * size).then((docs) => {
      console.log()
      //对数据中的事件进行处理
      var arr = docs.slice()
      for (let i = 0; i < arr.length; i++) {
        arr[i].createTimeZH = moment(arr[i].creatTime).format("YYYY-MM-DD HH:mm:ss")
      }
      res.render('index', {data: { list: arr,  total: pages ,username}});
    }).catch((err) => {
      res.redirect("/")
    })
  }).catch((err) => {
    res.redirect("/")
  })
});

/*注册页路由*/
router.get('/regist', function (req, res, next) {
  res.render('regist', {});
});

/*登入页路由*/
router.get('/login', function (req, res, next) {
  res.render('login', {});
});

/*写文章页路由*/
router.get('/write', function (req, res, next) {
  var id = req.query.id

  let username = req.session.username

  if(id){
    //编辑
    id = new Object(id)
    articleModel.findById(id).then((doc)=>{
      // res.send({data:docs})
      // doc.createTimeZH = moment(doc.createTime).format("YYY-MM-DD HH:mm:ss")
      res.render("write",{doc:doc})
    }).catch(err=>{
      // res.send(err)
      res.redirect("/")
    })
  }else{
    //新增
     var doc ={
       _id:"",
       username: req.session.username,
       title:'',
       content: ''
     }
    res.render("write",{doc:doc})
  }
});

/*详情页路由*/
router.get("/detail", function (req, res, next) {
  //方法一用时间戳查询:查询当前文章详情
  //var time =parseInt(req.query.time)
  // articleModel.find({"createTime":time}).then((doc)=>{
  //   res.send(doc)
  // }).catch((err)=>{
  //   console.log("文章详情查询失败")
  //   res.send("失败")
  // })
  // 方法二用_id查询
  var id = new Object(req.query.id)
  articleModel.findById(id).then((doc)=>{
    // res.send({data:docs})
    doc.createTimeZH = moment(doc.createTime).format("YYY-MM-DD HH:mm:ss")
    res.render("detail",{doc:doc})
  }).catch(err=>{
    res.send(err)
  })
});




module.exports = router;