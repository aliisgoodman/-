// pages/palying/palying.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  comment评论
    // content_video[0].progressive[2].url视频地址用代理
    playdatas: null,
  },
  getplaydatas(id) {
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/view?postid=' + id,
      success: (res) => {
        // console.log(res.data.data);
        this.setData({
          playdatas: res.data.data
        })
        wx.setStorage({
          data: JSON.stringify(res.data.data),
          key: 'storageplaydatas',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.palyid);
    let getstorageplaydatas = wx.getStorageSync('storageplaydatas')
    if (getstorageplaydatas) {
      getstorageplaydatas = JSON.parse(wx.getStorageSync('storageplaydatas'))
      this.setData({
        playdatas: getstorageplaydatas
      })
    } else {
      this.getplaydatas(options.palyid)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})