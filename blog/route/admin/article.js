// 将文章集合的构造函数导入
const { Article } = require('../../model/article')

module.exports = async (req, res) => {
  // 添加访问文章列表页面的标识
  req.app.locals.currentLink = 'article'

  // 接收客户端传递过来的当前页参数
  let page = req.query.page || 1
  // res.send(page)
  // 每一页显示的数据条数
  let pagesize = 5
  // 查询用户数据的总数
  let count = await Article.countDocuments({})
  // 总页数.向上取整 3.1=>4
  let total = Math.ceil(count / pagesize)
  // 页码对应的数据查询开始位置
  let start = (page - 1) * pagesize
  // // 将用户信息从数据库中查询出来
  // let users = await User.find({}).limit(pagesize).skip(start)

  // 查询所有文章数据
  let articles = await Article.find()
    .limit(pagesize)
    .skip(start)
    .populate('author')
  // 注意这里既需要父对象，又存在对象循环引用，用此方法进行深拷贝
  articles = JSON.parse(JSON.stringify(articles))
  // res.send(articles)
  // res.send(page)
  // res.send(total)

  // 渲染文章列表页面
  res.render('admin/article.art', {
    articles: articles,
    page: page,
    total: total,
  })
}
