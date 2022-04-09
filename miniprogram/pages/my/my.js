// pages/my/my.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: "",
    userInfo: {},
    state: 0,
  },

  getOpenId() {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getOpenId'
      }
    }).then((resp) => {
      this.setData({
        haveGetOpenId: true,
        openId: resp.result.openid,
        state: 1
      });
      wx.setStorageSync("openId", resp.result.openid);

      db.collection('user').where({
        _openid: resp.result.openid
      }).get({
        success: function (res) {
          // res.data 包含该记录的数据
          console.log(res.data)
          if (!res.data.length) {
            console.log('新用户');
            db.collection('user').add({
              data: {
                type: 0
              }
            }).then(res => {
              console.log(res)
            })
          }
        }

      })
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1000 //持续的时间
      })
      wx.hideLoading();
    }).catch((e) => {
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    console.log("userInfo")
    var that = this
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          state: 2
        })
        wx.setStorageSync("userInfo", res.userInfo);
        db.collection('user').where({
          _openid: that.data.openId
        }).update({
          data: {
            avatarUrl: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName,
          },
          success: function (res) {
            console.log(res.data)

          }
        })
      }
    })
  },
  gosetting(){
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openId: wx.getStorageSync('openId') ?? "",
      userInfo: wx.getStorageSync('userInfo') ?? {}
    })
    if (this.data.openId) {
      this.setData({
        state: 1
      })
    }
    if (this.data.userInfo && this.data.openId != "") {
      this.setData({
        state: 2
      })
    }

  },
  goabout() {
    wx.navigateTo({
      url: '/pages/my_about/my_about',
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