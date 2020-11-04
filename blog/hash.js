// 导入bcrypt
const bcrypt = require('bcrypt')

async function run() {
  // 生成随机字符串,genSalt接受一个数值作为参数，数值越大，加密程度越高，数值越小，加密程度越低
  const salt = await bcrypt.genSalt(10)
  // 对密码进行加密：1要加密的明文 2随机字符串 返回值是加密后的密码
  const result = await bcrypt.hash('123456', salt)
  console.log(salt)
  console.log(result)
}

run()
