//[].slice===Array.prototype.slice
//[]为创建数组，当使用slice时，回到原型链上面查找
//Array.prototype.slice时定义的方法，可以重写,[].slice 是使用方法
//arguments是拥有长度属性的伪数组，可以通过slice 转化成数组
//slice(a,b) 方法： 从索引a开始截取（包括a），一直截取到b（不包括b），
//如果里面只有一个参数，，那么就直接截取到末尾，不会改变原来的数组
//如果不传入参数，则从头截取到末尾（返回this）
//array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
//initialValue 可选，传递给函数的初始值
// let arr = [1, 2, 3, 4, 5]
// let sum = arr.reduce((res, cur) => {
//   console.log(res, cur)
//   return res + cur
// }, 0)
// console.log(sum)

//compose  将嵌套执行的函数平铺 ，从右向左执行
//嵌套执行：一个函数的返回值作为另外一个函数的参数
//[].slice.call() 将类数组转换成数组
// let sum = (x) => x + 10;
// let multiply = (y) => y * 10;
// let compose = function () {
//   let arg = [].slice.call(arguments);
//   console.log(arg);
//   return function (x) {
//     return arg.reduceRight((a, b) => {
//       return b(a)
//     },x)
//   }
// };
// let calc = compose(sum, multiply);
// console.log(calc(10))

//pipe 从左往右执行
// let sum = (x) => x + 10;
// let multiply = (y) => y * 10;
// let minus = n => n - 1;
// let pipe = function () {
//   let arg = [].slice.call(arguments);
//   console.log(arg,'arg');
//   return function (x) {
//     return arg.reduce((a, b) => {
//       return b(a)
//     },x)
//   }
// };
// let calc = compose(sum, multiply,minus);
// console.log(calc(10))



