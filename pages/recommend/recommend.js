// pages/recommend/recommend.js
const API = require('../../apiData/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendList:'',
    songState : app.globalData.songState?'running':'paused',
    songId: app.globalData.songId,
    width:app.globalData.songId.length>0?'90%':'100%',
    inputShowed: false,
    inputVal: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommend()
    API.getMobileType()
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  getRecommend(){
    API.getRecommend().then(res=>{
     if(res.code === 200){
       this.setData({
         recommend:res.recommend
       })
     }
     console.log(res)
    })
  },
  toplayer(e){
    if(e.currentTarget.dataset.id !== 'index'){
      app.globalData.playList = this.data.recommend.map(item=>{
        return String(item.id)
      })

      app.globalData.songId = e.currentTarget.dataset.id
    }
      API.toplayer(e)
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
    this.setData({
      songState : app.globalData.songState?'running':'paused',
      songId: app.globalData.songId,
      width:app.globalData.songId.length>0?'90%':'100%'
    })
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