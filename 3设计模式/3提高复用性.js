/**
 * 遵循dry原则 dont repeat yourself
 * 减少代码量，节省开销
 */
/**
 * 什么是好的复用
 * 对象可以重复使用，不用修改
 * 重复代码少
 * 模块功能单一
 */
/**
 * 提高复用性的设计模式
 * 减少代码数量，高校服用代码
 * 1 桥接模式
 * 目的：通过桥接代替耦合
 * 应用场景：减少模块之间的耦合
 * 2 享元模式
 * 目的：减少对象/代码数量
 * 应用场景：当代码中创建了大量类似对象和类似的代码块
 * 创建高可复用性的代码
 * 1 模板方法模式
 * 目的：定义一系列操作的骨架，简化后面类似操作的内容
 * 应用场景：当项目中出现很多类似操作内容
 */
//享元模式
//有100中不同文字的弹窗，每种弹窗行为相同，但是文字样式不同
function Pop() {}
//保留同样的行为
Pop.prototype.action = function () {};
//显示弹窗
Pop.prototype.show = function () {};
let pop = new Pop();
pop.show({ text: "11", style: {} });
//桥接模式
//两种不同形状，每种有三个颜色
function rect(color) {
  showColor(color);
}
function circle(color) {
  showColor(color);
}
new circle("red");

//模板方法
//导航组件多种多样，可能后面还会新增类型，那么不妨写一个基础的组件类，然后具体实现，延迟到具体的使用时
function baseNav() {
  //基础类，顶下基本骨架
}
baseNav.prototype.action = function (fn) {
  //特异性处理，留出一个回调等待具体实现
};

//应用实例

/**
 * 享元模式
 * 文件上传
 * 需求：可以上传多个文件
 */

//未封装
// function upLoader(fileType, file) {
//   this.fileType = fileType;
//   this.file = file;
// }
// upLoader.prototype.upLoading = function () {};
// //上传多个文件
// new upLoader('img',fileOb1).upLoading()
// new upLoader('img',fileOb1).upLoading()
//封装
function upLoader() {}
upLoader.prototype.upLoading = function (data) {};
let data = [
  { type: "img", file: fileOb1 },
  { type: "img", file: fileOb1 },
];
let upLoader = new upLoader();
for (let i = 0; i < data.length; i++) {
  upLoader.upLoading(data[i]);
}

/**
 * 桥接模式
 * 有一组菜单，上面每一种选项都有不同的选中效果
 */
//不封装
// function menuItem(word) {
//   this.word = word;
//   this.dom = document.createElement("div");
//   this.dom.innerHTML = this.word;
// }
// let menu1 = new menuItem("menu1");
// let menu2 = new menuItem("menu2");
// let menu3 = new menuItem("menu3");
// menu1.onmouseover=function(){
//   menu1.style.color='red'
// }
// menu1.onmouseout=function(){
//   menu1.style.color='white'
// }
// menu2.onmouseover=function(){
//   menu1.style.color='red'
// }
// menu2.onmouseout=function(){
//   menu1.style.color='white'
// }
// menu3.onmouseover=function(){
//   menu1.style.color='red'
// }
// menu3.onmouseout=function(){
//   menu1.style.color='white'
// }
//封装
// function menuItem(word, color) {
//   this.word = word;
//   this.color = color;
//   this.dom = document.createElement("div");
//   this.dom.innerHTML = this.word;
// }
// function menuColor(colorOver, colorOut) {
//   this.colorOver = colorOver;
//   this.colorOut = colorOut;
// }

// menuItem.prototype.bind = function () {
//   this.dom.onmouseover = function () {
//     this.style.color = this.color.colorOver;
//   };
//   this.dom.onmouseout = function () {
//     this.style.color = this.color.colorOut;
//   };
// };
// let data = [{ word: "123", color: ["red", "black"] }];
// for (let i = 0; i < data.length; i++) {
//   new menuItem(data[i].word, new menuColor(data[i][0], data[i][1])).bind();
//}

//模板方法
/**
 * 弹窗组件
 * 有一系列的弹窗组件，大小，行为，文字都不同
 */

function basePop(word, size) {
  this.word = word;
  this.style.width = size.width;
  this.style.height - size.height;
  let div = document.createElement("div");
  this.dom = div;
}
basePop.prototype.hidden = function () {
  this.dom.style.display = "none";
};
basePop.prototype.confirm = function () {
  this.dom.style.display = "none";
};

function ajaxPop(word, size) {
  basePop.call(this,word, size);
}
ajaxPop.prototype = new basePop();

let hidden = ajaxPop.prototype.hidden;
ajaxPop.prototype.hidden = function () {
  hidden.call(this);
  console.log("1");
};
let confirm = ajaxPop.prototype.confirm;
ajaxPop.prototype.confirm = function () {
  confirm.call(this);
  console.log("2");
};