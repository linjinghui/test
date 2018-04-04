
/**
* 获取地址栏参数
* @param {string} name - 参数名称
*/
export function getUrlParamt (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var search = window.location.href.split('?');
  search = search && search.length > 1 ? search[1] : '';
  var r = search.match(reg);

  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

/**
* 日期转换为指定格式的字符串
* @param {date} date 日期
* @param {string} fmt 日期格式 yyyy-MM-dd HH:mm:ss
*/
export function dataFormat (date, fmt) {
  if (!date || !fmt) {
    return "";
  }
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

/**
* 日期智能转换为字符串
* @param {date} date 日期
*/
export function dataIntelligentFormat (date) {
  var year = date.getFullYear(),
  month = date.getMonth() + 1,
  day = date.getDate(),
  hours = date.getHours(),
  minutes = date.getMinutes(),
  seconds = date.getSeconds();
  var curYear = new Date().getFullYear(),
  curMonth = new Date().getMonth() + 1,
  curDay = new Date().getDate();
  var dateStr = '';

  if (year === curYear && month === curMonth && day === curDay) {
    dateStr = '';
  } else if (year === curYear && month === curMonth && curDay-day === 1) {
    dateStr = '昨天 ';
  } else if (year === curYear && month === curMonth && curDay-day === 2) {
    dateStr = '前天 ';
  } else {
    month = month < 10 ? ('0' + month) : month;
    day = day < 10 ? ('0' + day) : day;

    dateStr = month + '-' + day + ' ';
    if (year !== curYear) {
      dateStr = year + '-' + dateStr;
    }
  }
  hours = hours < 10 ? ('0' + hours) : hours;
  minutes = minutes < 10 ? ('0' + minutes) : minutes;
  return dateStr + hours + ':' + minutes;
}

/**
* 字符串转换成日期
* @param {string} strDate 字符串日期
*/
export function strToData (strDate) {
  var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
  function(a) {
    return parseInt(a, 10) - 1;
  }).match(/\d+/g) + ')');
  return date;
}

/**
* 获取最近七天
* @param {number} dayNum 最近几天，负数表示往前
* @param {string} fmt 格式化日期
*/
export function getLastDay (dayNum, fmt) {
  dayNum = dayNum ? dayNum : -7;
  var today = new Date().getTime();
  var oneDay = 24* 60* 60* 1000;
  var result = [];

  for (var i = 0;i < Math.abs(dayNum);i++) {
    var day = '';

    if (dayNum > 0) {
      day = today + i* oneDay;
    } else {
      day = today - i* oneDay;
    }

    if (fmt) {
      day = this.dataFormat(new Date(day), fmt);
    }
    result[result.length] = day;
  }
  return result;
}

/**
* 保存数据到sessionStorage
* @param {string} key 键
* @param {object} data 值
*/
export function ssgSaveData (key, data) {
  if (!key || !data) {
    return;
  }
  data = JSON.stringify(data);
  sessionStorage.setItem(key, data);
}

/**
* 从sessionStorage获取数据
* @param {string} key 键
*/
export function ssgGetData (key) {
  if (!key) {
    return;
  }
  var data = sessionStorage.getItem(key);

  return JSON.parse(data);
}

/**
* 从sessionStorage获取数据后删除记录
* @param {string} key 键
*/
export function ssgGetDataDel (key, time) {
  if (!key) {
    return;
  }
  if (!time) {
    time = 0;
  }
  var data = ssgGetData(key);

  setTimeout(function () {
    ssgDeleteData(key);
  }, time);
  return data;
}

/**
* 删除 sessionStorage 中的数据 key 为空则清空 sessionStorage
* @param {string} key 键
*/
export function ssgDeleteData (key) {
  if (!key) {
    sessionStorage.clear();
  } else {
    sessionStorage.removeItem(key);
  }
}

/**
* 保存数据到localStorage
* @param {string} key 键
* @param {object} data 值
*/
export function lsgSaveData (key, data) {
  if (!key || !data) {
    return;
  }
  data = JSON.stringify(data);
  localStorage.setItem(key, data);
}

/**
* 从 localStorage 获取数据
* @param {string} key 键
*/
export function lsgGetData (key) {
  if (!key) {
    return;
  }
  var data = localStorage.getItem(key);
  return JSON.parse(data);
}

/**
* 从 localStorage 获取数据后删除记录
* @param {string} key 键
*/
export function lsgGetDataDel (key, time) {
  if (!key) {
    return;
  }
  if (!time) {
    time = 0;
  }
  var data = lsgGetData(key);

  setTimeout(function () {
    lsgDeleteData(key);
  }, time);
  return data;
}

