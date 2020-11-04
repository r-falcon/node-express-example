const guard = (req, res, next) => {
  // 判断用户访问的是否是登录页面
  // 判断用户的登录状态：登录，请求放行，不是登录，请求重定向到登录页面
  if (req.url != '/login' && !req.session.username) {
    //非登陆
    //非登录状态
    res.redirect('/admin/login')
  } else {
    //登录，判断用户角色
    if (req.session.role == 'normal') {
      // 普通用户，跳转到播客首页，阻止程序向下执行
      return res.redirect('/home/')
    } else {
    }
    //登录状态,请求放行
    next()
  }
}

module.exports = guard
