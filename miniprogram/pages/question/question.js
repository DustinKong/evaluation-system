// pages/question/question.js
const db = wx.cloud.database();
const _ = db.command;
const times=5
Page({

  /**
   * 页面的初始数据
   */

  data: {
    answer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    nickName: '',
    showList: [{
      title: '建设规划（百分制)'
    }, ]
  },
  getinput(e) {
    let id = e.target.dataset.id;
    this.setData({
      ["answer[" + id + "]"]: e.detail.value
    })
  },
  commit() {
    let that = this;
    // db.collection('data').where({
    //   labId: "0"
    // }).update({
    //   data: {
    //     type0: _.push(that.data.answer)
    //   },
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })

    for(let i=0;i<times;i++){
      setTimeout(() => {
        let answer = that.data.answer;
        for (let i = 0; i < 33; i++) {
          answer[i] = Math.floor(Math.random() * 40 + 35)
        }
        wx.cloud.callFunction({
          // 云函数名称
          name: 'addData',
          // 传给云函数的参数
          data: {
            id: that.data.labId,
            name: that.data.nickName,
            answer: answer,
          },
          success: function (res) {
            console.log(res);
            wx.showToast({ 
              title: '提交成功',
               duration: 2000,
               success: function() { 
                setTimeout(function() { 
                  wx.navigateBack({
                    delta: 1,
                  })
                }, 2000); 
              }
            })
          },
          fail: console.error
        })
      }, 120);
    }


  },

  // bindblurAnswerOfSAQ: function (input) {
  //   var tempIndex = input.currentTarget.dataset.id;
  //   var tempArray = this.data.answers;
  //   let answer = {
  //     data: "",
  //     queId: -1,
  //   };
  //   answer.data = input.detail.value;
  //   answer.queId = this.data.xsquestions[tempIndex].queId;
  //   tempArray[tempIndex] = answer;
  //   this.setData({
  //     answers: tempArray,
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      labId:options.id,
      nickName: wx.getStorageSync('userInfo').nickName
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})