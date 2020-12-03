//迭代器和生成器
//迭代器
//有next方法，执行返回结果对象
// function createIterator(items) {
//     let i = 0;
//     return {
//         next: function() {
//             let done = i >= items.length;
//             let value = !done ? items[i++] : undefined;
//             return {
//                 done: done,
//                 value: value,
//             };
//         },
//     };
// }
// let iterator = createIterator([1, 2, 3]);
// console.log(iterator.next()); //{ done: false, value: 1 }
// console.log(iterator.next()); //{ done: false, value: 2 }
// console.log(iterator.next()); //{ done: false, value: 3 }
// console.log(iterator.next()); //{ done: true, value: undefined }

//Generator(生成器)
//ES5异步百年城解决方案
//声明：通过function*声明
//返回值：符合可迭代协议和迭代器协议的生成器对象
//在执行时能暂停，又能从暂停处继续执行

//yield
//只能出现在Generator函数
//用来暂停和恢复生成器函数
//--next执行
//--遇到yield暂停，将紧跟yield表达式的值作为返回的对象的value
//--没有yield，一直执行到return，将return的值作为返回的对象的value
//--没有return，将undefined作为返回的对象的value
//--next参数
//--next方法可以带一个参数，该参数会被当作上一个yield表达式的返回值

// function* createIterator() {
//     let first = yield 1;
//     let second = yield first + 2;
//     yield second + 3;
// }
// let iterator = createIterator();

// console.log(iterator.next()); //{value:1,done:false}
// console.log(iterator.next(2)); //{value:4,done:false}
// console.log(iterator.next(3)); //{value:6,done:false}
// console.log(iterator.next()); //{value:undefined,done:true}

//yield* 生成器函数/可迭代对象
//委托给其他可迭代对象
//作用：复用生成器
// function* generator1() {
//     yield 1;
//     yield 2;
// }

// function* generator2() {
//     yield 100;
//     yield* generator1();
//     yield 200;
// }
// let g2 = generator2();
// console.log(g2.next()); //{value:100,done:false}
// console.log(g2.next()); //{value:1,done:false}
// console.log(g2.next()); //{value:2,done:false}
// console.log(g2.next()); //{value:200,done:false}
// console.log(g2.next()); //{value:undefined,done:true}

//return(param)
//给定param值终结遍历器
//param可缺省
// function* generator() {
//     yield 100;
//     yield 200;
//     yield 300;
// }
// let g = generator();
// console.log(g.next()); //{value:100,done:false}
// console.log(g.return()); //{value:undefined,done:true}
// console.log(g.next()) //{value:undefined,done:true}

//throw
//让生成器对象内部抛出错误
// function* generator() {
//     let first = yield 1;
//     let second;
//     try {
//         second = yield first + 2;
//     } catch (error) {
//         second = 6;
//     }
//     yield second + 3;
// }
// let g = generator();
// console.log(g.next()); //{value:1,done:false}
// console.log(g.next(1)); //{value:3,done:false}
// console.log(g.throw(new Error("error"))); //{value:9,done:false}
// console.log(g.next()); //{value:undefined,done:true}
//Generator函数的学习原理
//协程 :可以暂停执行（暂停的表达式称为暂停点),可以从挂起点恢复（保留其原始参数和局部变量）

//一个线程存在多个协程，但是同时只能执行一个
//generator函数是协程在es6实现
// yield挂起x协程（交给其他协程）,next唤醒x协程

//thunk
//求值策略：传值调用，传名调用
//传值调用，sum(x+1,x+2) 计算最终的结果之间，会将x+1和x+2计算出来
//传名调用  sum(x+1,x+2) 等到用到x+1或者x+2的时候才会计算值 
//thunk函数传名调用的方法之一
//可以实现自动执行Generator

//使用thunk方法
const fs = require('fs')
function thunk(fn) {
    return function (...args) {
        return function (callback) {
            return fn.call(this, ...args, callback);
        };
    };
}
let readFileThunk = thunk(fs.readFile);
function* generator() {
    console.log('1231')
    let r1 = yield readFileThunk('./test1.json');
    console.log("r1");
    let r2 = yield readFileThunk('./test2.json');
    console.log("r2");
    let r3 = yield readFileThunk('./test3.json');
    console.log("r3");
}

function run(fn) {
    let gen = fn();
    function next(err, data) {
        console.log(data, "data");
        let result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }
    next();
}
run(generator);

