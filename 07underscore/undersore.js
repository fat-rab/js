(function (root) {
    var _ = function (obj) {
        if (!(this instanceof _)) {
            return new _(obj)  //无 new 实例
        }
        this.warp = obj
    }
    let result = function (instance, data) {
        //console.log(instance, data, 'result')
        if (instance._chain) {
            instance.warp = data
            return instance
        }
        return data
    }
    _.chain = function (obj) {
        //console.log(this, obj, 'chain')
        let instance = _(obj)
        instance._chain = true
        return instance
    }
    _.prototype.value = function () {
        //console.log(this, 'value')
        return this.warp
    }
    _.map = function (arr, callback) {
        return arr.map((item) => {
            return callback ? callback(item) : item
        })
    }
    //去重
    _.unique = function (arr, callback) {
        let result = []
        for (let i = 0; i < arr.length; i++) {
            let target = callback ? callback(arr[i]) : arr[i]
            if (result.indexOf(target) === -1) {
                result.push(target)
            }
        }
        return result
    }
    _.max = function () { }
    _.each = function (arr, callback) {
        for (let i = 0; i < arr.length; i++) {
            //console.log(arr[i])
            callback(arr[i])
        }
    }
    _.functions = function (obj) {
        let arr = []
        for (const key in obj) {
            arr.push(key)
        }
        return arr
    }
    //_([123]).map(function(){})
    _.mixin = function (obj) {
        _.each(_.functions(obj), function (key) {
            let func = obj[key]
            _.prototype[key] = function () {
                let args = [this.warp]
                //数组合并
                Array.prototype.push.apply(args, arguments)//arguments 可以传递多个callback
                //func.apply(this, args)   //[数据，迭代器]
                return result(this, func.apply(this, args))
            }
        })
    }
    _.mixin(_)
    root._ = _
})(this)