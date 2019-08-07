// pages/friends/friends.js
const API = require('../../apiData/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    follow:[],
    eventList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEvent()
    this.getCares()
  },
  /**
   * 获取用户关注动态
   */
  getEvent(){
    let that = this
    API.getEvent({
      pagesize:30,
      lasttime:''
    }).then(res=>{
      if(res.code === 200){
        debugger
        // res.profile.birthday = Math.floor((new Date().getTime() -res.profile.birthday)/1000/60/60/24/365)
        that.setData({
          eventList:res.event
        })
      }
    })
  },
  /**
   * 获取用户关注列表
   */
  getCares(){
    let that = this
    API.getCares({
      uid:app.globalData.userId,
      limit:5
    }).then(res=>{
      if(res.code ==200){
        that.setData({
          follow : res.follow
        })
      }
    })
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