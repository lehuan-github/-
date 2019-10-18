var express = require('express');
var router = express.Router();
var userModel = require("../db/userModel")
/* GET users listing. */
router.get('/', function(req, res, next) {

  userModel.find().then((docs)=>{
    console.log("查询成功",docs)
    res.send({err:0,msg:"success",data:docs})
  }).catch((err)=>{
    console.log("查询失败",err)
    res.send({err:-1,msg:"fail"})
  })
  //res.send('hello word');
});


//注册接口
router.post("/regist",(req,res,next)=>{
  //接收post数据
  let {username,password,password2}=req.body
  //数据校验工作,在这里完成
  //查询是否存在此用户
  userModel.find({username}).then((docs)=>{
    if(docs.length>0){
    res.send("用户名已存在")
    }else{
      //开始注册
      let createTime = Date.now()
      //操作数据库
      userModel.insertMany({username,password, createTime}).then((data)=>{
        // res.send("注册成功") 
        res.redirect("/login")
      }).catch((err)=>{
        // res.send("注册失败")
        res.redirect("/regist")
      })
    }
  })
})


//登入接口
router.post("/login",(req,res,next)=>{
  let {username,password}=req.body
  console.log(username,password)
  //操作数据库
  userModel.find({username,password}).then((docs)=>{
    if(docs.length>0){
      // res.send("登入成功") 
      //登入成功后,在服务端使用session记录用户信息
      req.session.username = username
      req.session.isLogin = true
      res.redirect("/")
    }else{
      // res.send("用户不存在")
      res.redirect("/login")

    }
  }).catch((err)=>{
    // res.send("登入失败")
    res.redirect("/login")
  })
  // res.json({username,password,password2})
})

//退出登入
router.get("/logout",(req,res,next)=>{
  // 方法一
  req.session.username = null
  req.session.isLogin = false
  // 方法二
  //req.session.destroy
  res.redirect("/login")
})

module.exports = router;
