// pages/vmovie/vmovie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    channeldatas: []
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
  gochannellist(e){
   wx.navigateTo({
     url: '../channellist/channellist?title='  + e.currentTarget.dataset.listid,
   })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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