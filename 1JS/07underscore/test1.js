(function (root) {
  var _ = function (obj) {
    if (!(this instanceof _)) {
      // instanceof 用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链
      return new _(obj); //无 new 实例
    }
    this.warp = obj;
  };
  let result = function (instance, data) {  //这边不能适用_.result ，否则也会被mixin方法混入到prototype中
    if (instance._chain) {
      instance.warp = data;  //将返回的结果存入warp中，用于后面的计算取值
      return instance;
    }
    return data;
  };
  _.chain = function (obj) {
    let instance = _(obj); //先创建无new 化实例
    instance._chain = true;
    return instance;
  };
  //如果写成_.value 的话，最后结束链式调用的时候，还是会因为mixin而被认为是调用一个函数 最后return的还是result 中的instance
  _.prototype.value = function () {
    console.log(this, this.warp);
    return this.warp;
  };
  _.map = function (arr, callback) {
    return arr.map((item) => {
      return callback ? callback(item) : item;
    });
  };

  _.unique = function (arr, callback) {
    let result = [];
    arr.forEach((item) => {
      let target = callback ? callback(item) : item;
      if (result.indexOf(target) === -1) {
        result.push(target);
      }
    });
    return result;
  };
  _.each = function (arr, callback) {
    for (let i = 0; i < arr.length; i++) {
      //console.log(arr[i])
      callback(arr[i]);
    }
  };
  _.functions = function (obj) {
    let arr = [];
    for (const key in obj) {
      arr.push(key);
    }
    return arr;
  };
  //_([123]).map(function(){})
  _.mixin = function (obj) {
    _.each(_.functions(obj), function (key) {
      let func = obj[key];
      _.prototype[key] = function () {
        let args = [this.warp];
        Array.prototype.push.apply(args, arguments);
        return result(this, func.apply(this, args));
      };
    });
  };
  _.mixin(_);
  root._ = _;
})(this);
