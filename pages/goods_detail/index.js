// pages/goods_detail/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodDetails: {},
  },
  // 把图片存出来
  goods:[],
// 实现点击预览大图
handlePreviewImg(e) {
  const {index} = e.currentTarget.dataset
  const urls = this.goods.pics.map(v=> v.pics_mid)
  wx.previewImage({
    current:urls[index],
    urls: urls,
  })
},

// 加入购物车
/** 
 * 步骤：1、先判断当前商品是否存在哦于购物车
 * 2、已经存在就++，修改数量，再存回本地
 * 3、不存在于购物车的新商品，给数组添加一个新的元素，再存回去
 * 4、给用户提示
*/
addCart() {
// 判断本地的数据 不存在就给一个空数组
let cart = wx.getStorageSync('cart')||[]
// 找到本地的商品的index对比是否存在
let index = cart.findIndex(v=>v.goods_id === this.goods.goods_id)
if(index===-1) {
  // 不存在 push进去 并把添加数量属性，数量设置为1
  this.goods.num=1;
  // 把选中属性加上
  this.goods.checked=true;
cart.push(this.goods)
}else {
  // 存在 直接找到该商品 数量加1
  cart[index].num++;
}
// 存回缓存
wx.setStorageSync('cart', cart);
// 弹窗提醒用户
wx.showToast({
  title: '加入成功',
  mask:true, //防止手抖
  icon:'success'
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前的商品数据
    const { goods_id } = options
    request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    }).then(res => {
      console.log(res);
      const { message } = res.data
      this.goods = message
      this.setData({
        goodDetails: {
          goods_name: message.goods_name,
          goods_price: message.goods_price,
          goods_introduce: message.goods_introduce,
          pics: message.pics,
        }
      })

    })
  },

})