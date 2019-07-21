const API = require('../../apiData/api')
const app = getApp();
Page({
  data: {
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    catTitleList:['推荐','精品','华语','流行','轻音乐','ACG','民谣','123','123123','民谣','123','123123'],
    Playlist:[]
  },
  // 滚动切换标签样式
  switchTab: function(e) {
    console.log(e.detail)
    this.checkCor();
//e.detail.current现在是在哪一个选项卡里面 
    switch (e.detail.current) {
      case 0:
        this.setData({
          currentTab: e.detail.current,
          expertList: [
              { //假数据
            img: "avatar.png",
            name: "健康1",
            tag: "过去过不去都会过去",
            answer: 134,
            listen: 2234
          },
            { //假数据
              img: "avatar.png",
              name: "分分2",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "挖方3",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "哥啊4",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "阿迪王5",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "啊打发6",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "咖妃7",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
          ]
        }); break;
      case 1:
        this.setData({
          currentTab: e.detail.current,
          expertList: [{ //假数据
            img: "avatar.png",
            name: "情感1",
            tag: "过去过不去都会过去",
            answer: 134,
            listen: 2234
          },
            { //假数据
              img: "avatar.png",
              name: "分分2",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "挖方3",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "哥啊4",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "阿迪王5",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "啊打发6",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "咖妃7",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
          ]
        }); break;
      case 2:
        this.setData({
          currentTab: e.detail.current,
          expertList: [{ //假数据
            img: "avatar.png",
            name: "职场",
            tag: "过去过不去都会过去",
            answer: 134,
            listen: 2234
          },
            { //假数据
              img: "avatar.png",
              name: "咖妃挖2",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "把我3",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "哥啊4",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "阿迪王5",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "啊打发6",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "咖妃7",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
          ]
        }); break;
      case 3:
        this.setData({
          currentTab: e.detail.current,
          expertList: [{ //假数据
            img: "avatar.png",
            name: "育儿1",
            tag: "过去过不去都会过去",
            answer: 134,
            listen: 2234
          },
            { //假数据
              img: "avatar.png",
              name: "分分2",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "挖方3",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "哥啊4",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "阿迪王5",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "啊打发6",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "咖妃7",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
          ]
        }); break;
      case 4:
        this.setData({
          currentTab: e.detail.current,
          expertList: [{ //假数据
            img: "avatar.png",
            name: "纠纷1",
            tag: "过去过不去都会过去",
            answer: 134,
            listen: 2234
          },
            { //假数据
              img: "avatar.png",
              name: "分分2",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "挖方3",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "哥啊4",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "阿迪王5",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "啊打发6",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "咖妃7",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
          ]
        }); break;
      case 5:
        this.setData({
          currentTab: e.detail.current,
          expertList: [{ //假数据
            img: "avatar.png",
            name: "青葱1",
            tag: "过去过不去都会过去",
            answer: 134,
            listen: 2234
          },
            { //假数据
              img: "avatar.png",
              name: "分分2",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "挖方3",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "哥啊4",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "阿迪王5",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "啊打发6",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "咖妃7",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
          ]
        }); break;
      case 6:
        this.setData({
          currentTab: e.detail.current,
          expertList: [{ //假数据
            img: "avatar.png",
            name: "全部1",
            tag: "过去过不去都会过去",
            answer: 134,
            listen: 2234
          },
            { //假数据
              img: "avatar.png",
              name: "分分2",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "挖方3",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "哥啊4",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 223
            },
            { //假数据
              img: "avatar.png",
              name: "阿迪王5",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 22
            },
            { //假数据
              img: "avatar.png",
              name: "啊打发6",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 223
            },
            { //假数据
              img: "avatar.png",
              name: "咖妃7",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
          ]
        }); break;
      case 7:
        this.setData({
          currentTab: e.detail.current,
          expertList: [{ //假数据
            img: "avatar.png",
            name: "其他1",
            tag: "过去过不去都会过去",
            answer: 134,
            listen: 2234
          },
            { //假数据
              img: "avatar.png",
              name: "分分2",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "挖方3",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "哥啊4",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "阿迪王5",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "啊打发6",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
            { //假数据
              img: "avatar.png",
              name: "咖妃7",
              tag: "过去过不去都会过去",
              answer: 134,
              listen: 2234
            },
          ]
        }); break;
    }

  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTab === cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function() {
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
          winHeight: calc
        });
      }
    });
    this.getTopPlaylist(24,0)
  },
  onReady: function () {

  },
  imageLoad(){
    wx.hideLoading()
  },
  getTopPlaylist(limitNum,offset){
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    API.getTopPlaylist({limit:limitNum,offset:offset}).then(res=>{
      console.log(res)
      if(res.code === 200) {
        // console.log(res.playlists)
        // debugger
        let playlist = that.data.Playlist.concat(res.playlists)
        console.log(playlist)
        that.setData({
          Playlist: playlist
        })
      }
    })
  },
  lower(){
    console.log(this.data.Playlist.length)
    this.getTopPlaylist(24,this.data.Playlist.length)
  },
  info(e){
    var that = this
    //数据的获取、获取点击了哪个“信息”按钮 输出所对应的name
    console.log(that.data.expertList[e.currentTarget.dataset.index].name)
  },
  // footerTap: app.footerTap
})