// pages/report/report.js
const db = wx.cloud.database();
import * as echarts from '../../ec-canvas/echarts' // 这个是自己实际的目录
function initChart(canvas, width, height, dpr) { // 这部分是固定的不需要 是通用的
  const chart = echarts.init(canvas, null, {
    width: 400,
    height: 200
  });
  canvas.setChart(chart);
  // 这是 唯一需要更改的，可根据实际情况api更改图标
  // 我这边测试的是一个 普通的折线图,案例网址:
  var option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};

  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:{},
    fitResult:{},
    ec: {
      onInit: initChart
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    this.setData({
      id:options.id
    })
    console.log(that.data.id)
    db.collection('result').where({
      labId:that.data.id
    }).get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log(res);
        that.setData({
          result:res.data[0]
        })
      }
    })
    db.collection('fitResult').get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log(res)
        that.setData({
          fitResult:res.data[0]
        })
      }
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