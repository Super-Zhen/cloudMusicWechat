const formatTime = date => {
  const dates = new Date(date)
  const year = dates.getFullYear()
  const month = dates.getMonth() + 1
  const day = dates.getDate()
  const hour = dates.getHours()
  const minute = dates.getMinutes()
  const second = dates.getSeconds()

  return [year, month, day].map(formatNumber).join('/')
    // + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const format=(date, fmt) =>{
  date = new Date(date)
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
const getDiffTime=(recordTime) =>{
  if (recordTime) {
    recordTime = new Date(recordTime)
    let minute = 1000 * 60,
      hour = minute * 60,
      day = hour * 24,
      now = new Date(),
      nowYear = now.getFullYear(),
      recordYear = recordTime.getFullYear(),
      diff = now - recordTime;
    var result = ''
    if (diff < 0) {
      return result
    }
    let weekR = diff / (7 * day)
    let dayC = diff / day;
    let hourC = diff / hour;
    let minC = diff / minute
    if (weekR >= 1) {
      var formate = 'MM-DD hh:mm'
      if (nowYear - recordYear) {
        formate = 'YYYY-MM-DD hh:mm'
      }
      return format(recordTime, formate)
    } else if (dayC == 1 || hourC < 24 && recordTime.getDate() != now.getDate()) {
      return `昨天${format(recordTime, 'hh:mm')}`
    } else if (dayC > 1) {
      var formate = 'MM-DD hh:mm'
      if (nowYear - recordYear) {
        formate = 'YYYY-MM-DD hh:mm'
      }
      return format(recordTime, formate)
    } else if (hourC >= 1) {
      return `${parseInt(hourC)}小时前`
    } else if (minC >= 1) {
      return `${parseInt(minC)}分钟前`
    } else {
      return '刚刚'
    }
  }
}



module.exports = {
  formatTime: formatTime,
  getDiffTime: getDiffTime
}
