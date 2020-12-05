(function (root) {
    var _ = function (obj) {
        if (!(this instanceof _)) {    // instanceof 用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链
            return new _(obj)  //无 new 实例  
        }
        this.warp = obj
    }
    _.map = function (arr, callback) {
        return arr.map((item) => {
            callback ? callback(item) : item
        })
    }
    _.unique = function (arr, callback) {
        let result = []
        arr.forEach((item) => {
            let target = callback ? callback(item) : item
            if (result.indexOf(target) === -1) {
                result.push(target)
            }
        });
        return result
    }
    _.functions = function (obj) {
        let arr = []
        for (const key in obj) {
            arr.push(key)
        }
        return arr
    }
    _.each = function (arr, callback) {
        for (let i = 0; i < arr.length; i++) {
            callback(arr[i])
        }
    }
    _.mixin = function (obj) {
        _.each(_.functions(obj), function (key) {
            let func = obj[key]
            _.prototype[key] = function () {
                let args = [this.warp]
                Array.prototype.push.apply(args, arguments)
                return func.apply(this, args)
            }
            
        })
    }
    _.mixin(_)
    root._ = _
})(this)