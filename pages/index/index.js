const API = require('../../apiData/api')
const app = getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    banner:[],
    indicatorDots: true,
    HotgeDan:'',
    NewSong:'',
    NewAlbum:'',
    autoplay: true,
    interval: 5000,
    duration: 1000,
    songState : app.globalData.songState?'running':'paused',
    songId: app.globalData.songId,
    width:app.globalData.songId.length>0?'90%':'100%'
  },
  getBanner(){ // 获取轮播图
    API.getBanner({
      type:2
    }).then(res => {
      this.setData({
        banner: res.banners
      })
    })
  },
  getHotGedan(){ // 获取推荐歌单
    API.getHotGedan({
      limit:6,
      order:'hot'
    }).then(res => {
      if (res.code === 200) {
        this.setData({
          HotgeDan: res.playlists
        })
      }
    })
  },
  getNewSong(){ // 获取新歌
    API.getNewSong().then(res => {
      if(res.code === 200) {

        this.setData({
          NewSong: res.data
        })
      }
    })
  },
  getNewAlbum(){
    API.getNewAlbum({
      offset:0,
      limit:3
    }).then(res => {
      if(res.code === 200) {
        this.setData({
          NewAlbum: res.albums
        })
      }
    })
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
  toplayer(e){
    API.toplayer(e)
  },
  // 去歌单
  toCatlist(){
    wx.navigateTo({
      url: '../catlist/catlist'
    })
  },
  torecommend(){
    wx.navigateTo({
      url: '../recommend/recommend',
    })
  },
  onLoad(){
    this.getBanner()
    this.getHotGedan()
    this.getNewAlbum()
    this.getNewSong()
    wx.setStorageSync('repeatType','repeat')
    app.setWatch(this.data,this.watch)
    this.setData({
      interval:4999
    })
  },
  watch:{
    interval:function (val) {
      console.log(val)
    }
  },
  onShow: function () {
    this.setData({
      songState : app.globalData.songState?'running':'paused',
      songId: app.globalData.songId,
      width:app.globalData.songId.length>0?'90%':'100%'
    })
    console.log(app.globalData.songState)
    wx.getBackgroundAudioPlayerState({
      success (res) {
        const status = res.status
        const dataUrl = res.dataUrl
        const currentPosition = res.currentPosition
        const duration = res.duration
        const downloadPercent = res.downloadPercent
        console.log(status)
      }
    })
  },
});