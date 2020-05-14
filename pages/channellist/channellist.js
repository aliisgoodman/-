// pages/channellist/channellist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdown: false,
    showoverlay: false,
    listid: null,
    page: 1,
    listdatas: []
  },
  getlistdatas(id) {
    
    wx.request({
      url: `https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/getPostInCate?p=${this.data.page}&size=10&cateid=${id}`,
      success: (res) => {
        // console.log(res.data.data);
        this.setData({
          listdatas: [...this.data.listdatas, ...res.data.data]
        })
        wx.setStorage({
          data: JSON.stringify({
            time: Date.now() + 3 * 60 * 60 * 1000,
            datas: res.data.data
          }),
          key: `listdatas${id}`,
        })

      },
      complete: () => {
        this.setData({
          showoverlay: false,
          showdown: false
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      listid: options.title,
     
    })
    // console.log(options.title);
    let storagelistdata = wx.getStorageSync(`listdatas${options.title}`)
    if (storagelistdata) {

      storagelistdata = JSON.parse(wx.getStorageSync(`listdatas${options.title}`))
      
      if (storagelistdata.time > Date.now()) {
        this.setData({
          listdatas: storagelistdata.datas,
          showoverlay: false
        })
      } else {
        this.setData({
          showoverlay: true
        })
        this.getlistdatas(options.title)
      }
    } else {
      this.setData({
        showoverlay: true
      })
      this.getlistdatas(options.title)
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
      this.setData({
        showdown: true
      })
    this.setData({
      page: this.data.page + 1
    })
    this.getlistdatas(this.data.listid)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})