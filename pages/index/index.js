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
    let id = e.currentTarget.dataset.id
    console.log(id)
    API.getSongUrl({id:id}).then(res => { // 主要是获取歌曲地址
      if(res.code === 200 && res.data[0].url) {
        wx.navigateTo({
          url: `../player/player?id=${id}`,
        })
      }else if(res.data[0].fee=== 4){ // 判断歌曲是否是付费歌曲4 ，或者试听其中一段歌曲1，一般标准歌曲8
        wx.showToast({
          title: '数字专辑,需要单独付费',
          icon: 'none',
          duration: 2000
        })
      }else{
        console.log('player 52行 出错了')
      }
    })
  },
  onLoad(){
    this.getBanner()
    this.getHotGedan()
    this.getNewAlbum()
    this.getNewSong()
  }
});