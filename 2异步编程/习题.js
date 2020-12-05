//1
// async function async1() {
//     console.log("1");
//     // async2()的返回值是promise
//     console.log(await async2());
//     console.log("2");
// }

// async function async2() {
//     console.log("3");
//     return "0";
// }

// setTimeout(() => {
//     console.log("4");
//     new Promise((resolve) => {
//         console.log("5");
//         resolve();
//     }).then(() => {
//         console.log("6");
//     });
// });

// async1();
// new Promise((resolve) => {
//     console.log("7");
//     resolve();
// }).then(() => {
//     console.log("8");
// });
// console.log("9");
//1 3 7 9 0 2 8 4 5 6

//2解释浏览器的eventLoop机制
//事件循环，用于主线程从任务队列中循环读取事件,由于js是单线程的，所以如果遇到ajax请求或者计时器之类的任务，会造成阻塞，不利于用户体验，所以需要将这些任务放入任务队列中执行，这些任务叫异步任务，因为浏览器内核(渲染进程)是多线程的，所以js利用渲染进程的多线程完成异步，由定时器线程和http请求线程处理对应的任务，任务完成时，通知事件触发线程添加到任务队列中，然后主线程中的同步任务完成之后，就会读取任务队列，首先执行微任务，然后执行宏任务，主线程不断重复这个过程，称之为事件循环

//3
//Promise.resolve("a").then("b").then(Promise.resolve("c")).then(console.log) //a

//4
// Promise.resolve({
//     then: function() {
//         console.log("a");
//     },
// }).then(() => {
//     console.log("d");
// }); //a
// Promise.resolve({
//   then: function() {
//       console.log("a");
//   },
// })  由于resolve传入的参数是thenable，但是then方法并没有传入onfulfilled和onrejected，所以无法决议，状态时Pending,所以下面的then方法无法执行，所以只能打印 a

//5
// Promise.resolve({
//     then: function(fullfill) {
//         fullfill("a");
//         console.log("b");
//         throw new Error("c"); //这个不会执行，因为promise的状态只能改变一次，throw new Error相当于将状态改变为rejected
//         console.log("d"); //就算执行了throw new Error,后面的代码也不会执行
//     },
// }).then(
//     (d) => {
//         console.log(d);
//     },
//     (err) => {
//         console.log(err.message);
//     }
// ); //b a

//6
// Promise.resolve(3) pormise.status:fulfilled value:3
//then(() => {
//   console.log("a");
//   throw new Error("b");
// })
//此时生成的新的promise status：rejected value: new Error('b')
// then(
//   () => {
//       console.log("c");
//   },
//   (err) => {
//       console.log(err.message);
//       return "d";
//   }
// )
//执行onrejected方法，return 'd'  决议const x = onFulfilled(promise1.value) resolvePromise(promise2, x)
//新的promise.status fulfilled value:'d'
// Promise.resolve(3)
//     .then(() => {
//         console.log("a");
//         throw new Error("b");
//     })
//     .then(
//         () => {
//             console.log("c");
//         },
//         (err) => {
//             console.log(err.message);
//             return "d";
//         }
//     )
//     .then(
//         (d) => console.log("d"),
//         (e) => console.log("e")
//     );
//a b d
//7 在resolve之后抛出错误不能被捕获，因为状态只能执行一次，后面的代码不会执行
// new Promise((resolve, reject) => {
//         resolve("a");
//         throw new Error("b");
//     })
//     .then(console.log)
//     .catch(console.log);

//8
// function* gen() {
//     let a = yield "a";
//     let b = yield a + "b";
//     return b; //迭代器已经结束，不用管这段
// }
// let g = gen();
// console.log(g.next()); // {done:false,value:'a'}
// console.log(g.next("c")); // {done:false,value:'cb'}
// console.log(g.next()); // {done:true,value:'undefined'}
//9
// function* gen1() {
//     yield "a";
//     yield "b";
// }

// function* gen2() {
//     yield* gen1();
//     yield "c";
//     yield "d";
// }

// function* gen3() {
//     gen1();
//     yield "c";
//     yield "d";
// }
// const g2 = gen2();
// const g3 = gen3();
// for (let v of g2) {
//     console.log(v);
// } //a b c d
// for (let v of g3) {
//     console.log(v);
// } // c d

//10
function geneP(d1, d2) {
    return new Promise(function(resolve, reject) {
        if (+new Date() > 0) {
            resolve(d1);
        } else {
            reject(d2);
        }
    });
}

function* gen() {
    yield geneP("yes", "no");
    yield geneP("y", "n");
}

function run(fn) {
    var g = fn();

    function next() {
        let result = g.next();
        console.log(result.value);
        if (result.done) return;
        result.value.then(next);
    }
    next();
}

run(gen);
// Promise { 'yes' } Promise { 'y' } undefined