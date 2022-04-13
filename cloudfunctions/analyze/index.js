// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const _ = db.command;
var labId;
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.labId)
  labId = event.labId;
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
    // 计算一级指标
    let arrSum = new Array(8);
    let sum = 0;
    for (let i = 0; i < 6; i++) {
      sum += arrE[i];
    }
    arrSum[0] = sum;
    sum = 0;
    for (let i = 6; i < 10; i++) {
      sum += arrE[i];
    }
    arrSum[1] = sum;
    sum = 0;
    for (let i = 10; i < 15; i++) {
      sum += arrE[i];
    }
    arrSum[2] = sum;
    sum = 0;
    for (let i = 15; i < 20; i++) {
      sum += arrE[i];
    }
    arrSum[3] = sum;
    sum = 0;
    for (let i = 20; i < 24; i++) {
      sum += arrE[i];
    }
    arrSum[4] = sum;
    sum = 0;
    for (let i = 24; i < 27; i++) {
      sum += arrE[i];
    }
    arrSum[5] = sum;
    sum = 0;
    for (let i = 27; i < 31; i++) {
      sum += arrE[i];
    }
    arrSum[6] = sum;
    sum = 0;
    for (let i = 31; i < 33; i++) {
      sum += arrE[i];
    }
    arrSum[7] = sum;
    console.log("event");
    console.log(labId);
    var date = new Date();

    db.collection('result').where({
      labId: labId,
    }).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      if (!res.data.length) {
        console.log("new lab");
        db.collection('result').add({
          data: {
            labId: labId,
            data: arrE,
            arrSum: arrSum,
            date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
          }
        })
      } else {
        console.log("已有")
        db.collection('result').where({
          labId: labId,
        }).update({
          data: {
            labId: labId,
            data: arrE,
            arrSum: arrSum,
            date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
          }
        })
      }
    })



    // ({
    //   success: function (res) {
    //     console.log("test");
    //     // res.data 包含该记录的数据
    //     console.log(res.data)
    //     if (!res.data.length) {
    //       console.log("new lab");
    //       db.collection('result').add({
    //         data:{
    //           labId: labId,
    //           data: arrE,
    //           arrSum:arrSum,
    //           date:date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
    //         }
    //       })
    //     }
    //     else{
    //       console.log("已有")
    //       db.collection('result').where({
    //         labId: labId,
    //       }).update({
    //         data:{
    //           labId: labId,
    //           data: arrE,
    //           arrSum:arrSum,
    //           date:date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
    //         }
    //       })
    //     }
    //   }
    // })




    return {
      msg: "ok",
      data: arrE
    };
  })
}