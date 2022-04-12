// pages/chooseLab/chooseLab.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"",
    Lab:[
      {
        "title":"跨学科学术组织A",
        "id":"1"
      },
      {
        "title":"跨学科学术组织B",
        "id":"2"
      },
      {
        "title":"跨学科学术组织C",
        "id":"3"
      },
      {
        "title":"跨学科学术组织D",
        "id":"4"
      },
      {
        "title":"跨学科学术组织E",
        "id":"5"
      },
    ]
  },
  go(e){
    if(this.data.type=="1")
    wx.navigateTo({
      url: '/pages/question/question?id='+e.currentTarget.dataset.id,
    })
    else{
      wx.navigateTo({
        url: '/pages/report/report?id='+e.currentTarget.dataset.id,
      })
    }
  },
  goSum(){
    wx.navigateTo({
      url: '/pages/sum/sum',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type
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