/**
* 删除 localStorage 中的数据 key 为空则清空 localStorage
* @param {string} key 键
*/
export function lsgDeleteData (key) {
  if (!key) {
    localStorage.clear();
  } else {
    localStorage.removeItem(key);
  }
}

/**
* 去除数组中的重复的数据
* @param {array} arr 例如 ['zhangsan' 'lisi' 'wangmazi' 'zhangsan']
*/
export function unique(arr) {
  var result = [];
  var hash = {};

  for (var i = 0, elem; (elem = arr[i]) != null; i++) {
    if (!hash[elem]) {
      result.push(elem);
      hash[elem] = true;
    }
  }
  return result;
}

/**
* 一段时间内防止高频率调用
* @param {export function} func 函数体
* @param {number} wait 时间-单位毫秒
* @param {boolean} immediate 是否立即执行-可不传，默认false
*/
export function debounce (func, wait, immediate) {
  var timeout;

  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if(!immediate) {
        func.apply(context, args);
      }
    }
    var callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  }
}

/**
* 使函数只执行一次
* @param {export function} func 函数体
* @param {object} context 上下文-可不传
*/
export function once (func, context) {
  var result = '';

  return function () {
    if(func) {
      result = func.apply(context || this.arguments);
      func = null;
    }
    return result;
  };
}

/**
* 获取url绝对路径
* @param {string} url 路径名 - ./index.html
*/
export function getAbsoluteUrl (url) {
  var a = document.createElement('a');

  a.href = url;
  return a.href;
}

