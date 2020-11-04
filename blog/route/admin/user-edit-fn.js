// 引入用户集合的构造函数
const { User, validateUser } = require('../../model/user')
// 引入加密模块
const bcrypt = require('bcrypt')

module.exports = async (req, res, next) => {
  // 新增用户点击确认后收到的参数
  // res.send(req.body)

  //实施验证
  try {
    await validateUser(req.body)
  } catch (err) {
    // console.log(err)
    // return res.redirect(`/admin/user-edit?message=${err.message}`)
    return next(
      JSON.stringify({ path: '/admin/user-edit', message: err.message })
    )
  }

  // 根据邮箱地址查询用户是否存在
  let user = await User.findOne({ email: req.body.email })
  // res.send(user)
  // 如果用户已经存在，邮箱里地址已经被别人占用
  if (user) {
    // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`)
    return next(
      JSON.stringify({
        path: '/admin/user-edit',
        message: '邮箱地址已经被占用',
      })
    )
  }

  // 生成随机字符串
  const salt = await bcrypt.genSalt(10)
  // 对密码进行加密
  const password = await bcrypt.hash(req.body.password, salt)
  req.body.password = password
  // 将用户信息添加到数据库
  await User.create(req.body)
  // 将页面重定向到用户列表页面
  res.redirect('/admin/user')
}
