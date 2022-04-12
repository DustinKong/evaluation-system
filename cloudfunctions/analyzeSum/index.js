// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {

  return await db.collection('data').where({
    labId: event.labId
  }).get().then(res => {
    let arr = new Array();
    for (let item of res.data) {
      //console.log(item);
      arr.push(item.answer);
    }
    // console.log(arr);
    let size = res.data.length;
    let arrAva = new Array(33);
    for (let i = 0; i < 33; i++) {
      let sum = 0;
      for (let j = 0; j < size; j++) {
        sum += arr[j][i];
      }
      arrAva[i] = sum / size;
    }
    console.log(arrAva); //1*33
    let arrStand = [50, 60, 80, 90];

    let arr2 = new Array(); //4*32维度
    for (let i = 0; i < 4; i++) {
      let tmpArr = new Array(33);
      for (let j = 0; j < 33; j++) {
        tmpArr[j] = Math.abs(arrAva[j] - arrStand[i]);
      }
      arr2.push(tmpArr);
    }
    console.log(arr2);
    //获取Xij
    for (let i = 0; i < 33; i++) {
      let _max = arr2[0][i],
        _min = arr2[0][i];
      for (let j = 0; j < 4; j++) {
        _max = Math.max(_max, arr2[j][i]);
        _min = Math.min(_min, arr2[j][i]);
      }
      let divide = _max - _min;
      // console.log(divide);
      for (let j = 0; j < 4; j++) {
        arr2[j][i] = (arr2[j][i] - _min) / divide;
      }
    }
    console.log(arr2);
    let arrEnd = new Array(4);
    for (let i = 0; i < 4; i++) {
      let sum = 0;
      for (let j = 0; j < 33; j++) {
        sum += arr2[i][j];
      }
      arrEnd[i] = sum;
    }
    for (let i = 0; i < 4; i++) {
      arrEnd[i] = 1 - (arrEnd[i] / 33);
    }
    console.log(arrEnd);
    let _max = arrEnd[0],
      index = 0;
    for (let i = 1; i < 4; i++) {
      if (arrEnd[i] > _max) {
        _max = arrEnd[i];
        index = i;
      }
    }
    let level = "";
    if (index == 0) {
      level = "不合格"
    } else if (index == 1) {
      level = "合格"
    } else if (index == 2) {
      level = "良好"
    } else {
      level = "优秀"
    }
    db.collection('fitResult').where({
      labId: event.labId,
    }).update({
      data: {
        labId: event.labId,
        data: arrEnd,
        level: level
      }
    })
    return {
      msg: "ok",
      data: arrEnd
    };
  })
}