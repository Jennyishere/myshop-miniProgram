// pages/Cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {}
  },
  // 点击获取地址
  handleChooseAddress() {

    wx.getSetting({
      success: (res) => {
        console.log(res);
        const scopeAddress = res.authSetting['scope.address'];
        if (scopeAddress === false) {
          // false说明点击了取消 则需要引导用户再次打开设置
          wx.openSetting({
            success: (res) => {
              console.log(res);
            },
          })
        }
        // 点过或者从未点开过 
        wx.chooseAddress({
          success: (res => {
            // 把地址存在本地
            res.all = res.provinceName+res.cityName+res.countyName+res.detailInfo
            wx.setStorageSync('address', res)
          })
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function (options) {
    const address = wx.getStorageSync('address')
    this.setData({
      address
    })
  },
})