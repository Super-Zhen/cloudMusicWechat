// pages/video/video.js
const app = getApp()
const API = require('../../apiData/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: '', 
    winHeight:''
  },
  /**
   * 获取视频列表
   */
  getVideoList(){
    let that = this
    API.getVideoList({limit:10}).then(res=>{
      if(res.code===200){
        that.setData({
          videoList: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR ;
        console.log(calc)
        that.setData({
          winHeight: calc,
          // currentTab:'1'
        });
      }
    });
    this.getVideoList()
  },
  /**
   * 滑动到底部
   */
  lower(){
    console.log(1)
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