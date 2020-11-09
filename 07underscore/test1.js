(function (root) {
    var _ = function (obj) {
        if (!(this instanceof _)) {
            return new _(obj)  //无 new 实例
        }
        this.warp = obj
    }
    _.prototype.map = function () { }
    root._ = _
})(this)