// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{
      'id': 0,
      'url': '/images/swiper1.png'
    }, {
      'id': 1,
      'url': '/images/swiper2.png'
    }, {
      'id': 2,
      'url': '/images/swiper3.png'
    }]
  },
  go() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  go1() {
    if(!this.judge())
      return;
    wx.navigateTo({
      url: '/pages/question/question',
    })
  },
  go2() {
    if(!this.judge())
    return;
    wx.navigateTo({
      url: '/pages/report/report',
    })
  },
  judge() {
    let type = wx.getStorageSync('type')
    if (type == 0 || type == null) {
      wx.showToast({
        title: '请先设置人员属性',
        icon: 'none',
        duration: 2000,
        success: function () {
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/setting/setting',
            })
          }, 2000);
        }
      })
      return false;
    }
    return true;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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