function serializeToJson(form) {
  var result = {}
  // 获取到表单中用户输入的内容，返回的是一个数组对象
  // [{name:'email',value:'用户输入的内容'}]
  var f = form.serializeArray()
  f.forEach(function (item) {
    // result.email
    result[item.name] = item.value
  })
  return result
}
