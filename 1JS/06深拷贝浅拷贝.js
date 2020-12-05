//只有在复杂的场景中存在，即对象的属性还是对象

let obj = {
    name: '123',
    friend: {
        name: 'hehe'
    }
}
let copyObj = {}
//浅拷贝
//只复制一层，当对象的属性为对象时，只复制其引用，当引用值发生变化时，也会跟着发生变化
//for in
// for (const key in obj) {
//     copyObj[key] = obj[key]
// }
// copyObj.name = 'haha'
// copyObj.friend.name = 'qwe'
// console.log(obj, copyObj)

//Object.assign  将N个源对象拷贝到目标对象中去  
// copyObj = Object.assign({},obj)
// copyObj.name = 'qwe'
// copyObj.friend.name = 'asd'
// console.log(copyObj, obj)

//扩展运算符
// copyObj = { ...obj }
// copyObj.name = 'qwe'
// copyObj.friend.name = 'asd'
// console.log(copyObj, obj)

//深拷贝
//1 JSON.parse(JSON.stringify())  无法复制函数和undefined
//copyObj = JSON.parse(JSON.stringify(obj))
// let a = {
//     name: undefined,
//     age() { }
// }
// copyObj = JSON.parse(JSON.stringify(a))
// console.log(copyObj) 
//2 递归 //深拷贝，可以拷贝undefined 和函数
// let deepClone = function (obj) {
//     let newObj = Array.isArray(obj) ? [] : {}
//     if (obj && typeof obj === 'object') {
//         for (const key in obj) {
//             if (obj.hasOwnProperty(key)) {
//                 if (obj[key] && typeof obj[key] === 'object') {
//                     newObj[key] = deepClone(obj[key]);
//                 } else {
//                     newObj[key] = obj[key];
//                 }

//             }
//         }
//     }
//     return newObj
// }
// let test = {
//     name: 'sj',
//     age: undefined,
//     dirve: () => { },
//     info: {
//         height: 180
//     }
// }

// let newObj = deepClone(test)
// newObj.info.height = 170
// console.log(test, newObj) 