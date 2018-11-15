export function scrollToTop (distance, scrollDuration) {
  var cosParameter = isNaN(distance) ? (window.scrollY / 2) : parseFloat(distance)
  var scrollCount = 0
  var oldTimestamp = performance.now()
  function step (newTimestamp) {
    scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
    if (scrollCount >= Math.PI) window.scrollTo(0, 0)
    if (window.scrollY === 0) return
    window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)))
    oldTimestamp = newTimestamp
    window.requestAnimationFrame(step)
  }
  window.requestAnimationFrame(step)
}

export function formatDate (date, type) {
  date = new Date(date)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var minute = date.getMinutes()
  var second = date.getSeconds()
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  if (type === 1) {
    return y + '-' + m + '-' + d
  } else if (type === 2) {
    return h + ':' + minute + ':' + second
  } else if (type === 9) {
    return m + '月' + d + '日'
  } else {
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  }
}
/**
 * 把数字转为带，的字符串，如果有，保留两位小数
 * 如12345 => 12,345
 * @param {Number} num 要转换的数字
 * @return {String} 带，的字符串
 */
export function numberComma (num) {
  num = (num || 0).toString()
  let num1 = num.split('.')[1]
  num = num.split('.')[0]
  let result = ''
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) { result = num + result }
  // 把,.连一起的去掉
  return result.concat(num1 ? `.${num1}` : '').replace(/(\...).*/, '$1')
}
/**
 * 去抖函数
 * @param {Function} fn 待执行函数
 * @param {Number} delay 延迟时间
 * @return {Function} 不断延迟的函数
 */
export function debounce (fn, delay) {
  delay = delay || 200
  var timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      timer = null
      fn(...args)
    }, delay)
  }
}
export const GetDay = (str) => {
  const dateArray = str.split('-')
  const date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2])
  return '周' + '日一二三四五六'.charAt(date.getDay())
}
/**
 * 将对象转换为数组
 * @param {Object} obj 对象
 * @param {Boolean} notArrayLike 对象不是是类数组对象吗
 * @return {Array<any>} 转换后的数组
 */
export function arrayLikeToArray (obj, notArrayLike = false) {
  let result = []
  Object.keys(obj).forEach(key => {
    if (notArrayLike || /\d+/.test(key)) {
      result.push(obj[key])
    }
  })
  return result
}

/**
 * 对一维数组分组
 * @param {Array<any>} arr 待划分的数组
 * @param {Number} num 多少个为一组
 * @return {Array<Array>} 划分后的数组
 */
export function divideArray (arr, num) {
  let result = []
  let resultIndex = -1
  for (let i = 0; i < arr.length; i += 1) {
    if ((i % num) === 0) {
      result.push([
        arr[i]
      ])
      resultIndex += 1
    } else {
      result[resultIndex].push(arr[i])
    }
  }
  return result
}

let inputElement = document.createElement('input')
inputElement.style.position = 'fixed'
inputElement.style.top = '-100000px'
document.body.appendChild(inputElement)
/**
 * 复制内容到剪贴板
 * @param {String} value 待复制的值
 * @return {Promise}
 */
export function copyToBoard (value) {
  inputElement.value = value
  inputElement.focus()
  inputElement.select()
  return new Promise((resolve, reject) => {
    try {
      document.execCommand('copy')
      inputElement.blur()
    } catch (err) {
      reject(err)
    }
    resolve()
  })
}

/**
 * 日期格式化
 * @param {Date|String|Number} date 日期
 * @param {String} fmt 格式化字符串
 * @return {String} 格式化后的日期
 */
export function dateFormat (date, fmt = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) {
    return ''
  }
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'))
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  var o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  var week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
/**
 * 存储分享相关信息
 */
