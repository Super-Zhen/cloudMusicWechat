const API = require('../../apiData/api')
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
    wx.navigateTo({
      url: `../player/player?id=${id}`,
      // events: {
      //   acceptDataFromOpenedPage: function(data) {
      //     console.log(data)
      //   }
      // },
      // success: function(res) {
      //   res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      // }
    })
  },
  onLoad(){
    this.getBanner()
    this.getHotGedan()
    this.getNewAlbum()
    this.getNewSong()
  }
});