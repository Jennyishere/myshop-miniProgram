// pages/Cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
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
            res.all = res.provinceName + res.cityName + res.countyName + res.detailInfo
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
  // 获取地址
  // 2 获取缓存中的购物车列表
  onShow: function (options) {
    const address = wx.getStorageSync('address')
    // 获取购物车列表
    const cart = wx.getStorageSync('cart') || []
    // 空数组的every返回的是true
    // const allChecked = cart.length? cart.every(v=>v.checked):false;
    this.setData({ address })
    this.setCart(cart)
  },
  // 处理点击单选框
  /**
   * 1.绑定事件
   * 2、获取点击的商品 将checked取反
   * 3、重新存回data和缓存中
   * 4、重新计算总价 总数
   */
  handleItemCheck(e) {
    const { id } = e.currentTarget.dataset
    let { cart } = this.data
    let index = cart.findIndex(v => v.goods_id === id);
    cart[index].checked = !cart[index].checked;
    // 再次计算价格
    this.setCart(cart);
  },
  setCart(cart) {
    let allChecked = true;
    // 3 计算总价和总数
    // 首先找出checked属性为true的 总价+=price*num  总数+=num
    let totalPrice = 0;
    let totalNum = 0;
    // 找到checked
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        // 如果存在checked为false的
        allChecked = false;
      }
    })
    // 判断数组是否为空
    allChecked = cart.length ? allChecked : false;
    // 存回
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart)
  },
  // 处理点击全选复选框 重算 存回
  handleAllCheck() {
    let { cart, allChecked } = this.data
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart)
  },
  // 处理+-商品数量
  handleItemNum(e) {
    const {id, operation} = e.currentTarget.dataset;
    // 根据id找到该商品
    let {cart} = this.data
    let index = cart.findIndex(v=>v.goods_id === id)
    if(cart[index].num==1 && operation==-1) {
      wx.showModal({
        title: '提示',
        content: '您确定要删除这一个商品吗',
        success: (res)=>{
          // 注意要改成箭头函数 才能this
          if (res.confirm) {
          //  删除
          cart.splice(index,1)
          this.setCart(cart)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return;
    }
    cart[index].num += operation;
    // 设置回去
    this.setCart(cart)
  },
  // 处理点击结算
  handlePay() {
const{address,totalNum} = this.data;
if(!address.userName) {
  wx.showToast({
    title: '请添加地址',
    icon:'none'
  })
  return;
}
// 选购商品
if(totalNum===0) {
  wx.showToast({
    title: '您还没选购商品',
    icon:'none'
  })
  return;
}
// 可以跳转
wx.navigateTo({
  url: '/pages/pay/index',
})
  }
})