// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    swiperList: [{
      'id': 0,
      'url': 'https://636c-cloud1-9gw00z6jf0901e86-1310404954.tcb.qcloud.la/swiper3.png?sign=f95a591353811bca1f7acaf2ec9c7c3b&t=1649771266'
    }, {
      'id': 1,
      'url': 'https://636c-cloud1-9gw00z6jf0901e86-1310404954.tcb.qcloud.la/swiper2.png?sign=3c337f6282ed67a45b46a26433ebe8fb&t=1649771312'
    }, {
      'id': 2,
      'url': 'https://636c-cloud1-9gw00z6jf0901e86-1310404954.tcb.qcloud.la/swiper1.png?sign=301e39e9ea0fde675ed3ebc12642387a&t=1649771324'
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
      url: '/pages/chooseLab/chooseLab?type=1',
    })
  },
  go2() {
    if(!this.judge())
    return;
    wx.navigateTo({
      url: '/pages/pre/pre',
    })
  },
  go3() {
    if(!this.judge())
    return;
    wx.navigateTo({
      url: '/pages/addLab/addLab',
    })
  },
  judge() {
    let info=wx.getStorageSync('userInfo');
    if ( info == null) {
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
        duration: 1000,
        success: function () {
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }, 1000);
        }
      })
      return false;
    }

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
    this.setData({
      type:wx.getStorageSync('type')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      type:wx.getStorageSync('type')
    })
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