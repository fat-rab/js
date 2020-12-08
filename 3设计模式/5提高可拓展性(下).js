/**
 * 提高整体项目可扩展性的核心
 * 低耦合
 * 良好的组织沟通方式
 */
/**
 * 观察者模式
 * 目的：减少对象间的耦合，提高扩展性
 * 场景：当两个模块直接通过会增加他们的耦合性时
 */
/**
 * 职责链模式
 * 目的：为了避免请求发送者与多个请求处理耦合在一起，形成一个链条
 * 场景：将操作分割成一系列模块，每个模块只处理自己的事情
 */
/**
 * 访问者模式
 * 目的：解耦数据结构与数据的操作
 * 场景：数据结构不希望与操作有关联
 */

//基本结构
/**
 * 观察者模式
 * 定义一个中转观察者，两个模块之间不直接沟通，而是通过观察者。一般适用于不方便直接沟通，
 */
// function observe() {
//   this.message = {};
// }
// observe.prototype.regist = function (type, fn) {
//   this.message[type] = fn;
// };
// observe.prototype.fire = function (type) {
//   this.message[type]();
// };
// observe.prototype.remove = function (type) {
//   this.message[type] = null;
// };

/**
 * 职责链模式
 * 把要做的事情组织为一条有序的链条，通过这条链条传递消息来完成功能，适用于不涉及到复杂异步的操作
 */
// function mode1() {}
// function mode2() {}
// function mode3() {}
// _result = mode1(_result);
// _result = mode2(_result);
// _result = mode3(_result);
/**
 * 访问者模式
 * 通过定义一个访问者，代替直接访问对象，来减少两个对象之间的耦合
 */
// let data = [];
// let handler = function () {};
// handler.prototype.get = function () {};
// let vistor = function (handler, data) {
//   handler.get(data);
// };

//应用
//观察者模式
/**
 * 多人合作问题
 * A写了首页模块，B写了评论模块，现在要把评论展示在首页
 */
function observe() {
  this.message = {};
}
observe.prototype.regist = function (type, fn) {
  this.message[type] = fn;
};
observe.prototype.fire = function (type) {
  this.message[type]();
};
observe.prototype.remove = function (type) {
  this.message[type] = null;
};
let obser = new observe();
function comment() {
  let list = [{ type: "hot", content: "xx" }];
  obser.regist("getHot", () => {
    let _result = [];
    this.list.forEach((item) => {
      if (item.type === "hot") _result.push(item);
    });
    return _result;
  });
}

function index() {
  return obser.fire("getHot");
}
/**
 * 转盘
 * 每转一圈，速度变快
 */
