import request from '../../utils/request.js'

Page({
  data: {
    banners: [],
    navs:[]
  },
  onLoad: function() {
    // 请求轮播图
    request({
      url: '/home/swiperdata'
    }).then(res => {
      // console.log(res)
      const {
        message
      } = res.data
      this.setData({
        banners: message
      })
    })
      
      // 请求nav图
      request({
        url: '/home/catitems',
      }).then(res=> {
        console.log(res)
        const {message} = res.data
        // 添加跳转路径
       let navs= message.map((v,i)=> {
         if(v.name === "分类"){
           v.url = "/pages/Category/index"
         }
         return v
        })
        this.setData({
          navs
        })
      })
  }
})