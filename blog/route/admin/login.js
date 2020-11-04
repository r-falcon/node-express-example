// 导入用户集合构造函数,解构对象
const { User } = require('../../model/user')
// 引入加密模块bcrypt，进行密码的比对
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
  // 接受请求参数
  const { email, password } = req.body
  // 如果用户没有输入用户名和密码
  if (email.trim().length == 0 || password.trim().length == 0) {
    return res
      .status(400)
      .render('admin/error', { msg: '邮件地址或者密码错误' })
  }

  // 根据邮箱地址查询用户信息
  // 如果查询到了用户，user变量为对象类型；没查询到，user变量为空
  let user = await User.findOne({ email })

  if (user) {
    // 查询到用户
    // if (password == user.password) { 因为密码进行了加密，所以不能和数据库中的密码直接进行比对，需加密以后再进行比对 }
    // 密码比对，成功返回true；失败返回false
    let isValid = await bcrypt.compare(password, user.password)
    if (isValid) {
      // 登录成功
      // 将用户名存储在请求对象中,会自动为当前用户生成一个唯一的sessionId，并且把id存储到客户端的cookie中
      req.session.username = user.username
      // 将用户角色存储在session对象中
      req.session.role = user.role
      // res.send('登录成功')
      // 使用locals将公共的部分暴露给大家使用
      req.app.locals.userInfo = user
      // 对用户的角色进行判断
      if (user.role == 'admin') {
        // 重定向到用户列表页
        res.redirect('/admin/user')
      } else {
        // is重定向到播客首页
        res.redirect('/home/')
      }
      // 路由重定向到用户列表页面
      res.redirect('/admin/user')
    } else {
      res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
    }
  } else {
    // 没有查询到
    res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
  }
}
