module.exports = (req, res) => {
  // 添加访问文章列表页面的标识
  req.app.locals.currentLink = 'article'

  res.render('admin/article-edit.art')
}
