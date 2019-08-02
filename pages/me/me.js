// pages/me/me.js
const API = require('../../apiData/api')
const util = require('../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:'hide',
    loginInfo:'',
    meList:['音乐','动态','关于我'],
    currentTab:1,
    winHeight:'',
    playList:[],
    eventsList:[],
    aboutMe:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
            clientWidth = res.windowWidth,
            rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 100;
        console.log(calc)
        that.setData({
          winHeight: calc,
          // currentTab:'1'
        });
      }
    });
  },
  swichNav:function(e){
    var that = this
    // debugger
    var cur = e.target.dataset.current;
    if (this.data.currentTab === cur) {
      return false;
    } else {
      that.setData({
        currentTab: cur
      })
    }
  },
  switchTab: function(e) {
    // debugger
    let that = this
    console.log(e.detail)
//e.detail.current现在是在哪一个选项卡里面
    switch (e.detail.current) {
      case 0:
        this.setData({
          currentTab: e.detail.current
        });
        that.getUserPlayList(that.data.loginInfo.profile.userId,e.detail.current)
        break;
      case 1:
        this.setData({
          currentTab: e.detail.current
        });
        that.getUserEvent(that.data.loginInfo.profile.userId,e.detail.current)
        break;
      case 2:
        this.setData({
          currentTab: e.detail.current,
        });
        that.getUserPlayList(that.data.loginInfo.profile.userId,e.detail.current)
        break;
    }
  },
  getUserPlayList(id,index){
    let that = this
    API.getUserPlayList({uid:id}).then(res=>{
      if(res.code === 200){
        this.setData({
          playList:res.playlist
        })
      }
    })
  },
  getUserEvent(id,index){
    let that = this
    API.getUserEvent({uid:id}).then(res=>{
      if(res.code === 200){
        that.data.eventsList = res.events
        let data = that.data.eventsList.map(item=>{
          item.json = JSON.parse(item.json)
          item.showTime = util.formatTime(item.showTime)
          return item
        })
        this.setData({
          eventsList:data
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
        API.getUserInfo({uid:res.profile.userId}).then(res=>{
          if(res.code === 200){
            this.setData({
              isLogin:'show',
              loginInfo:res
            })
          }
        })
        wx.hideLoading()
      }
    })

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