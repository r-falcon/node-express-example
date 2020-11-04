// blog的管理页面
// 引入express框架
const express = require('express')

// 创建播客展示页面路由
const admin = express.Router()

// 渲染登录页面
admin.get('/login', require('./admin/loginPage'))

// 实现登录功能
admin.post('/login', require('./admin/login'))

// 渲染用户页面
admin.get('/user', require('./admin/userPage'))

// 实现退出功能(删除session、删除cookie、重定向到用户登录页面)
admin.get('/logout', require('./admin/logout'))

// 创建用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit'))

// 创建实现用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'))

// 创建用户信息修改功能路由
admin.post('/user-modify', require('./admin/user-modify'))

// 删除用户功能路由
admin.get('/delete', require('./admin/user-delete'))

// 文件列表页面路由
admin.get('/article', require('./admin/article'))

// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'))

// 实现文章添加功能的路由
admin.post('/article-add', require('./admin/article-add'))

// 删除文章信息
admin.get('/article-delete', require('./admin/article-delete'))

// 将路由对象做为模块成员进行导出
module.exports = admin
