/**
 * 封装的目的
 * 1定义变量不会污染外部
 * 2能够做一个模块调用
 * 3遵循开闭原则
 */
/**
 * 变量外部不可见
 * 调用接口使用
 * 留出扩展接口
 */

//封装对象时的设计模式
/**
 * 创建对象的模式
 * 1工厂模式
 * 目的：方便大量创建对象
 * 应用场景：当一个对象需要经常创建的时候
 * 2建造者模式
 * 目的：需要组合出一个全局兑现
 * 应用场景：当要创建单个，庞大的组合对象时
 */
/**
 * 保障对象（保障这个对象全局只有一个）
 * 单例模式
 * 目的：需要确保全局只有一个对象
 * 应用场景：为了避免重复新建，避免多个对象互相干扰
 */

//基本结构
/**
 * 工厂模式就是写一个方法，只需要调用这个方法，就可以拿到你要的对象
 */
function Factory(type) {
  switch (type) {
    case "type1":
      return new Type1();
    case "type2":
      return new Type2();
    case "type3":
      return new Type3();
  }
}

/**
 * 建造者模式：将一个复杂的类的各个部分，拆分成独立的类，然后在最终类里组合到一块，final为最终给出去的类
 */
function Mode1() {}
function Mode2() {}
function Final() {
  this.mode1 = new mode1();
  this.mode2 = new mode2();
}

/**
 * 单例模式：通过定义一个方法，使用时只允许通过此方法难道存在内部的同一实例化对象
 */
let Singleton = function (name) {
  this.name = name;
};
Singleton.getInstance = function (name) {
  if (this.instance) {
    return this.instance;
  }
  return (this.instance = new Singleton(name));
};

//实际使用
/**
 * 工厂模式的示例  underscore  jquery
 */

/**
 * 建造者模式示例
 * 1 vue
 * 2 编写编辑器插件
 * 需求：有一个编辑器插件，初始化的时候，需要配置大量参数，而且内部功能很多
 */
function Editor() {
  this.initHtml = new initHtml();
  this.fontControll = new fontControll();
  //......
}
function initHtml() {}
initHtml.prototype.initStyle = function () {};
function fontControll() {}
fontControll.prototype.changeColor = function () {};
function stateControll() {}
stateControll.prototype.saveState = function () {
  let state = [];
  let nowS = 0;
};
stateControll.prototype.backState = function () {
  let state = this.state[this.nowS - 1];
  this.fontControll.changeColor(state.color);
};
window.Editor = Editor;

/**
 * 单例模式
 * 1vue-router
 * 2写一个数据储存对象
 * 需求：项目中有一个全局数据储存者，这个储存者只能有一个，不然会需要进行同步，增加复杂度
 */
function store() {
  if (store.install) {
    return store.install;
  }
  this.store = {};
  store.install = this;
}
store.install = null;
let s1 = new store();
let s2 = new store();
s1.store.a = 1;
console.log(s2); //  {store:{a:1}}
