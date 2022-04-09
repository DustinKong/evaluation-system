// pages/setting/setting.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: false
  },
  listenerSwitch: function (e) {
    console.log('switch类型开关当前状态-----', e.detail.value);
    this.setData({
      type: e.detail.value
    })
  },
  save() {
    console.log('save')
    let that = this
    db.collection('user').where({
      _openid: wx.getStorageSync('openId')
    }).update({
      data: {
        type: that.data.type == false ? 1 : 2
      },
      success: function (res) {
        wx.showToast({ 
          title: '提交成功',
           duration: 1000,
           success: function() { 
            setTimeout(function() { 
              wx.switchTab({
                url: '/pages/home/home',
              })
            }, 1000); 
          }
        })
        console.log(res.data)
      },
      fail:function(res){
        console.log(res)
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    db.collection('user').where({
      _openid:wx.getStorageSync('openId')
    }).get({
      success:function(res){
        // console.log(res.data)
        that.setData({
          type:res.data[0].type==2?true:false
        })
        wx.setStorageSync('type', res.data[0].type)
      }
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