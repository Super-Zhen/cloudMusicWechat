//app.js
const BASEURL = 'http://172.20.10.2:3000'
const requestData = (url , data ) => {
  let httpUrl = BASEURL + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: httpUrl,
      data: data,
      success(result) {
        resolve(result.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

module.exports = {
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
  }
}