// pages/report/report.js
const db = wx.cloud.database();
import * as echarts from '../../ec-canvas/echarts' // 这个是自己实际的目录
var chart1 = null
var chart2 = null
var chart3 = null
const explains = [
  "建设规划（百分制）",
  "制度建设（百分制）",
  "管理机构（百分制）",
  "管理手段（百分制）",
  "科研氛围（百分制）",
  "基本信息的收集整理（百分制）",
  "跨学科学术交流（百分制）",
  "跨学科特色（百分制）",
  "理论实践结合度（%）",
  "综合教学指导（百分制）",
  "人员数量（人）",
  "职称结构（%）",
  "学缘结构（%）",
  "素质结构（%）",
  "研究分组（个）",
  "跨学科实践能力（百分制）",
  "跨学科融合能力（百分制）",
  "跨学科科研能力 （百分制） ",
  "团队协作能力（百分制）",
  "研究人员平均考核（百分制）",
  "成果质量（百分制）",
  "成果交叉程度（%）",
  "专利积分（百分制）",
  "科研论文积分（百分制）",
  "社会影响力（百分制）",
  "学术成果实际应用性（百分制）",
  "学术界影响力（百分制）",
  "参与学科竞赛人次（人）",
  "学科竞赛级别（百分制）",
  "参与学科竞赛数量（个）",
  "学科竞赛成果（百分制）",
  "跨学科创新性（百分制）",
  "其他创新水平（个）"
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: {},
    fitResult: {},
    ec1: {
      onInit: function (canvas, width, height) {
        chart1 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart1);
        return chart1;
      }
    },
    ec2: {
      onInit: function (canvas, width, height) {
        chart2 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart2);
        return chart2;
      }
    },
    ec3: {
      onInit: function (canvas, width, height) {
        chart3 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart3);
        return chart3;
      }
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    let alpha = String.fromCharCode('A'.charCodeAt(0) + parseInt(options.id - 1))
    this.setData({
      id: options.id,
      alpha: alpha
    })
    console.log(that.data.id)
    db.collection('result').where({
      labId: that.data.id
    }).get({
      success: function (res) {
        // res.data 包含该记录的数据
        console.log(res);
        let tmpData = res.data[0];
        that.setData({
          result: res.data[0]
        })
        let lastArr=[]
        for(let i=0;i<33;i++){
          let xx={};
          xx.name=explains[i];
          xx.data=(res.data[0].data[i]*10).toFixed(5);;
          lastArr.push(xx);
        }
        that.setData({
          lastArr:lastArr
        })
        chart2.setOption({
          title: {
            text: "2、一级指标权重值",
            textStyle: {
              color: '#333',
              fontWeight: 'bold',
              fontSize: 14,
            }
          },
          tooltip: {
            trigger: 'axis',
            confine: true, // 加入这一句话
          },
          legend: {
            data: [alpha, ],
            right: 20,
          },

          xAxis: {
            type: 'category',
            data: ['规划与管理', '学科联合培养', '组织成员', '人才培养', '科研成果', '学术影响力', '学科竞赛', '创新水平'],
            axisLabel: {
              interval: 0,
              rotate: 40
            },
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: alpha,
            data: res.data[0].arrSum,
            type: 'line',
            smooth: true
          }]
        })
        let tmp = new Array(33);
        for (let i = 1; i <= 33; i++) {
          tmp[i - 1] = i;
        }
        console.log(tmp)
        chart3.setOption({
          title: {
            text: "3、学术组织综合得分",
            textStyle: {
              color: '#333',
              fontWeight: 'bold',
              fontSize: 14,
            }
          },
          tooltip: {
            trigger: 'axis',
            confine: true, // 加入这一句话
          },
          legend: {
            data: [alpha, ],
            right: 20,
          },
          xAxis: {
            type: 'category',
            data: tmp,

          },
          yAxis: {
            type: 'value',
            min: 0.030296,
            max: 0.030307
          },
          series: [{
            name: alpha,
            data: res.data[0].data,
            type: 'line',
            smooth: true
          }]
        })
        wx.hideLoading()
      }
    })
    db.collection('fitResult').where({
      labId: that.data.id
    }).get({
      success: function (res) {
        // res.data 包含该记录的数据
        console.log(res)
        that.setData({
          fitResult: res.data[0]
        })
        chart1.setOption({
          title: {
            text: "1、学术组织与各等圾贴近度",
            textStyle: {
              color: '#333',
              fontWeight: 'bold',
              fontSize: 14,
            }
          },
          tooltip: {
            trigger: 'axis',
            confine: true, // 加入这一句话
          },
          legend: {
            data: [alpha],
            right: 20,
          },
          xAxis: {
            type: 'category',
            data: ['不合格', '合格', '良好', '优秀']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: alpha,
            data: res.data[0].data,
            type: 'line',
            smooth: true
          }]
        })
      }
    })
  },

  reReport() {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    console.log('reReport')
    this.analyze1();
    this.analyze2();
    setTimeout(function () {
      that.onLoad({
        "id": that.data.id
      });
      wx.hideLoading();
    }, 2000);
  },
  //生成33*1
  analyze1() {
    console.log('analyze1')
    let that = this
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
  analyze2() {
    console.log('analyze2')
    let that = this
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