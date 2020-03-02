# myshop-miniProgram
**1. ⾸⻚**
业务逻辑 
1. 使⽤tabbar 实现底部导航功能 
  设置tabbar的tabbar
2. 使⽤⾃定义组件的⽅式 实现 头部搜索框 
  components
  
 ** 封装request请求方法，设置基准路径**
 
3. 加载 轮播图 数据 

4. 加载 导航 数据 

5. 加载 楼层 数据

**2.分类⻚⾯**

业务逻辑 

1. 加载分类⻚⾯数据 

用scroll--view 组件完成两栏滚动，用cal()样式设置固定的高度

2. 点击左侧菜单，右侧数据动态渲染 

点击，将当前的index传过去，右边渲染的时候index变化数据相应改变


**3.商品列表⻚⾯**

业务逻辑

1. 加载商品列表数据 

2. 启⽤下拉⻚⾯功能 

（1.） ⻚⾯的json⽂件中开启设置 enablePullDownRefresh:true

（2.）⻚⾯的js中，绑定事件 onPullDownRefresh

注意：实现主要是下拉清空数据，并把页码重置为1


3. 启⽤上拉⻚⾯功能 onReachBottom ⻚⾯触底事件 加载下⼀⻚功能

注意：实现主要是事件触发，页码++，发请求拿数据，数据拼接

tips: 节流防抖功能，开关思想，请求成功回来后把开关设为false，请求前把开关设为true

**4.商品详情⻚⾯**

业务逻辑 

1. 渲染商品详情数据 

富⽂本标签 渲染 富⽂本

2. 点击图⽚，调出图⽚画廊，进⾏预览 

  wx.imagePreview方法 传入数组 点击当前的图片传入index

3. 点击收藏 

在onShow里进行处理，获取参数的方法：getCurrentPages（）拿到当前页的options，获取商品详情，在本地缓存的收藏的数组里遍历是否有这个id

4. 联系客服

open-type="contact" 按钮的样式不好设置时，可以设置其宽高100%,然后定位在元素上方，透明度设为0

5. 分享功能 

open-type="share" 

6. 加⼊购物⻋

判断本地的数据 ：
不存在添加 两个属性 num数量 checked选中
存在就num++

**5.购物⻋⻚⾯**

业务逻辑 

1. 渲染购物⻋数据 

2. 添加收货地址

① wx.chooseAddress(Object object)

② authSetting的scope.address的三种状态：

true和undefined就可以添加地址了  
false就要引导用户打开设置

3. 修改商品数量 
定义总的状态，总数，总价 
遍历checked属性决定是否加数和状态修改，遍历时需要注意的是空数组遍历返回的可能是true
注意 都需要两个存data和缓存

4. 单选和全选功能
  遍历商品数组里的check来决定
