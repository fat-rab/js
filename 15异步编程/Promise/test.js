
statusMap = {
    PENDING: "pending",
    FULFILLED: "fulfilled",
    REJECTED: "rejected",
};

function fulfilledPromise(promise, value) {
    if (promise.status !== statusMap.PENDING) return;
    promise.status = statusMap.FULFILLED;
    promise.value = value;
    //改变状态时执行then里面的回调
    runCbs(promise.fulfilledCbs, value);
}

function rejectedPromise(promise, reason) {
    if (promise.status !== statusMap.PENDING) return;
    promise.status = statusMap.REJECTED;
    promise.value = reason;
    runCbs(promise.rejectedCbs, reason);
}

function isFunction(fn) {
    return (
        Object.prototype.toString.call(fn).toLocaleLowerCase() ===
        "[object function]"
    );
}

function isPromise(x) {
    return x instanceof Promise
}

function isObject(obj) {
    return (
        Object.prototype.toString.call(obj).toLocaleLowerCase() ===
        "[object object]"
    );
}

function runCbs(list, value) {
    list.forEach((cb) => cb(value));
}

function resolvePromise(promise, x) {
    //如果promise和x指向同一个值
    if (promise === x) {
        rejectedPromise(promise, new TypeError('cant be same'))
        return
    }
    //如果x是一个promise
    if (isPromise(x)) {
        //如果x的状态是fulfilled，则将x的value 作为promise的value，将他的状态改为fulfilled
        if (x.status === statusMap.FULFILLED) {
            fulfilledPromise(promise, x.value)
            return
        }
        if (x.status === statusMap.REJECTED) {
            rejectedPromise(promise, x.reason)
            return
        }
        if (x.status === statusMap.PENDING) {
            x.then(
                () => {
                    fulfilledPromise(promise, x.value)
                },
                () => {
                    rejectedPromise(promise, x.value)
                }
            )
            return
        }
        return
    }
    if (isObject(x) || isFunction(x)) {
        //thenable
        let then
        let isCall = false
        try {
            then = x.then
        } catch (error) {
            rejectedPromise(promise, error)
            return
        }
        if (isFunction(x)) {
            try {
                then.call(this,
                    (y) => {
                        if (isCall) return
                        isCall = true
                        resolvePromise(promise, y)
                    },
                    (r) => {
                        if (isCall) return
                        isCall = true
                        rejectedPromise(promise, r)
                    }
                )
            } catch (error) {
                if (isCall) return
                isCall = true
                rejectedPromise(promise, error)
            }
            return
        } else {
            fulfilledPromise(promise, x)
            return
        }
    } else {
        fulfilledPromise(promise, x)
        return
    }
}
class Promise {
    constructor(fn) {
        this.status = statusMap.PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.fulfilledCbs = []; //promise可以多次调用then方法，所以用数组储存then里面的fulfilled回调函数
        this.rejectedCbs = [];
        fn(
            (value) => {
                resolvePromise(this, value);
            },
            (reason) => {
                rejectedPromise(this, reason);
            }
        );
    }
    then(onFulfilled, onRejected) {
        let promise1 = this;
        let promise2 = new Promise(() => { });
        if (promise1.status === statusMap.FULFILLED) {
            //如果onFulfilled不是一个函数，则忽略
            if (isFunction(onFulfilled)) {
                return promise1;
            }
            //then 里面的方法施异步执行，用setTimeout模拟异步
            setTimeout(() => {
                try {
                    //onRejected或者onFulfilled return了一个值X，则进入解析过程
                    let x = onFulfilled(promise1.value);
                    resolvePromise(promise2, x);
                } catch (error) {
                    rejectedPromise(promise2, error);
                }
            });
        }
        if (promise1.status === statusMap.REJECTED) {
            //如果onFulfilled不是一个函数，则忽略
            if (isFunction(onRejected)) {
                return promise1;
            }
            setTimeout(() => {
                try {
                    let x = onRejected(promise1.reason);
                    resolvePromise(promise2, x);
                } catch (error) {
                    rejectedPromise(promise2, error);
                }
            });
        }
        //promsie的status为pending 的时候，需要等待new Promsie 时传入的参数出结果
        //然后通过传给then的回调获取结果
        if (promise1.status === statusMap.PENDING) {
            onFulfilled = isFunction(onFulfilled) ?
                onFulfilled :
                (value) => {
                    return value;
                };
            onRejected = isFunction(onRejected) ?
                onRejected :
                (error) => {
                    throw error;
                };
            //
            //promise可以多次调用then，onfulfilled和onRejected会根据promsie状态改变的时候视情况按照注册顺序执行
            promise1.fulfilledCbs.push(
                () => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(promise1.value);
                            resolvePromise(promise2, x);
                        } catch (error) {
                            rejectedPromise(promise2, error);
                        }
                    });
                },
                () => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(promise1.reason);
                            resolvePromise(promise2, x);
                        } catch (error) {
                            rejectedPromise(promise2, error);
                        }
                    });
                }
            );
        }
        return promise2;
    }
}
