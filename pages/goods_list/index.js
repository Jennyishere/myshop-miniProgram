// pages/goods_list/index.js

import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 0,
        value: "销量",
        isActive: false
      },
      {
        id: 0,
        value: "价格",
        isActive: false
      }
    ],
    goodList: []
  },
  // 请求参数 放在全局变量里
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 把总页数算好存在这里
  totalPages: '',
  // page事件写在于data同级里
  hadletabItemChange(e) {
    // console.log(e);
    // 拿到index去修改isActive的值
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  // 获取数据的方法
  getGoodsList() {
    // 发请求 先判断 如果没有更多数据就不再请求
    // if(this.queryParams.pagenum >= this.totalPages) return;
    request({
      url: '/goods/search',
      data: this.queryParams
    }).then(res => {
      // console.log(res);
      let { goods } = res.data.message
      const { total } = res.data.message;
      this.totalPages = Math.ceil(total / this.queryParams.pagesize);
      // 把价格加上小数点
      goods.forEach(v=> {
        v.goods_price = Number(v.goods_price).toFixed(2)
        return v;
      })
      this.setData({
        // 把获取的拼在一起 而不是直接赋值
        goodList: [...this.data.goodList, ...goods]
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.queryParams.query = options.query;
    this.getGoodsList();
  },
  /**
    * 页面上拉触底事件的处理函数
    * // 用户上划页面 滚动条触底 开始加载下一页数据
 // 1.找到触底事件
 // 2.判断有没有下一页的数据
 // 3.没有下一页 弹出提示，有下一页，就加载下一页的数据
    */
  onReachBottom: function () {
    // 2.判断有没有下一页的数据 用总条数/每页条数
    if (this.queryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页数据了'
      })
    } else {
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * 1 触发下拉事件
   * 2 重置数据数组
   * 3 重置页码为1  发送请求重新请求数据
   */
  onPullDownRefresh: function () {
    // 重置
    this.setData({
      goodList: []
    })
    this.queryParams.pagenum = 1;
    // 再次请求
    this.getGoodsList()
    // 加载完收起
    wx.stopPullDownRefresh()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})