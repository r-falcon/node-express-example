// 1.引入mongoose模块
const mongoose = require('mongoose')

// 2.创建文章集合规则
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 4,
    maxlength: 20,
    // required: true,
    required: [true, '请填写文章标题'],
  },
  // 作者，用到了集合关联
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    author: [true, '请填写文章作者'],
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  cover: {
    type: String,
    default: null,
  },
  content: {
    type: String,
  },
})

// 3.创建文章集合
const Article = mongoose.model('Article', articleSchema)

// 4.将文章集合做为模块成员进行导出
module.exports = {
  Article,
}
