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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url: "/categories"
    }).then(res => {
      console.log(res);
      const { message } = res.data
      let leftCateList = message.map(v => v.cat_name) //放在一行 可以把return省略
      let rightCateList = message[0].children
      this.setData({
        cates: message,
        leftCateList,
        rightCateList
      })
      console.log(this.data.cates);

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