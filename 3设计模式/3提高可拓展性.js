/**
 * 目的
 * 面对需求变更，方便需求更改
 * 减少代码修改难度
 */

/**
 * 什么是好的可扩展性
 * 需求的变更，不需要重写
 * 代码修改不需要大规模变动
 * 方便加入新的模块
 */

//提高可扩展性的设计模式
/**
 * 更好的更改代码
 * 1适配器模式
 * 目的：通过写一个适配器，来代替替换
 * 应用场景：面临接口不通用的问题
 * 2 装饰者模式
 * 目的：不重写方法的扩展方法
 * 应用场景：当一个方法需要扩展，但是又不好去修改方法
 * 3 命令模式
 * 目的：解耦实现和调用，让双方互不干扰
 * 应用场景：调用命令充满不确定性
 */


//基本结构
//1适配器模式
//用log代替console.log
// let log = (function () {
//     return window.console.log
// })()
//2装饰者模式
//有一个他人写好的模块a，有一个内部方法b ，不能修改模块，拓展b方法
// let a = {
//     b() { }
// }
// function myB(){
//     a.b()
//     //扩展的方法
// }
//3命令模式
// let command = (function () {
//  实现
//     let action = {}
//      读取action 里面的实现
//     return function excute() { }
// })()


//应用示例
//1适配器模式
/**
 * 1 框架的变更
 * 需求：目前项目使用a框架，现在改成了b，两个框架十分类似，但是少数几个方法不同
 */
//将老的api重写成新的api
//A.c()  $.css()   A.o() $.on()
// window.A = $
// A.c = function () {
//     return $.css.apply(this, arguments)
// }
// A.o = function () {
//     return $.on.apply(this, arguments)
// }

/**
 * 2 参数适配
 * 需求：为了避免参数不适配产生问题，很多框架会有一个参数适配操作
 */
//当你的方法传入的参数较为复杂的时候，最好加一个参数适配器
// function f1(obj) {
//     let _default = {
//         name: 'xxx',
//         age: 18
//     }
//     for (const key in _default) {
//         _default[key] = obj[key] ? obj[key] : _default[key]
//     }
// }


//装饰者模式的示例
/**
 * 1 拓展已有的事件绑定
 * 需求：现在项目改造，需要给已有的Input标签已有的事件，添加一些操作
 */
//现在需要再次基础上打印2
// dom.onclick = function () {
//     console.log(1)
// }
// function decorator(dom, fn) {
//     if (typeof dom.onclick === 'function') {
//         let _old = dom.onclick
//         dom.onclick = function () {
//             _old()
//             fn()
//         }
//     }
// }
// decorator(dom, function () { console.log(2) })
/**
 * 2 vue数组的监听
 * 需求：vue中可以利用definePropert监听对象，那数组怎么办
 */
//调用老方法，调用新方法，返回结果
// let arrProto = Array.prototype
// let arrayMethods = Object.create(arrProto) //方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。

// let methodsToPatch = ["push", "pop"]

// methodsToPatch.forEach((item) => {
//     let original = arrProto[item]
//     let result = original.apply(this, arguments)
//     dep.notify()
//     return result
// })


//命令模式的示例
/**
 * 1 绘图命令
 * 封装一系列的canvas绘图命令
 */
//不封装
// let myCanvas = function () { }
// myCanvas.prototype.drawCircle = function () { }
// myCanvas.prototype.drawRect = function () { }
//如果要画两个圆形，一个矩形
// let myC=new myCanvas()
// myC.drawCircle()
// myC.drawCircle()
// myC.drawRect()

//封装
// let canvasCommand = function () {
//     let action = {
//         drawCircle() { },
//         drawRect() { }
//     }
// return function excute(commander) {
//     commander.forEach(item => {
//         action[item.key](item.config)
//     });
// }
// }
// canvasCommand([{ type: 'drawCircle', config: {} }, { type: 'drawCircle', config: {} }, { type: 'drawCircle', config: {} }])
/**
 * 2 绘图命令
 * 绘制随机数量图片
 * 需求：图片数量和排序顺序随机
 */

/**
 * 1 用户只管输入命令，不用管具体API
 * 2 命令和实现解耦，无论发生什么变动，不会彼此影响
 */
/**
 * 数据=>直接调用api(不封装)
 * 数据=>excute命令解析=>调用api(封装)
 */
let createImg = function () {
    let action = {
        create(obj) {
            let htmlArr = [];
            let htmlString = '';
            let htmlTemplate = "<div><img src='{{img-url}}'></img></div><h2>{{img-title}}</h2>";
            let displayWay = {
                normal(arr) {
                    return arr
                },
                reserve(arr) {
                    return arr.reserve()
                }
            }
            obj.imgArr.forEach(item => {
                let _html
                _html = htmlTemplate.replace('{{img-url}}', item.img).replace('{{img-title}}', item.title)
                htmlArr.push(_html)
            });
            htmlArr = displayWay[obj.type](htmlArr)
            htmlString = htmlArr.join(',')
            return "<div>" + htmlString  + "</div>"
        },
        display(obj) {
            let _html = this.create(obj)
            obj.target.innerHtml = _html
        }
    }
    return function excute(obj) {
        let _default = {
            imgArr: [{ img: 'xxx', title: 'xxx' }],
            type: "normal",
            target: document.body
        }
        for (const key in _default) {
            _default[key] = obj[key] ? obj[key] : _default[key]
        }
        action.display(_default)
    }
}