/**
* url - 指定域名地址 如：http://www.baidu.com/page/roote/
* rpath - 相对路径地址 如：../index
*/
export function getAbsoluteUrlByWebsite (url, rpath) {
  var str = '';

  if (!url) {
    str = '';
  } else if (!rpath) {
    str = url;
  } else {
    // 解析url
    var spt_1 = '://';
    var spt_2 = '/';

    // 检测并去除末尾的斜杠
    if (url.lastIndexOf(spt_2) === url.length - 1) {
      url = url.substr(0, url.length - 1);
    }

    var temp = url.split(spt_1);
    var prefix = (temp.length > 1) && temp[0];
    var pcontent = temp[temp.length - 1] || '';
    var temp_2 = pcontent.split(spt_2);

    // 解析rpath
    var preLayer = 0;
    var spt_3 = '/';
    var spt_4 = './';
    var spt_5 = '../';

    if (rpath.indexOf(spt_3) === 0) {
      // 当前层级
      preLayer = 0;
      rpath = rpath.substr(1);
    } else if (rpath.indexOf(spt_4) === 0) {
      // 当前层级
      preLayer = 0;
      rpath = rpath.replace(/\.\//g, '');
    } else if (rpath.indexOf(spt_5) === 0) {
      // 最少是上一层级
      // 计算 ../ 出现的次数
      var regex = new RegExp(spt_5, 'g');
      var result = rpath.match(regex);

      preLayer = !result ? 0 : result.length;
      rpath = rpath.replace(/\.\.\//g, '');
    }
    str = temp_2.slice(0, temp_2.length - preLayer);
    str = prefix + spt_1 + str.join(spt_3) + spt_3 + rpath;
  }
  return str;
}

/**
* 下载文件
* @param {string} url 文件地址
*/
export function downloadFile (url) {
  var id = 'download_frame';
  var iframe = document.getElementById(id);

  if (iframe) {
    document.body.removeChild(iframe);
  }
  iframe = document.createElement('iframe');
  iframe.id = id;
  iframe.style.display = 'none';
  iframe.src = url;
  document.body.appendChild(iframe);
}

/**
* 下载文件通过blob数据
* @param {blob} blobData 文件数据
* @param {string} fileName 文件名称
*/
export function downloadFileByBlob (blobData, fileName) {
  var urlCreator = window.URL || window.webkitURL;
  var event = document.createEvent('MouseEvents');
  var link = document.createElement('a');
  var blob = new Blob([blobData]);
  var url = urlCreator.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  link.dispatchEvent(event);
}

/**
* 判断设置类型
*/
export function browerVersion () {
  var u = navigator.userAgent, app = navigator.appVersion;
  return {
    // IE内核
    trident: u.indexOf('Trident') > -1,
    // opera内核
    presto: u.indexOf('Presto') > -1,
    // 苹果、谷歌内核
    webKit: u.indexOf('AppleWebKit') > -1,
    // 火狐内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
    // 是否为移动终端
    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
    // ios终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    // android终端或者uc浏览器
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    // 是否为iPhone或者QQHD浏览器
    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
    // 是否iPad
    iPad: u.indexOf('iPad') > -1,
    // 是否web应该程序，没有头部与底部
    webApp: u.indexOf('Safari') == -1,
    // 加mobile和这个属性一起，可以判断uc浏览器
    linux: u.indexOf('linux') > -1,
    // trident IE内核 并且包含WP7标示 windows phone7手机
    wp7: (u.indexOf('WP7') > -1) || (u.indexOf('Windows Phone OS') > -1)
  }
}

/**
* 是否邮箱
*/
export function isEmail (str) {
  var reg = "^[a-zA-Z0-9-_.*]+@[a-zA-Z0-9-_.*]+$";

  return new RegExp(reg).test(str);
}

/**
* 是否网址
*/
export function isWebsite (str) {
  var reg = "^(http|https)://[\\S]+$";

  return new RegExp(reg).test(str);
}

/**
* 是否手机
*/
export function isMobilePhone (str) {
  var reg = "^1[0-9]{10}$";

  return new RegExp(reg).test(str);
}

/**
* 是否纯数字
*/
export function isNumber (str) {
  var reg = "^[0-9]+$";

  return new RegExp(reg).test(str);
}

/**
* 是否纯汉字
*/
export function isChinese (str) {
  var reg = "^[\u4e00-\u9fa5]+$";

  return new RegExp(reg).test(str);
}

/**
* 清除所有选中状态
*/
export function clearAllSeletion () {
  if ("getSelection" in window) {
    window.getSelection().removeAllRanges();
  } else {
    document.selection.empty();
  }
}

/**
* 选中元素文本
* target: document.getElementById('p1')
*/
export function selectElement (target) {
  if (document.selection && target) {
    var range = document.body.createTextRange();

    range.moveToElementText(target);
    range.select();
  } else if (window.getSelection && target) {
    var range = document.createRange();

    range.selectNode(target);
    var selection = window.getSelection();

    selection.setAnchorNode = null;
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

/**
* 随机颜色
*/
export function getRandomColor () {
  return  '#' + (function (color) {
    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*15)]) && (color.length == 6) ? color : arguments.callee(color);
  })('');
}

/**
* 容量单位转换
* size: 容量大小
* initUnit: 初始单位
* decimals: 保留小数点位数
* targetUnit: 转换后的单位 - 可不传
*/
export function parseFileSize (size, initUnit, decimals, targetUnit) {
  size = parseInt(size);
  var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
  var initUnitIndex = units.indexOf(initUnit);

  while (size >= 1024) {
    size = size / 1024;
    ++initUnitIndex;
    if(units[initUnitIndex]==targetUnit)break;
  }
  return (size.toFixed(decimals) + ' ' + units[initUnitIndex]);
}

/**
*获取图片原始宽高
*/
export function getImageSourceSize (imgeUrl, callback) {
  if (imgeUrl) {
    var img = new Image();

    img.src = imgeUrl;
    img.onload = function () {
      callback({
        'width': img.width,
        'height': img.height
      });
    };
  }
}

/**
*去除html标签
*/
export function removeHtmlTag (str) {
  //去除HTML tag
  str = str.replace(/<\/?[^>]*>/g, '');
  //去除行尾空白
  str = str.replace(/[ | ]*\n/g, '');
  //去掉尾部空格
  str = str.replace(/&nbsp;/ig, '');
  return str;
}

/**
*根据文件名称，返回后缀，不识别的后缀返回 other
*/
export function getFileSuffix (fileName) {
  var result = '';

  if (fileName) {
    var suffixes = ['folder', 'txt', 'exe', 'dll', 'jpg', 'gif', 'bmp', 'png', 'rar', 'zip', 'iso', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'mp3', 'wav', 'mid', 'wmv', 'wma', 'avi', 'mpg', 'mkv', 'rmv', 'mp4', 'htm', 'html', 'pdf'];
    var suffix = (fileName.split('.').length === 1) ? 'folder' : (fileName.split('.')[fileName.split('.').length - 1]);

    suffix = suffix.toLowerCase();
    var a = suffixes.indexOf(suffix);

    if(a >= 0) {
      result = suffix;
    } else {
      result = 'other';
    }
  }
  return result;
}