const { User } = require('../../model/user')

module.exports = async (req, res) => {
  // 添加访问用户列表页面的标识
  req.app.locals.currentLink = 'user'

  // 获取到地址栏中的id参数
  const { message, id } = req.query
  // 如果id为真，证明为修改操作，否则为添加操作
  if (id) {
    let user = await User.findOne({ _id: id })
    // 渲染用户编辑页面（修改）
    res.render('admin/user-edit', {
      message: message,
      user: user,
      link: '/admin/user-modify?id=' + id,
      button: '修改',
    })
  } else {
    res.render('admin/user-edit', {
      message: message,
      link: '/admin/user-edit',
      button: '添加',
    })
  }
}
