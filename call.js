Function.prototype.myCall1 = function(context) {
    // 判断当前调用call的是否是函数，不是的话就抛出错误
    if (typeof this !== 'function') { 
        throw new TypeError('Error') 
    }
    // 如果没有传或传的值为空 context 指向 window
    context = context || window
    // 创造一个独一无二的字符串
    let fn = Symbol(context)
    // 给context添加一个方法，该方法保存着调用call的函数
    context.fn = this 
    // 处理参数 去除第一个参数context，其它参数传入fn函数，返回一个新的参数数组
    let arg = [...arguments].slice(1)
    // 执行fn函数，也就是执行调用call的函数
    const result = context.fn(...arg) 
    // 删除该属性
    delete context.fn
    // 返回函数执行的结果
    return result
}