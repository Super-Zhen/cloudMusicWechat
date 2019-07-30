// pages/me/me.js
const API = require('../../apiData/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:'hide',
    loginInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中',
    })
    console.log('ready')
    API.loginState().then(res=>{
      if(res.code === 301){
        wx.redirectTo({
          url: '../login/login'
        })
      }else{
        this.setData({
          isLogin:'show',
          loginInfo:app.globalData.loginInfo
        })
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('show')

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('hide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('globalData')
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