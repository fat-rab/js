/**
 * 提高代码质量的目的
 * 高质量的代码，方便后续大的一切操作
 * 方便他人阅读
 */

/**
 * 什么是代码质量
 * 代码整洁
 * 结构规整，没有漫长的结构
 * 阅读好理解
 */

// 优化代码结构
/**
 * 策略模式/状态模式
 * 目的：优化if-else分支
 * 应用场景：当代码if-else分支过多时
 */
//基本结构
//--策略模式
//比如要编写一个计算器，如果将if-else变成下面的方法
function Strategy(type, a, b) {
  let Strategyer = {
    add(a, b) {
      return a + b;
    },
    minus(a, b) {
      return a - b;
    },
  };
  return Strategyer[type](a, b);
}
//--状态模式
//将判断变成对象内部的一个状态，通过对象内部的状态改变，让其拥有不同行为
function stateFactor(state) {
  let stateObject = {
    _status: "",
    state: {
      state1() {},
      state2() {},
    },
    run() {
      return this.state[this._status];
    },
  };
  stateObject._status = state;
  return stateObject;
}
stateFactor("state1").run();
/**
 * 外观模式
 * 目的：通过为多个复杂的子系统提供一个一致的接口
 * 场景：当完成一个操作，需要操作多个子系统，不如体哦概念股一个更高级的
 */
//基本结构
//在组织方法模块时，可以细化多个接口，但是给别人用的时候，要合为一个接口
function mode1() {}
function mode2() {}
function user() {
  mode1(mode2());
}
//优化代码操作
/**
 * 迭代器模式
 * 目的：不访问内部的情况下，方便的遍历数据
 * 场景：当我们要对莫格对象进行操作，但是又不能暴露内部
 */
//基本结构
//在不暴露对象内部结构的同时，可以顺序的访问对象内部，可以帮助简化循环，简化数据操作
function Iterator(item) {
  this.item = item;
}
Iterator.prototype.dealEach = function (fn) {
  for (let i = 0; i < this.item.length; i++) {
    fn(this.item[i], i);
  }
};
/**
 * 备忘录模式
 * 目的：记录状态，方便回滚
 * 场景：系统状态多样，为了保证状态的回滚方便，记录状态
 */
/**
 * 基本结构
 * 记录对象内部的状态，当有需要时，回滚到之前的状态或者方便对象使用
 */
function Memento(){
  let cache={}
  return function(cacheName){
    if(cache[cacheName]){

    }else{

    }
  }
}
let MementoFn=Menento()
MementoFn('xx')