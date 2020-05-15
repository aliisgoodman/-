// pages/vmovie/vmovie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    days: `${new Date().getMonth()+1}月${new Date().getDate()}日`,
    times: `${new Date().getHours()}:${new Date().getMinutes()}`,
    active: 0,
    channeldatas: [],
    album: [],
    banner: [],
    hot: [],
    posts: [],
    today: []
  },
  getindexdatas() {
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/index',
      success: (res) => {
        
        console.log(res.data.data);
        this.setData({
          album: res.data.data.album,
          banner: res.data.data.banner,
          hot: res.data.data.hot,
          posts: res.data.data.posts,
          today: res.data.data.today
        })
        wx.setStorage({
          data: JSON.stringify({
            time: Date.now() + 3 * 60 * 60 * 1000,
            datas: res.data.data
          }),
          key: 'indexdatas',
        })

      }
    })
  },
  getchanneldata() {
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/cate/getList',
      success: (res) => {

        // console.log(res.data.data);
        this.setData({
          channeldatas: res.data.data
        })
        wx.setStorage({
          data: JSON.stringify({
            time: Date.now() + 3 * 60 * 60 * 1000,
            datas: res.data.data
          }),
          key: 'channeldata',
        })

      }
    })
  },
  gochannellist(e) {
    wx.navigateTo({
      url: '../channellist/channellist?title=' + e.currentTarget.dataset.listid,
    })

  },
  gopalying(e){
// console.log(e.currentTarget.dataset.playid);
wx.navigateTo({
  url: '../palying/palying?palyid='+e.currentTarget.dataset.playid,
})

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发现
    let storageindexdatas = wx.getStorageSync('indexdatas')
    if (storageindexdatas) {
      storageindexdatas = JSON.parse(wx.getStorageSync('indexdatas'))
      if (storageindexdatas.time > Date.now()) {
        this.setData({
          album: storageindexdatas.datas.album,
          banner: storageindexdatas.datas.banner,
          hot: storageindexdatas.datas.hot,
          posts: storageindexdatas.datas.posts,
          today: storageindexdatas.datas.today
        })
      } else {

        this.getindexdatas()
      }
    } else {
      this.getindexdatas()
    }

// 频道
    let storagechanneldata = wx.getStorageSync('channeldata')
    if (storagechanneldata) {
      storagechanneldata = JSON.parse(wx.getStorageSync('channeldata'))
      if (storagechanneldata.time > Date.now()) {
        this.setData({
          channeldatas: storagechanneldata.datas
        })
      } else {

        this.getchanneldata()
      }
    } else {
      this.getchanneldata()
    }

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
    // setInterval(() => {
    //   this.setData({
    //     days: `${new Date().getMonth()+1}月${new Date().getDate()}日`,
    //     times: `${new Date().getHours()}:${new Date().getMinutes()}`,
    //   })

    // }, 60000)
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('xxxxx');
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})