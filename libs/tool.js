
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
  if (!date || (date + '' === 'Invalid Date') || !fmt) {
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
* 保存数据到localStorage, 可设置时间
* @param {string} key 键
* @param {object} data 值
* @param {int} timeOut 超时时间，毫秒
*/
export function lsgSaveData (key, data, timeOut) {
  if (!key || !data) {
    return;
  }
  data = {
    value: data
  };
  if (timeOut) {
    data.time = new Date().getTime();
    data.timeOut = timeOut;
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
  var data = JSON.parse(localStorage.getItem(key));
  if (data) {
    var time = data.time;
    var timeOut = data.timeOut;
    if (timeOut && ((new Date().getTime() - time) > timeOut)) {
      // 时长失效了
      data =  '';
      localStorage.removeItem(key);
    } else {
      data = data.value;
    }
  }
  return data;
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
 * database64文件格式转换为2进制
 *
 * @param  {[String]} data dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
 * @param  {[String]} mime [description]
 * @return {[blob]}      [description]
 */
export function data2blob (data, mime) {
	data = data.split(',')[1];
	data = window.atob(data);
  var ia = new Uint8Array(data.length);
  
	for (var i = 0;i < data.length;i++) {
		ia[i] = data.charCodeAt(i);
	}
	// canvas.toDataURL 返回的默认格式就是 image/png
	return new Blob([ia], {
		type: mime
	});
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
* 密码校验, 最少6位，包括至少1个数字，1个大写字母，1个小写字母，1个特殊字符
*/
export function checkPassword (str) {
  var reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;

  return reg.test(str);
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

/**
*生成唯一ID
*/
export function guid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

/**
*解析类似地址栏Url格式的字符串
*/
export function parseUrlStr (str) {
  str = str.split('://');
  str = str[str.length - 1];
  str = str.split('?');
  var hostname = str[0] || '';
  var search = str[1] || '';
  var query = '';
  if (search) {
    query = search.replace(/=/g, '":"').replace(/&/g, '","');
    query = '{"' + query + '"}';
    try { query = JSON.parse(query); } catch (e) { query = ''; }
  }
  return {
    hostname: hostname,
    search: search,
    query: query
  };
}

/**
*组装地址栏Url
*@paramObj - 地址栏参数对象
*/
export function formatUrl (url, paramObj) {
  for (var key in paramObj) {
    var value = paramObj[key];
    var symbol = url.indexOf('?') < 0 ? '?' : '&';
    if (url.indexOf('?' + key + '=') < 0 && url.indexOf('&' + key + '=') < 0) {
      url += symbol + key + '=' + value;
    }
  }
  return url;
}

/**
*计算dom元素是否在可见范围之内
*/
export function isVisible (dom, parantDom) {
  var result = '';

  if (dom && parantDom) {
    result = !(parantDom.scrollTop >= (dom.offsetTop + dom.offsetHeight) || (parantDom.scrollTop + parantDom.offsetHeight) <= (dom.offsetTop + dom.offsetHeight));
  }
  // console.log('(parantDom.scrollTop >= (dom.offsetTop + dom.offsetHeight) || (parantDom.scrollTop + parantDom.offsetHeight) <= (dom.offsetTop + dom.offsetHeight))');
  // console.log('(' + parantDom.scrollTop + '>=(' + dom.offsetTop + '+' + dom.offsetHeight + ') || (' + parantDom.scrollTop + '+' + parantDom.offsetHeight + ') <= (' + dom.offsetTop + '+' + dom.offsetHeight + '))');
  return result;
}

/**
*是否为空
*/
export function isNull (data) {
  var result = data + '';
  return result === '{}' || result === '' || result === 'undefined' || result === 'null';
}

/**
* 数组中2个元素位置对调
*/
export function arrSwap (arr, index1, index2) {
  return arr.splice(index1, 1, arr.splice(index2, 1, arr[index1]));
}

/**
* 数组中移动元素到指定位置
* @param {int} moveInd - 目标位置下标
* @param {int} moveToInd - 移动到指定位置下标
* @param {int} isBeforAfter - 0：前面插入、1：后面插入（默认）
*/
export function moveArray (arr, moveInd, moveToInd, isBeforAfter) {
  var item = arr.splice(moveInd, 1);
  if (isBeforAfter === 0) {
      moveToInd -= 1;
  }
  arr.splice(moveToInd, 0, item[0]);
}

/**
* 监听元素子节点变化
* @param {Dom} dom - 监听的目标 - document.getElementById(this.id)
* @param {function} cbk - 回调
*/
export function addDomChildChange (dom, cbk) {
  var callback = function (records) {
    records.map(function (record) {
      cbk && cbk();
    });
  };
  var mo = new MutationObserver(callback);
  var option = {
    'childList': true,
    'subtree': true
  };

  mo.observe(dom, option);
}

/**
* 判断参数是否为空， []|{}|''|null|undefined 都为空
* @param {Object} obj -  参数
*/
export function isEmpty (obj) {
  var objstr = JSON.stringify(obj);
  
  return typeof obj === 'undefined' || obj === null || obj === '' || objstr === '{}';
}

/**
* 判断节点是否含有指定class
* @param {Object} obj -  dom对象
*/
export function hasClass (obj, cls) {
  // 获取 class 内容
  var objClass = obj.className;
  // 通过split空字符将cls转换成数组.
  var objClassLst = objClass.split(/\s+/);
  var x = 0;
  for(x in objClassLst) {
    // 循环数组, 判断是否包含cls
    if(objClassLst[x] === cls) {
      return true;
    }
  }
  return false;
}

/**
* 删除节点 class
* @param {Object} obj -  dom对象
*/
export function removeClass (obj, cls) {
  // 获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
  var objClass = ' ' + obj.className + ' ';
  // 将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
  objClass = objClass.replace(/(\s+)/gi, ' ');
  // 在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
  var removed = objClass.replace(' ' + cls + ' ', ' ');
  // 去掉首尾空格. ex) 'bcd ' -> 'bcd'
  removed = removed.replace(/(^\s+)|(\s+$)/g, '');
  // 替换原来的 class.
  obj.className = removed;
}

/**
* 添加节点class
* @param {Object} obj -  dom对象
*/
export function addClass (obj, cls) {
  // 获取 class 内容.
  var objClass = obj.className;
  // 判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
  var blank = (objClass != '') ? ' ' : '';
  // 组合原来的 class 和需要添加的 class.
  var added = objClass + blank + cls;
  // 替换原来的 class.
  obj.className = added;
}

/**
* 获取cookie值
*/
export function getCookie (cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
       }
       if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
       }
   }
  return "";
} 

/**
* 设置cookie值
*/
export function setCookie (cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
} 

/**
* 获取某月总天数
*/
export function getMonthAllDays (year, month) {
  var d = new Date();
  d.setFullYear(year || new Date().getFullYear());
  d.setMonth(month || new Date().getMonth() + 1);
  d.setDate(0);
  return d.getDate();
}