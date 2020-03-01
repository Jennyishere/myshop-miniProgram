import request from '../../utils/request.js'

Page({
  data: {
    banners: [],
    navs: [],
    floorData: [],
    backToTop: false
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
    }).then(res => {
      // console.log(res)
      const {
        message
      } = res.data
      // 添加跳转路径
      let navs = message.map((v, i) => {
        if (v.name === "分类") {
          v.url = "/pages/Category/index"
        }
        return v
      })
      this.setData({
        navs
      })
    })
    // 请求楼层
    request({
      url: '/home/floordata'
    }).then(res => {
      // console.log(res)
      const {
        message
      } = res.data;
      this.setData({
        floorData: message
      })
    })
  },
  // 点击回到顶部
  backToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  // 滚到指定位置显示回到顶部
  onPageScroll(e) {
    const {
      scrollTop
    } = e;
    let isShow;
    if (scrollTop > 100) {
      isShow = true;
    } else {
      isShow = false;
    }
    if (this.data.backToTop == isShow) return;
    this.setData({
      backToTop: isShow
    })
  }
})