// pages/report/report.js
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },

  reReport(){
    console.log('reReport')
    this.analyze1();
    this.analyze2();
  },
  //生成33*1
  analyze1(){
    console.log('analyze1')
    let that=this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'analyze',
      // 传给云函数的参数
      data: {
        labId: that.data.id,
      },
      success: function (res) {
        console.log(res);
        // wx.showToast({ 
        //   title: '提交成功',
        //    duration: 2000,
        //    success: function() { 
        //     setTimeout(function() { 
        //       wx.navigateBack({
        //         delta: 1,
        //       })
        //     }, 2000); 
        //   }
        // })
      },
      fail: console.error
    })
  },
  // 生成4*1
  analyze2(){
    console.log('analyze2')
    let that=this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'analyzeSum',
      // 传给云函数的参数
      data: {
        labId: that.data.id,
      },
      success: function (res) {
        console.log(res);
        // wx.showToast({ 
        //   title: '提交成功',
        //    duration: 2000,
        //    success: function() { 
        //     setTimeout(function() { 
        //       wx.navigateBack({
        //         delta: 1,
        //       })
        //     }, 2000); 
        //   }
        // })
      },
      fail: console.error
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