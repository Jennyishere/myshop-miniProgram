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
  goodsPics:[],
// 实现点击预览大图
handlePreviewImg(e) {
  const {index} = e.currentTarget.dataset
  const urls = this.goodsPics.map(v=> v.pics_mid)
  wx.previewImage({
    current:urls[index],
    urls: urls,
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
      this.goodsPics = message.pics
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