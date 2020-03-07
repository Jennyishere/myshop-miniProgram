//app.js
import request from '/utils/request.js'
App({
  onLaunch: function () {
    request.defaults.baseURL = "https://api-hmugo-web.itheima.net/api/public/v1";
  },
  onShow(){
     // 获取购物车列表
 const cart = wx.getStorageSync('cart') || []
 if(cart.length > 0) {
   wx.setTabBarBadge({
     index: 2,
     text: cart.length + "",
   })
  }
  },
  globalData: {
    userInfo: null
  }
})