// 引入文章信息
const { Article } = require('../../model/article')

module.exports = async (req, res) => {
  // 获取到要删除文章的id
  // res.send(req.query.id)
  // 根据id删除文章
  await Article.findOneAndDelete({ _id: req.query.id })
  // 将页面重定向到用户列表页面
  res.redirect('/admin/article')
}
