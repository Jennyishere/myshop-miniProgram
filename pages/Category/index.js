import request from '../../utils/request'
// pages/Category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftCateList: [],
    rightCateList: [],
    cates: [],
    currentIndex: 0
  },
  // 处理点击事件
  handleTap(e) {
    const { index } = e.currentTarget.dataset;
    // 右边的数据跟着更新
    let rightCateList = this.data.cates[index].children
    this.setData({
      currentIndex: index,
      rightCateList
    })
  },
  // 获取数据
  getData() {
    request({
      url: "/categories"
    }).then(res => {
      console.log(res);
      const { message } = res.data
      // 将获取的数据存到本地
      wx.setStorageSync('cates', { time: Date.now(), data: message })
      let leftCateList = message.map(v => v.cat_name) //放在一行 可以把return省略
      let rightCateList = message[0].children
      this.setData({
        cates: message,
        leftCateList,
        rightCateList
      })

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1先判断本地储存里是否有数据
    // 2没有数据直接发请求
    // 3有数据，判断是否过期，过期重新请求，没过期拿出来使用
    const Cates = wx.getStorageSync("cates")
    if (!Cates) {
      this.getData()
    } else {
      // 如果过期
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getData()
      } else {
        console.log("可以使用本地数据");
        let leftCateList = Cates.data.map(v => v.cat_name) //放在一行 可以把return省略
        let rightCateList = Cates.data[0].children
        this.setData({
          cates: Cates,
          leftCateList,
          rightCateList
        })
      }
    }
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