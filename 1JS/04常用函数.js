//缓存函数 memoizition
//应用于需要大量重复计算或者依赖于之前计算结果的函数
// let memoize = function (fun) {
//     let calc = {}
//     return function (key) {
//         if (!calc[key]) {
//             //console.log(this,arguments)  //window 传入的参数
//             //console.log(arguments)
//             calc[key] = fun.apply(this, arguments)  //window 调用，传入的参数arguments
//         }
//         return calc[key]
//     }
// }
// let sum = a => a + 10
// let calcFn = memoize(sum)
// console.log(calcFn(10))

//斐波那契函数
// var count = 0;
// var fibonacci = function (num) {
//     count++;
//     return num < 2 ? num : fibonacci(num - 1) + fibonacci(num - 2);
// };
//未使用缓存函数
// for (let i = 0; i <= 10; i++) {
//     fibonacci(i)
// }yi
// console.log(count) //453
//使用缓存函数
// fibonacci = memoize(fibonacci);
// for (let i = 0; i <= 10; i++) {
//     fibonacci(i);
// }
// console.log(count);//12
//柯里化函数
//将使用多个参数的一个函数转换成一系列使用一个参数的函数，并且返回接受余下参数且返回结果的函数
/**
 @param 作用
 @param 1 逐步接受参数，并缓存供后期使用
 @param 2 不立即计算，延后执行
 @param 3 符合计算的条件，将缓存的函数，统一传递给执行方法
*/
// // 非柯里化
// let hasSpace = (reg, str) => {
//     return reg.test(str)
// }
//柯里化
// let curryFn = (reg) => {
//     return (str) => {
//         return reg.test(str)
//     }
// }
// let curryHasSpace = curryFn(/\s+/g) //匹配空白字符
// console.log(curryHasSpace('xxx xxx'))

//实现 add(1)(2, 3)(4)() = 10 
// let curry = (fn) => {
//     let calcArr = [];
//     return function next() {
//         //箭头函数没有arguments
//         let arr = [].slice.call(arguments);
//         if (arr.length > 0) {
//             calcArr = calcArr.concat(arr);
//             return next;
//         } else {
//             console.log(calcArr);
//             return fn.apply(this, calcArr);
//             //return fn(...calcArr);
//         }
//     };
// };
// let fn = (...arr) => {
//     console.log(arr, "fn");
//     let arrs = [].slice.call(arr);
//     return arrs.reduce((a, b) => {
//         return a + b;
//     });
// };
// let add = curry(fn);
// console.log(add)
// console.log(add(1)(2, 3)(4)());
//偏函数
//偏函数是将一个N元函数转换成一个N-X元函数  
//可以利用bind 实现
// let sum = (x, y) => x + y
// let bindSum = sum.bind(this, 1)
// console.log(bindSum(2))