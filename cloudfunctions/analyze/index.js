// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.labId)
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
    // 获取Xij
    for (let i = 0; i < 33; i++) {
      let _max = arr[0][i],
        _min = arr[0][i];
      for (let j = 0; j < size; j++) {
        _max = Math.max(_max, arr[j][i]);
        _min = Math.min(_min, arr[j][i]);
      }
      let divide = _max - _min;
      // console.log(divide);
      for (let j = 0; j < size; j++) {
        arr[j][i] = (arr[j][i] - _min) / divide;
      }
    }
    console.log(arr);
    //获取Fij
    for (let i = 0; i < 33; i++) {
      let sum = size;
      for (let j = 0; j < size; j++) {
        sum += arr[j][i];
      }
      for (let j = 0; j < size; j++) {
        arr[j][i] = (1 + arr[j][i]) / sum;
      }
    }
    console.log(arr);
    //获取Eij
    let arrE = new Array(33);
    for (let i = 0; i < 33; i++) {
      let sum = 0;
      for (let j = 0; j < size; j++) {
        sum += ((arr[j][i]) * Math.log(arr[j][i]) / Math.log(size));
      }
      arrE[i] = sum;
    }
    console.log(arrE);
    //获取Wij
    let tmpSum = 0;
    for (let i = 0; i < 33; i++) {
      tmpSum += (1 - arrE[i]);
    }
    for (let i = 0; i < 33; i++) {
      arrE[i] = (1 - arrE[i]) / tmpSum;
    }
    console.log(arrE);
    db.collection('result').add({
      data:{
        labId:event.labId,
        data:arrE
      }
    })
    return {
      msg: "ok",
      data: arrE
    };
  })
}