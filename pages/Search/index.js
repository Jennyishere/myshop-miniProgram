// pages/Search/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    searchResult:[],
    isLoading: false,
    history:[]
  },
  handleInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
    if (this.data.inputValue == false) return;
    this.getResult();

  },
  // 处理失焦事件
  handleBlur(){
    // 将搜索结果清空
    this.setData({
      searchResult:[]
    })
  },
  // 处理回车事件 ： 1将搜索词存到本地 去重 2.跳转搜索列表
  handleConfirm(e){
    let {history} = this.data
    history.unshift(this.data.inputValue)
    // 去重
    history = [...new Set(history)]
    this.setData({
      history
    })
    wx.setStorageSync('history', history)
    // 跳转
    wx.redirectTo({
      url: '/pages/goods_list/index?query='+this.data.inputValue,
    })
  },
  getResult() {
    // 请求前先确定isLoading是否为false，为false就请求 并把它打开
    if(this.data.isLoading===false) {
      this.setData({
        isLoading:true
      })
      request({
        url: '/goods/qsearch',
        data: {
          query: this.data.inputValue
        }
      }).then(res => {
        console.log(res);
        this.setData({
          // 请求成功后把isLoading重置为false
          isLoading:false,
          searchResult:res.data.message
        })
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// 进来把搜索历史展示
let arr = wx.getStorageSync('history') || [];
this.setData({
  history:arr
})
  },

  onShow: function () {

  }
})