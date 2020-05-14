// components/listcomponent/listcomponent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lists:Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goplaying(e){
    //  wx.navigateTo({
    //    url: '../../pages/palying/palying?paly=',
    //  })
      console.log(e);
      
    }
  }
})
