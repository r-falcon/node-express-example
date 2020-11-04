// 导入用户集合构造函数
const { User } = require('../../model/user')

module.exports = async (req, res) => {
  // 添加访问用户列表页面的标识
  req.app.locals.currentLink = 'user'

  // 接收客户端传递过来的当前页参数
  let page = req.query.page || 1
  // res.send(page)
  // 每一页显示的数据条数
  let pagesize = 5
  // 查询用户数据的总数
  let count = await User.countDocuments({})
  // 总页数.向上取整 3.1=>4
  let total = Math.ceil(count / pagesize)
  // 页码对应的数据查询开始位置
  let start = (page - 1) * pagesize
  // 将用户信息从数据库中查询出来
  let users = await User.find({}).limit(pagesize).skip(start)

  // 渲染用户列表模块
  res.render('admin/user', {
    users: users,
    page: page,
    total: total,
  })
}
