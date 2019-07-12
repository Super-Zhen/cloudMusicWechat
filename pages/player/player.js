// pages/player/player.js
/**
 * 进入这个页面之后需要先获取wx.createInnerAudioContext 实例=》InnerAudioContext
 * 获取全局唯一的背景音频管理器。 小程序切入后台，如果音频处于播放状态，可以继续播放。但是后台状态不能通过调用API操纵音频的播放状态。
 * 从微信客户端6.7.2版本开始，若需要在小程序切后台后继续播放音频，需要在 app.json
 * 中配置 requiredBackgroundModes 属性。开发版和体验版上可以直接生效，正式版还需通过审核。
 */

const API = require('../../apiData/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BackgroundAudioManager:'', // 背景音乐示例
    InnerAudioContext:'',
    active:true,
    // active:false,
    state:'running',
    songUrl:'',
    bgColor:'gray',
    songsDetail:'',
    animationData:[],
    repeatType:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '加载中',
    // });
    app.globalData.songId = options.id // 需要将歌曲id存入到全局变量中（点击同一首歌的时候，会再次请求歌曲详情和歌词）（）
    console.log(options) 
    this.playSong(options.id)
    this.setData({
      repeatType:wx.getStorageSync('repeaType')
    })
    // const innerAudioContext = wx.createInnerAudioContext()
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    // innerAudioContext.onPlay(() => {
    //   console.log('开始播放')
    // })
    // innerAudioContext.onError((res) => {
    //   console.log(res.errMsg)
    //   console.log(res.errCode)
    // })
  },
  /**
   * 播放歌曲
   */
  playSong(id) {
    const InnerAudioContext = wx.createInnerAudioContext()
    this.setData({
      InnerAudioContext: InnerAudioContext,
      bgColor:'gray'
    })
    API.getSongUrl({id:id}).then(res => { // 主要是获取歌曲地址
      if(res.code === 200 && res.data[0].url) {
        this.createAudioManager(res.data[0].url)
        if(!this.data.active){
          this.data.BackgroundAudioManager.pause()
        }
      }else{
        wx.showModal({
          title: '',
          content: '',
        })
      }
    })
    API.getSongDetail({ids:id}).then(res=> {
      if(res.code === 200){
        wx.setNavigationBarTitle({
          title: res.songs[0].name
        })
        let alia = res.songs[0].alia[0]?'('+res.songs[0].alia[0]+')':''
        let songTitle = `${res.songs[0].name}  ${alia}`
        this.setData({
          songsDetail: res.songs[0],
          animationData:[songTitle,songTitle,songTitle]
        })
      }
    })
    API.getSongLyric({id:id}).then(res=>{
      console.log(res)
    })
  },
  /**
   * 创建播放进程
   * @param url
   */
  createAudioManager(url){
    const BackgroundAudioManager = wx.getBackgroundAudioManager()
    this.setData({
      BackgroundAudioManager:BackgroundAudioManager
    })
    BackgroundAudioManager.title = 'title'
    BackgroundAudioManager.src = url
    // 这儿是否设置自动播放
    // BackgroundAudioManager.play()
    // 监听背景音乐播放
    // BackgroundAudioManager.onPlay(res => {
    //
    // }),
    // 监听音乐播放完毕之后
    BackgroundAudioManager.onEnded(res => {

    })
  },
  playOrPause(){
    if(this.data.active){
      this.data.BackgroundAudioManager.pause()
      this.setData({
        active:false,
        state:'paused'

      })
    }else{
      this.data.BackgroundAudioManager.play()
      this.setData({
        active:true,
        state:'running'
      })
    }
  },
  toNextSong(){
    let index = Number(app.globalData.playList.indexOf(app.globalData.songId))
    if((index+1)>app.globalData.playList.length){
      this.playSong(app.globalData.playList[0])
      app.globalData.songId = app.globalData.playList[0]
    }else{
      this.playSong(app.globalData.playList[index+1])
      app.globalData.songId = app.globalData.playList[index + 1]
    }
  },
  toPreviousSong(){
    let index = Number(app.globalData.playList.indexOf(app.globalData.songId))
    if((index+1)>app.globalData.playList.length){
      this.playSong(app.globalData.playList[0])
      app.globalData.songId = app.globalData.playList[0]
    }else{
      this.playSong(app.globalData.playList[index+1])
      app.globalData.songId = app.globalData.playList[index + 1]
    }
  },
  imageLoad(){
    this.setData({
      bgColor:''
    })
  },
  repeaType(e){
    let that = this
    console.log(e.currentTarget.dataset.type)
    switch (e.currentTarget.dataset.type){
      case 'repeat':
        that.setData({
          
        })
    }
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