// blog的展示页面
// 引入express框架
const express = require('express')
// 创建播客展示页面路由
const home = express.Router()

// 播客前台首页的展示
home.get('/', require('./home/index'))

// 播客前台文章详情展示页
home.get('/article', require('./home/article'))

// 创建评论功能路由
home.post('/comment', require('./home/comment'))

// 将路由对象做为模块成员进行导出
module.exports = home
