export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    // yy / yyyy 两种情况
    fmt = fmt.replace(RegExp.$1, String(date.getFullYear()).substring(4 - RegExp.$1.length));
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }

  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substring(str.length);
}
