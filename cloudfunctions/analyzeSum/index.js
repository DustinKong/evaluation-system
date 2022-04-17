// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
var labId;

const MAX_LIMIT = 100
exports.main = async (event, context) => {
  labId=event.labId
  //先取出集合记录总数
  const countResult = await db.collection('data').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('data').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
      labId: event.labId
    }).get()
    tasks.push(promise)
  }

  // 等待所有
  let tmpSumArr= (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
  //console.log(tmpSumArr);
  let arr = new Array();
    for (let item of tmpSumArr.data) {
      // console.log(item);
      arr.push(item.answer);
    }
    // console.log(arr);
    let size = tmpSumArr.data.length;
    let arrAva = new Array(33);
    for (let i = 0; i < 33; i++) {
      let sum = 0;
      for (let j = 0; j < size; j++) {
        sum += arr[j][i];
      }
      arrAva[i] = sum / size;
    }
    //console.log(arrAva); //1*33
    let arrStand = [50, 60, 80, 90];

    let arr2 = new Array(); //4*32维度
    for (let i = 0; i < 4; i++) {
      let tmpArr = new Array(33);
      for (let j = 0; j < 33; j++) {
        tmpArr[j] = Math.abs(arrAva[j] - arrStand[i]);
      }
      arr2.push(tmpArr);
    }
    //console.log(arr2);
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
    //console.log(arr2);
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
    //console.log(arrEnd);
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
    var date = new Date();

    db.collection('fitResult').where({
      labId: labId,
    }).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      if (!res.data.length) {
        console.log("new lab");
        db.collection('fitResult').add({
          data: {
            labId: labId,
            data: arrEnd,
            level: level,
            date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
          }
        })
      } else {
        console.log("already have")
        db.collection('fitResult').where({
          labId: labId,
        }).update({
          data: {
            labId: labId,
            data: arrEnd,
            level: level,
            date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
          }
        })
      }
    })

    return {
      msg: "ok",
      data: arrEnd
    };
}


// old 云函数入口函数
// exports.main = async (event, context) => {
//   labId = event.labId;
//   return await db.collection('data').where({
//     labId: event.labId
//   }).get().then(res => {
//     let arr = new Array();
//     for (let item of res.data) {
//       //console.log(item);
//       arr.push(item.answer);
//     }
//     // console.log(arr);
//     let size = res.data.length;
//     let arrAva = new Array(33);
//     for (let i = 0; i < 33; i++) {
//       let sum = 0;
//       for (let j = 0; j < size; j++) {
//         sum += arr[j][i];
//       }
//       arrAva[i] = sum / size;
//     }
//     console.log(arrAva); //1*33
//     let arrStand = [50, 60, 80, 90];

//     let arr2 = new Array(); //4*32维度
//     for (let i = 0; i < 4; i++) {
//       let tmpArr = new Array(33);
//       for (let j = 0; j < 33; j++) {
//         tmpArr[j] = Math.abs(arrAva[j] - arrStand[i]);
//       }
//       arr2.push(tmpArr);
//     }
//     console.log(arr2);
//     //获取Xij
//     for (let i = 0; i < 33; i++) {
//       let _max = arr2[0][i],
//         _min = arr2[0][i];
//       for (let j = 0; j < 4; j++) {
//         _max = Math.max(_max, arr2[j][i]);
//         _min = Math.min(_min, arr2[j][i]);
//       }
//       let divide = _max - _min;
//       // console.log(divide);
//       for (let j = 0; j < 4; j++) {
//         arr2[j][i] = (arr2[j][i] - _min) / divide;
//       }
//     }
//     console.log(arr2);
//     let arrEnd = new Array(4);
//     for (let i = 0; i < 4; i++) {
//       let sum = 0;
//       for (let j = 0; j < 33; j++) {
//         sum += arr2[i][j];
//       }
//       arrEnd[i] = sum;
//     }
//     for (let i = 0; i < 4; i++) {
//       arrEnd[i] = 1 - (arrEnd[i] / 33);
//     }
//     console.log(arrEnd);
//     let _max = arrEnd[0],
//       index = 0;
//     for (let i = 1; i < 4; i++) {
//       if (arrEnd[i] > _max) {
//         _max = arrEnd[i];
//         index = i;
//       }
//     }
//     let level = "";
//     if (index == 0) {
//       level = "不合格"
//     } else if (index == 1) {
//       level = "合格"
//     } else if (index == 2) {
//       level = "良好"
//     } else {
//       level = "优秀"
//     }
//     var date = new Date();

//     db.collection('fitResult').where({
//       labId: labId,
//     }).get().then(res => {
//       // res.data 包含该记录的数据
//       console.log(res.data)
//       if (!res.data.length) {
//         console.log("new lab");
//         db.collection('fitResult').add({
//           data: {
//             labId: labId,
//             data: arrEnd,
//             level: level,
//             date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
//           }
//         })
//       } else {
//         console.log("已有")
//         db.collection('fitResult').where({
//           labId: labId,
//         }).update({
//           data: {
//             labId: labId,
//             data: arrEnd,
//             level: level,
//             date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
//           }
//         })
//       }
//     })


//     db.collection('fitResult').where({
//       labId: labId,
//     }).get({
//       success: function (res) {
//         // res.data 包含该记录的数据
//         console.log(res.data)
//         if (!res.data) {
//           console.log("new lab");
//           db.collection('fitResult').add({
//             data: {
//               labId: labId,
//               data: arrEnd,
//               level: level,
//               date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
//             }
//           })
//         }
//       }
//     })
//     return {
//       msg: "ok",
//       data: arrEnd
//     };
//   })
// }