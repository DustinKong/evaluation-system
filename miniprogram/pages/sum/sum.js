const db = wx.cloud.database();
import * as echarts from '../../ec-canvas/echarts' // 这个是自己实际的目录

var chart1 = null
var chart2 = null
var chart3 = null

Page({
  data: {
    fit: [],
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
    constants: [{
        "id": "1",
        "ids": "id1",
        "name": "序言",
        "category": [{
            "category_id": 1,
            "type": 1,
            "category_name": "该报告收集所有参评专家与实验室内部人员填写的数据对参评实验室进行评估，分析报告正文共分四章，第一章分析实验室总体水平以及各指标间均衡性；第二章分别分析八个一级指标以及下设二级指标和部分重要数据项；第三章通过比较各个实验室评估结果和整体水平，分析该实验室建设状况；第四章对报告内容进行简单总结。在查看本报告的过程中，应注意以下几点：",

          },
          {
            "category_id": 2,
            "type": 1,
            "category_name": "1、 本报告中，“同类型实验室”指的是所有参评的实验室中属于同一研究类别的实验室，并不单指一个实验室的名字。例如金融类实验室指所有研究内容为金融相关的那些实验室，它们共同属于金融类实验室。",

          },
          {
            "category_id": 3,
            "type": 1,
            "category_name": "2、 本报告中，所有“位次”均针对具体指标或者数据项，不针对实验室整体水平，在计算位次时，报告中的“某实验室位次”是指在参评实验室中的位次。",

          },
          {
            "category_id": 4,
            "type": 1,
            "category_name": "3、 本报告中，“等级”是指根据“实验室总体指标”得分与标准表进行比对之后的结果。共分为四档：优秀、良好、合格、不合格",

          },
          {
            "category_id": 5,
            "type": 1,
            "category_name": "最后，感谢您对我们的支持和信任，由于分析所用数据和水平所限，本报告仅供参考，若有任何意见与建议，欢迎与我们联系。",
          },
        ],
      },
      {
        "id": "2",
        "ids": "id2",
        "name": "第一章 实验室总体情况",
        "category": [{
            "category_id": 6,
            "type": 1,
            "category_name": "实验室总体水平由括规划与管理、实验教学、仪器设备、实验队伍、环境与安全、科研与社会服务、学科竞赛、特色与创新 8 个一级指标按指标权重计算得出，五类实验室等级和各一级指标位次见下表。",
          },
          {
            "category_id": 5,
            "type": 2,
            "head": ["实验室类别", "等级"],
            "listData": "",
          },
          {
            "category_id": 6,
            "type": 3,
            "option": "",

          },
        ]
      },

      {
        "id": "3",
        "ids": "id3",
        "name": "第二章 指标具体情况",
        "category": [{
            "category_id": 7,
            "type": 1,
            "category_name": "在该分析报告中，此次评估共设置规划与管理、实验教学、仪器设备、实验队伍、环境与安全、科研与社会服务、学科竞赛、特色与创新 8 个一级指标，同时总共下设32个二级指标，下面对各项指标进行展示分析。",
          },
          {
            "category_id": 8,
            "type": 1,
            "category_name": "通过计算比较，不同指标所占权重并不相同，在这次评估中，综合参与评估的实验室情况，八个一级指标各自所占据的权重值如下图所示。",
          },
          {
            "category_id": 9,
            "type": 3,
            "option": "",
          },
        ]
      },

      {
        "id": "4",
        "ids": "id4",
        "name": "第三章 实验室具体状况",
        "category": [{
            "category_id": 14,
            "type": 1,
            "category_name": "通过第二章的图表们，可以粗略看出实验室之间的差距，但是每个实验室的具体实力和情况还需要更进一步的计算分析，本章就对单个实验室的详细情况进行展示。",
          },
          {
            "category_id": 15,
            "type": 1,
            "category_name": "为了消除不同指标评估时产生的差异，并且更方便后续对数据的处理，我们将数据进行标准化处理，并且建立在五个实验室相互比较的基础上，处理之后的数据能够忽略指标单位以及主观因素上的影响，让数据处于同一个标准下，更方便比较。如下图是金融实验室数据初始值以及标准化之后的数值，可以发现标准化之后所有数值都模糊了属性，可以进行纯粹的数值比较，其他实验室处理方式相同。",
          },
          {
            "category_id": 16,
            "type": 4,
            "head": ["指标名称", "初始值", "标准化值"],
            "listData": "",
          },
          {
            "category_id": 17,
            "type": 1,
            "category_name": "如上，标准化之后的值能够将五个实验室放在同一个水平线上进行比较，后期将数据差值根据权重进行计算，算出每个实验室与最低标准的差距，即数值越大则超过标准越高。详细见下图",
          },
          {
            "category_id": 18,
            "type": 3,
            "option": "",
          },
        ]
      },
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection("fitResult").get({
      success: function (res) {
        console.log(res);
        let tmp = res.data;
        for (let i of tmp) {
          i.alpha = String.fromCharCode('A'.charCodeAt(0) + parseInt(i.labId - 1))
        }
        that.setData({
          fit: res.data
        })
        let ser = [];
        let name=[];
        for (let i of tmp) {
          let t = {};
          t.name = i.alpha;
          t.type = "line";
          t.smooth = true;
          t.data = i.data
          ser.push(t);
          name.push(i.alpha)
        }
        console.log(ser)
        chart1.setOption({
          title: {
            text: "实验室与各等级贴合度",
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
            data: name,
            right: 20,
            top: 20
          },

          xAxis: {
            type: 'category',
            data: ['不合格', '合格', '良好', '优秀'],
          
          },
          yAxis: {
            type: 'value'
          },
          series: ser
        })
      }
    })
    db.collection("result").get({
      success:function(res){
        console.log(res.data);

        let tmp=res.data;
        let ser = [];
        let name=[];
        for(let i of tmp){

          i.alpha = String.fromCharCode('A'.charCodeAt(0) + parseInt(i.labId - 1))
          let t = {};
          t.name = i.alpha;
          t.type = "line";
          t.smooth = true;
          t.data = i.data
          ser.push(t);
          name.push(i.alpha)
        }
        chart1.setOption({
          title: {
            text: "实验室与各等级贴合度",
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
            data: name,
            right: 20,
            top: 20
          },

          xAxis: {
            type: 'category',
            data: ['不合格', '合格', '良好', '优秀'],
          
          },
          yAxis: {
            type: 'value'
          },
          series: ser
        })       
        let tmp2 = new Array(33);
        for (let i = 1; i <= 33; i++) {
          tmp2[i - 1] = i;
        }
         chart2.setOption({
          title: {
            text: "实验室各项指标",
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
            data: name,
            right: 20,
            top: 20
          },

          xAxis: {
            type: 'category',
            data: tmp2,
          
          },
          yAxis: {
            type: 'value',
            min: 0.030296,
            max: 0.030307
          },
          series: ser
        })
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