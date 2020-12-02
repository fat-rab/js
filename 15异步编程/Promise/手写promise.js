//步骤一 了解promise规范 https://www.jianshu.com/p/e0f91e03d6c1
//步骤二 实现
//步骤三 测试
statusMap = {
    PENDING: "pending",
    FULFILLED: "fulfilled",
    REJECTED: "rejected",
};
//将promise设置为fulfilled状态
function fulfilledPromise(promise, value) {
    //promise的状态只能改变一次，只能从pending改变为其他状态
    if (promise.status !== statusMap.PENDING) {
        return;
    }
    promise.status = statusMap.FULFILLED;
    promise.value = value;
    //改变状态时会异步执行then里面的回调
    runCbs(promise.fulfilledCbs, value);
}
//将promise设置为rejected状态
function rejectedPromise(promise, reason) {
    //promise的状态只能改变一次
    if (promise.status !== statusMap.PENDING) {
        return;
    }
    promise.status = statusMap.REJECTED;
    promise.reason = reason;
    //改变状态时会异步执行then里面的回调
    runCbs(promise.rejectedCbs, reason);
}

function isFunction(fn) {
    return (
        Object.prototype.toString.call(fn).toLocaleLowerCase() ===
        "[object function]"
    );
}

function isPromise(p) {
    return p instanceof Promise;
}

function isObject(obj) {
    return (
        Object.prototype.toString.call(obj).toLocaleLowerCase() ===
        "[object object]"
    );
}

function runCbs(cbs, val) {
    cbs.forEach((cb) => cb(val));
}

//promise 解析过程
function resolvePromise(promise, x) {
    //如果promise和x指向同一个值
    if (x === promise) {
        rejectedPromise(promise, new TypeError("cant be the same"));
        return;
    }
    //如果x是一个promise
    if (isPromise(x)) {
        if (x.status === statusMap.FULFILLED) {
            fulfilledPromise(promise, x.value);
            return;
        }
        if (x.status === statusMap.REJECTED) {
            rejectedPromise(promise, x.reason);
            return;
        }
        if (x.status === statusMap.PENDING) {
            x.then(
                () => {
                    fulfilledPromise(promise, x.value);
                },
                () => {
                    rejectedPromise(promise, x.reason);
                }
            );
            return;
        }
        return;
    }
    //如果x是一个对象或者函数(thenable)
    if (isObject(x) || isFunction(x)) {
        let then;
        let isCalled = false;
        try {
            then = x.then;
        } catch (error) {
            rejectedPromise(promise, error);
            return;
        }
        //如果then是一个函数
        if (isFunction(then)) {
            try {
                then.call(
                    x,
                    (y) => {
                        if (isCalled) return;
                        isCalled = true;
                        resolvePromise(promise, y);
                    },
                    (r) => {
                        if (isCalled) return;
                        isCalled = true;
                        rejectedPromise(promise, r);
                    }
                );
            } catch (error) {
                //如果执行过程出错，则需要看一下两个函数是否已经执行过了，
                //如果执行过了，说明promise的状态已经改变过了，所以按照规范不能再次改变，所以不错处理
                //如果没有执行过，需要把promise设置为rejected状态，他的reason是执行时返回的异常
                if (isCalled) {
                    return;
                }
                isCalled = true;
                rejectedPromise(promise, error);
            }
            return;
        } else {
            //如果then不是一个函数，则将x作为promise的值，将promise状态变成fulfilled
            fulfilledPromise(promise, x);
            return;
        }
    } else {
        //如果x不是对象也不是函数,则将x作为promise的值，将promise状态变成fulfilled
        fulfilledPromise(promise, x);
        return;
    }
}

class Promise {
    constructor(fn) {
            this.status = statusMap.PENDING;
            this.value = undefined;
            this.reason = undefined;
            this.fulfilledCbs = []; //promise可以多次调用then方法，所以用数组储存then里面的fulfilled回调函数
            this.rejectedCbs = [];
            //创建promise的时候，会传入一个函数，函数有用两个方法resolve和reject作为参数
            // let p= new Promise((resolve, reject) => {
            //   setTimeout(() => {
            //     console.log("执行");
            //     resolve("then执行");
            //   }, 2000);
            // });
            fn(
                (value) => {
                    resolvePromise(this, value);
                },
                (reason) => {
                    rejectedPromise(this, reason);
                }
            );
        }
        //要有一个then方法
    then(onFulfilled, onRejected) {
        const promise1 = this;
        //then方法会return一个promise
        const promise2 = new Promise(() => {});
        if (promise1.status === statusMap.FULFILLED) {
            if (!isFunction(onFulfilled)) {
                return promise1;
            }
            setTimeout(() => {
                try {
                    const x = onFulfilled(promise1.value);
                    //x的值会影响到新生成的promise2
                    resolvePromise(promise2, x);
                } catch (error) {
                    rejectedPromise(promise2, error);
                }
            }, 0);
        }
        if (promise1.status === statusMap.REJECTED) {
            if (!isFunction(onRejected)) {
                return promise1;
            }
            setTimeout(() => {
                try {
                    const x = onRejected(promise1.reason);
                    //x的值会影响到新生成的promise2
                    resolvePromise(promise2, x);
                } catch (error) {
                    rejectedPromise(promise2, error);
                }
            }, 0);
        }
        //如果是pending状态则需要等到promise的参数(回调函数)执行出结果
        //执行出来的结果则需要通过传给then的参数(回调函数)取得
        if (promise1.status === statusMap.PENDING) {
            onFulfilled = isFunction(onFulfilled) ?
                onFulfilled :
                (value) => {
                    return value;
                };
            onRejected = isFunction(onRejected) ?
                onRejected :
                (err) => {
                    throw err;
                };
            promise1.fulfilledCbs.push(() => {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(promise1.value);
                        resolvePromise(promise2, x);
                    } catch (error) {
                        rejectedPromise(promise2, error);
                    }
                }, 0);
            });
            promise1.rejectedCbs.push(() => {
                setTimeout(() => {
                    try {
                        const x = onRejected(promise1.reason);
                        resolvePromise(promise2, x);
                    } catch (error) {
                        rejectedPromise(promise2, error);
                    }
                }, 0);
            });
        }
        return promise2;
    }
}

Promise.deferred = function() {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });
    return deferred;
};
module.exports = Promise;