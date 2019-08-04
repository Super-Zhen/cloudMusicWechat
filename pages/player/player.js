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
    repeatType:'',
    isShow:'true',
    lyric:'',
    top:'400',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '加载中',
    // });
    if(options.id !== 'index'){
      app.globalData.songId = options.id // 需要将歌曲id存入到全局变量中（点击同一首歌的时候，会再次请求歌曲详情和歌词）（）
      console.log(options)
      // this.playSong(options.id)
      this.setData({
        repeatType:wx.getStorageSync('repeatType')
      })
    }
    this.playSong(app.globalData.songId,options.id)
  },
  /**
   * 播放歌曲
   */
  playSong(id,flag) {
    let that = this
    let songName=''
    const InnerAudioContext = wx.createInnerAudioContext()
    that.setData({
      // InnerAudioContext: InnerAudioContext,
      bgColor:'gray'
    })
    API.getSongDetail({ids:id}).then(res=> {
      if(res.code === 200){
        wx.setNavigationBarTitle({
          title: res.songs[0].name
        })
        songName = res.songs[0].name
        let alia = res.songs[0].alia[0]?'('+res.songs[0].alia[0]+')':''
        let songTitle = `${res.songs[0].name}  ${alia}`
        that.setData({
          songsDetail: res.songs[0],
          animationData:[songTitle,songTitle,songTitle]
        })
        if(flag === 'index'){

        }else{
          API.getSongUrl({id:id}).then(res => { // 主要是获取歌曲地址
            if(res.code === 200 && res.data[0].url) {
              this.createAudioManager(res.data[0].url,songName)
              if(!that.data.active){
                this.data.BackgroundAudioManager.pause()
                app.globalData.songState = false
              }
            }else{
              wx.showModal({
                title: '',
                content: '',
              })
            }
          })
        }
      }
    })
    API.getSongLyric({id:id}).then(res=>{
      console.log(res)
      if(res.code===200){
        if(res.nolyric){
          this.setData({
            lyric: '暂无歌词'
          })
        }else{
          this.setData({
            lyric: res.lyric.replace(/\[[0-9]{2}:[0-9]{2}\.[0-9]{1,3}\]/g,'')
          })
        }

      }
    })
  },
  lyricShow(){
    this.setData({
      isShow: !this.data.isShow
    })
  },
  /**
   * 创建播放进程
   * @param url
   */
  createAudioManager(url,title){
    let that = this
    const BackgroundAudioManager = wx.getBackgroundAudioManager()
    this.setData({
      BackgroundAudioManager:BackgroundAudioManager
    })
    app.globalData.songState = true
    BackgroundAudioManager.title = title
    BackgroundAudioManager.src = url
    BackgroundAudioManager.onTimeUpdate(()=>{
     // console.log(this.data.BackgroundAudioManager.currentTime)

    })
    BackgroundAudioManager.onEnded(()=>{
      this.onSongEnd()
    })
    // 这儿是否设置自动播放
    // BackgroundAudioManager.play()
    // 监听背景音乐播放
    // BackgroundAudioManager.onPlay(res => {
    //
    // }),
    // 监听音乐播放完毕之后
  },
  playOrPause(){
    if(this.data.active){
      wx.getBackgroundAudioManager().pause()
      app.globalData.songState = false
      // this.data.BackgroundAudioManager.onTimeUpdate(()=>{
      //  // console.log(this.data.BackgroundAudioManager.currentTime)
      // })
      this.data.BackgroundAudioManager.onEnded(()=>{
        console.log(1111)
      })
      this.setData({
        active:false,
        state:'paused'
      })
    }else{
      this.data.BackgroundAudioManager.play()
      app.globalData.songState = true
      // this.data.BackgroundAudioManager.onTimeUpdate(()=>{
      //   //console.log(this.data.BackgroundAudioManager.currentTime)
      // })

      this.data.BackgroundAudioManager.onEnded(()=>{
        this.onSongEnd()
      })
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
/**
 * 判断歌曲是否播放完毕然后判断是单曲还是列表循环
 */
  onSongEnd(){
    // debugger
    if(this.data.BackgroundAudioManager.currentTime === 0){
      if(this.data.repeatType === 'repeatOne'){
        this.playSong(app.globalData.songId)
      }else if(this.data.repeatType === 'repeat'){
        this.toNextSong()
      }else {
        this.playSong(app.globalData.playList[Math.floor((Math.random()*app.globalData.playList.length))])
      }
    }
  },
  /**
   * 传入当前的循环类型
   * @param e
   */
  repeatType(e){
    let that = this
    console.log(e.currentTarget.dataset.type)
    switch (e.currentTarget.dataset.type){
      case 'repeat':
        that.setData({
          repeatType: 'repeatOne'
        })
        console.log(app.globalData.songId)
        wx.setStorageSync('repeatType','repeatOne')
      break;
      case 'repeatOne':
        that.setData({
          repeatType: 'repeatRandom'
        })

        wx.setStorageSync('repeatType','repeatRandom')
      break;
      case 'repeatRandom':
        that.setData({
          repeatType: 'repeat'
        })
        wx.setStorageSync('repeatType','repeat')
      break;
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
    this.setData({
      repeatType:wx.getStorageSync('repeatType')
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