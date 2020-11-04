// 导入用户信息模块
const { User } = require('../../model/user')
// 引入密码加密模块，进行密码比对
const bcrypt = require('bcrypt')

module.exports = async (req, res, next) => {
  // 接收客户端传递过来的请求参数,不包括id属性，id属性通过get方法获取
  const { username, email, role, state, password } = req.body
  // 需要修改的用户id
  const id = req.query.id
  // 通过id查询需要修改的用户信息集合
  let user = await User.findOne({ _id: id })
  // 密码比对
  const isValid = await bcrypt.compare(password, user.password)
  // isValid为true，比对成功；否则，比对失败
  if (isValid) {
    // 将用户信息更新到数据库中
    await User.updateOne(
      { _id: id },
      {
        username: username,
        email: email,
        role: role,
        state: state,
      }
    )
    // 将页面重定向到用户列表页
    res.redirect('/admin/user')
  } else {
    let obj = {
      path: '/admin/user-edit',
      id: id,
      message: '密码比对失败,不能进行用户信息的修改',
    }
    next(JSON.stringify(obj))
  }
}
