// pages/addLab/addLab.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labId:""
  },
  in(e){
    this.setData({
      labId:e.detail.value
    })
  },
  add(){
    let that=this
    wx.showModal({
      title: '删除该实验室？',
      // content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('quit group confirm')
          db.collection('lab').where({
            labId:that.data.labId
          }).remove({
            success: function(res) {
              console.log(res.data)
            }
          })
          db.collection('result').where({
            labId:that.data.labId
          }).remove({
            success: function(res) {
              console.log(res.data)
            }
          })
          db.collection('fitResult').where({
            labId:that.data.labId
          }).remove({
            success: function(res) {
              console.log(res.data)
              wx.showToast({
                title: '删除成功',
                duration: 1000,
                success: function () {
                  setTimeout(function () {
                    wx.switchTab({
                      url: '/pages/home/home',
                    })
                  }, 1000);
                }
              })
            }
          })
        }
      }
    })



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