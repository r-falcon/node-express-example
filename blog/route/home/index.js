// 引入文章数据模块
const { Article } = require('../../model/article')
// 导入分页模块
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  // 接收客户端传递过来的页码值
  const page = req.query.page

  let result = await pagination(Article)
    .page(page)
    .size(4)
    .display(5)
    .find()
    .populate('author')
    .exec()
  result = JSON.parse(JSON.stringify(result))
  // res.send(result)
  // 渲染模板并传递数据
  res.render('home/default.art', {
    result: result,
  })
}
