// pages/player/player.js
/**
 * 这个页面是播放音频的页面，这个页面首先需要在app.json 配置是否开启后台进程
 * 进入这个页面之后需要
 */

const API = require('../../apiData/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    InnerAudioContext:'',
    isPlay:true,
    songUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.playSong(options.id)
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
      // isPlay: true

    })
    API.getSongUrl({id:id}).then(res => {
      if(res.data.code === 200) {
        this.setData({
          songUrl:res.data.data[0]
        })
      }
    })
    API.getSongDetail({ids:id}).then(res=> {
      console.log(res)
    })
    API.getSongLyric({id:id}).then(res=>{
      console.log(res)
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