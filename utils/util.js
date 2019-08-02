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

module.exports = {
  formatTime: formatTime
}
