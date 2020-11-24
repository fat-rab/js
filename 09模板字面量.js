//模板字面量 最前面可以跟一个函数，这个函数叫模板字符串的tag
function myTag(strings, personExp, ageExp) {
    let str0 = strings[0];
    let str1 = strings[1];
    //最后还有一项，但是是空字符串
    //let str2=strings[2] //''
    let ageStr;
    if (ageExp > 99) {
      ageStr = "centenarian";
    } else {
      ageStr = "youngster";
    }
    return str0 + personExp + str1 + ageStr;
  }
  let person = "tom";
  let age = 18;
  console.log(myTag`that ${person} is a ${age}`);