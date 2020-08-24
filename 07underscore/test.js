(function (root) {
    var _ = function (data) {
        if (!(this instanceof _)) {
            return new _(data)
        }
        this.warp = data
    }
    _.chain = function (obj) {
        //console.log(this, obj)
        let instance = _(obj)
        instance.chain = true
        return instance
    }
    result = function (instance, data) {
        if (instance.chain) {
            instance.warp = data
            return instance
        }
        return data
    }
    //如果不写在原型链上，链式调用的时候，会跑到result 中，返回实例
    _.prototype.value = function () {
        return this.warp
    }
    _.map = function (arr, callback) {
        return arr.map(item => {
            return callback ? callback(item) : item
        })
    }
    _.unique = function (arr, callback) {
        let result = []
        arr.forEach(item => {
            let target = callback ? callback(item) : item
            if (result.indexOf(target) === -1) {
                result.push(target)
            }
        })
        return result
    }
    _.each = function (arr, callback) {
        arr.forEach(item => {
            callback(item)
        })
    }
    _.functions = function (obj) {
        let result = []
        for (key in obj) {
            result.push(key)
        }
        return result
    }
    _.mixin = function (obj) {
        _.each(_.functions(obj), function (key) {
            let func = obj[key]
            _.prototype[key] = function () {
                let args = [this.warp]
                //let arr=[].slice.call(arguments)
                //arr.forEach((item)=>{args.push(item)})
                //Array.prototype.push.apply(args, [1,2,3])
                Array.prototype.push.apply(args, arguments)//arguments可以传递多个参数
                return result(this, func.apply(this, args))
            }
        })
    }
    _.mixin(_)
    root._ = _
})(this)