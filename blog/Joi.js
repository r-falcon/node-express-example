// 引入joi模块
const Joi = require('joi')

// 定义对象的验证规则
async function fun() {
  const schema = Joi.object({
    username: Joi.string()
      .min(2)
      .max(12)
      .required()
      .error(new Error('输入的用户名不正确')),
  })
  try {
    const value = await schema.validateAsync({
      username: 'falcon',
    })
    console.log('验证成功')
  } catch (err) {
    console.log(err.message)
  }
}
fun()