export const shareTools = {
  shareParam: ['share_id', 'room_agent_id', 'room_id'],
  saveShareInfo (query) {
    this.shareParam.forEach((key) => {
      // 用session存，下次进入网页重置
      // 如果存过，本次会话就不覆盖
      if ((sessionStorage.getItem(key) !== null) || !query[key]) {
        return
      }
      sessionStorage.setItem(key, query[key])
    })
  },
  getShareInfo () {
    let result = {}
    this.shareParam.forEach((key) => {
      result[key] = sessionStorage.getItem(key)
    })
    return result
  }
}
/**
 * 获取元素相对于文档的偏移
 * @param {HTMLElement} Node 节点
 * @param {Object} offset 偏移
 */
export function getOffset (Node, offset, target) {
  if (!offset) {
    offset = {}
    offset.top = 0
    offset.left = 0
  }
  // 在容器使用v-show而不是v-if的情况下，到此函数时可能就无法获取offsetParent
  if (!Node) {
    return offset
  }
  if (Node === (target || document.body)) {
    return offset
  }
  offset.top += Node.offsetTop
  offset.left += Node.offsetLeft
  return getOffset(Node.offsetParent, offset, target)
}
/**
 * 深度克隆
 * @param {any} target 待克隆的对象
 */
export function deepClone (target) {
  let result
  // 暂不考虑其它类型
  switch (typeof target) {
    case 'object':
      if (Array.isArray(target)) {
        result = []
        for (let i in target) {
          result[i] = deepClone(target[i])
        }
      } else {
        result = {}
        for (let key in target) {
          result[key] = deepClone(target[key])
        }
      }
      break
    default:
      result = target
      break
  }
  return result
}
/**
 * 判断当前浏览器是不是pc，始终以屏幕大小为准
 */
export function isPc () {
  let sm = 768
  return window.innerWidth >= sm
}
/**
 * 生成指定随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
export function rand (min, max) {
  return Math.random() * (max - min) + min
}
/* eslint-disable-next-line */
Number.prototype.inRange = function (range) {
  if (this >= range[0] && this <= range[1]) {
    return true
  }
  return false
}
/**
 * 窗口变化，防抖监听，宽度不变，高度变化超过很多时，认为是掉动了输入法
 * @param {function} handler 处理函数
 */
export function handleResizeDebounce (handler) {
  let preWidth = window.innerWidth
  let preHeight = window.innerHeight
  window.addEventListener('resize', debounce((e) => {
    if ((preWidth !== window.innerWidth) || (preHeight - window.innerHeight) < 200) {
      handler(e)
      // 这是额外的工作，本不该放在这里
      document.body.classList.remove('has-keyboard')
    } else {
      // 这是额外的工作，本不该放在这里
      document.body.classList.add('has-keyboard')
    }
    if (preHeight < window.innerHeight) {
      // 这是额外的工作，本不该放在这里
      document.body.classList.remove('has-keyboard')
    }
    preWidth = window.innerWidth
    preHeight = window.innerHeight
  }, 100))
}
/**
 * 键值对的映射
 * @param {Object} obj 要映射的对象
 * @param {string[]|string[][]} keys 键映射
 * @param {boolean} filter 是否过滤模式，如果是，只保留keys中的键
 */
export function mapKey (obj, keys, filter) {
  let result = filter ? {} : Object.assign({}, obj)
  keys.forEach(key => {
    let sourceKey = Array.isArray(key) ? key[0] : key
    let targetKey = Array.isArray(key) ? key[1] : key
    delete result[sourceKey]
    result[targetKey] = obj[sourceKey]
  })

  return result
}

const phoneReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
/**
 * 检测手机号
 * @param {string} phone 手机号
 */
export function checkPhone (phone) {
  return phoneReg.test(phone)
}
const nameReg = /^([\u4e00-\u9fa5]){2,7}$/
export function checkName (name) {
  return nameReg.test(name)
}
/**
 * 获取微信签名所需Url
 */
export function getUrl () {
  // return location.href.split('#')[0].split('?')[0].replace(/\/$/, '')
  return location.href.split('#')[0].split('?')[0]
}
