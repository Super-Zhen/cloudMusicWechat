const API = require('../../apiData/api')
const app = getApp();
Page({
  data: {
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    catTitleList:[[], [], [], [], [], [], []],
    Playlist:[],
    highQuality:[],
    date: new Date().getTime()
  },
  // 滚动切换标签样式
  switchTab: function(e) {
    debugger
    let that = this
    console.log(e.detail)
    this.checkCor();
//e.detail.current现在是在哪一个选项卡里面 
    switch (e.detail.current) {
      case 0:
        this.setData({
          currentTab: e.detail.current
        });
        that.getTopPlaylist(24,0,1)
      break;
      case 1:
        this.setData({
          currentTab: e.detail.current
        });
        that.getTopPlaylistHigh(24,0,1)
        break;
      case 2:
        this.setData({
          currentTab: e.detail.current,
        }); break;
      case 3:
        this.setData({
          currentTab: e.detail.current,
        }); break;
      case 4:
        this.setData({
          currentTab: e.detail.current,
        }); break;
      case 5:
        this.setData({
          currentTab: e.detail.current,
        }); break;
      case 6:
        this.setData({
          currentTab: e.detail.current,
        }); break;
      case 7:
        this.setData({
          currentTab: e.detail.current,
        }); break;
    }

  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    debugger
    var that = this
    var cur = e.target.dataset.current;
    // var array =[]
    // for(item in that.data.catTitleList){
    //   array.push(item)
    // }
    if (this.data.currentTab === cur) {
      return false;
    } else {
      that.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function() {
    debugger
    let that = this
    if (this.data.currentTab > 3) {
      this.setData({
        scrollLeft: (that.data.currentTab-3)*85
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function() {

    var that = this;
    //  高度自适应
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
    this.getTopPlaylist(24,0,0)
  },
  onReady: function () {

  },
  onShow:function(){
    this.setData({
      date:new Date().getTime()
    })
  },
  imageLoad(){
    wx.hideLoading()
  },
  getTopPlaylist(limitNum,offset,index){
    // wx.showLoading({
    //   title: '加载中',
    // })
    let that = this
    API.getTopPlaylist({limit:limitNum,offset:offset}).then(res=>{
      console.log(res)
      if(res.code === 200) {
        // console.log(res.playlists)
        // debugger
        that.data.catTitleList[index].push.apply(that.data.catTitleList[index],res.playlists)
        // console.log(playlist)
        that.setData({
          catTitleList: that.data.catTitleList,
          // Playlist: playlist
        })
      }
    })
  },
  getTopPlaylistHigh(limitNum,offset,index){
    let that = this
    API.getTopPlaylistHigh({limit:limitNum,offset:offset,before:that.data.date}).then(res=>{
      console.log(res)
      if(res.code === 200){
        // let highQuality = that.data.catTitleList[index].concat(res.playlists)
        that.data.catTitleList[index].push.apply(that.data.catTitleList[index],res.playlists)
        that.setData({
          catTitleList:that.data.catTitleList
        })
      }
    })
  },
  lower(){
    // console.log(this.data.Playlist.length)
    switch(this.data.currentTab){
      case 0:
        this.getTopPlaylist(24,this.data.catTitleList[this.data.currentTab].length,this.data.currentTab)
        break
      case 1:
        this.getTopPlaylistHigh(24,this.data.catTitleList[this.data.currentTab].length,this.data.currentTab)
        break
    }

  },
  info(e){
    var that = this
    //数据的获取、获取点击了哪个“信息”按钮 输出所对应的name
    console.log(that.data.expertList[e.currentTarget.dataset.index].name)
  },
  // footerTap: app.footerTap
})