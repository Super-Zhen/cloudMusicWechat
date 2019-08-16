//app.js
const BASEURL = 'http://localhost:3000'
// const BASEURL = 'http://172.20.10.2:3000'
const requestData = (url , data ) => {
  let httpUrl = BASEURL + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: httpUrl,
      data: data,
      header:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync("sessionid")
      },
      success(result) {
        if(result.data.code === 301){
          wx.showModal({
            // title: '提示',
            content: '需要登录',
            success (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url:'../login/login'
                })
              } else if (res.cancel) {
                debugger
                wx.switchTab({
                  url:'../index/index'
                })
              }
            }
          })
        }else{
          resolve(result.data)
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  BaseUrls:BASEURL,
  getMobileType(){
    wx.getSystemInfo({
      success (res) {
        console.log(res.system)
      }
    })
  },
  getBanner(data){ // 获取banner
    return requestData('/banner',data)
  },
  getHotGedan(data){
    return requestData('/top/playlist',data)
  },
  getNewSong(data){
    return requestData('/top/song',data)
  },
  getNewAlbum(data){
    return requestData('/top/album',data)
  },
  getSongUrl(data){
    return requestData('/song/url',data)
  },
  getSongDetail(data){
    return requestData('/song/detail',data)
  },
  getSongLyric(data){
    return requestData('/lyric',data)
  },
  login(data){
    return requestData('/login/cellphone',data)
  },
  loginState(){
    return requestData('/login/status')
  },
  getUserInfo(data){
    return requestData('/user/detail',data)
  },
  getUserPlayList(data){
    return requestData('/user/playlist',data)
  },
  getUserEvent(data){
    return requestData('/user/event',data)
  },
  getEvent(data){ // 获取用户关注好友动态
    return requestData('/event',data)
  },
  getRecommend(){ // 获取推荐歌曲
    return requestData('/recommend/songs')
  },
  getTopPlaylist(data){ // 获取网友精选碟
    return requestData('/top/playlist',data)
  },
  getTopPlaylistHigh(data){ // 获取精品歌单
    return requestData('/top/playlist/highquality',data)
  },
  getCatDetail(data){
    return requestData('/playlist/detail',data)
  },
  getFans(data){ // 获取用户粉丝列表
    return requestData('/user/followeds',data)
  },
  getCares(data){
    return requestData('/user/follows',data)
  },
  getVideoList(data){
    return requestData('/top/mv',data)
  },
  toplayer(e){
    let id = e.currentTarget.dataset.id
    console.log(id)
    if(id === 'index'){
      wx.navigateTo({
        url: `../player/player?id=${id}`,
      })
    }else {
      this.getSongUrl({id:id}).then(res => { // 主要是获取歌曲地址
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
          console.log('index 94行 出错了')
        }
      })
    }

  },
}