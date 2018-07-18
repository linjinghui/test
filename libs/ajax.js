export function ajax () {
  var ajaxData = {
    type: arguments[0].type || 'GET',
    url: arguments[0].url || '',
    timeout: arguments[0].timeout || '',
    async: arguments[0].async || 'true',
    data: arguments[0].data || null,
    dataType: arguments[0].dataType || 'text',
    contentType: arguments[0].contentType || 'application/x-www-form-urlencoded',
    beforeSend: arguments[0].beforeSend || function () {},
    success: arguments[0].success || function () {},
    error: arguments[0].error || function () {},
    complete: arguments[0].complete || function () {}
  }
  // 处理get请求参数
  if (ajaxData.type.toLowerCase() === 'get' && ajaxData.data) {
    ajaxData.url += '?' + convertData(ajaxData.data);
  }
  var timer = '';
  var xhr = createxmlHttpRequest();
  // 处理超时
  if (ajaxData.timeout) {
    timer = setTimeout(function () {
       xhr.abort();
    }, ajaxData.timeout);
  }
  xhr.responseType = ajaxData.dataType;
  xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
  xhr.setRequestHeader('Content-Type', ajaxData.contentType);
  ajaxData.beforeSend(xhr);
  xhr.send(convertData(ajaxData.data));
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      timer && clearTimeout(timer);
      if (xhr.status == 200) {
        var result = '';
        try {
          result = JSON.parse(xhr.response);
        } catch (error) {
          result = xhr.response;
        }
        ajaxData.success(result);
        ajaxData.complete()
      } else {
        ajaxData.error(xhr.status)
        ajaxData.complete()
      }
    }
  }
}

function createxmlHttpRequest () {
  if (window.ActiveXObject) {
    return new ActiveXObject('Microsoft.XMLHTTP');
  } else if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }
}

function convertData (data){
  if( typeof data === 'object' ){
    var convertResult = '' ;
    for(var c in data){
      convertResult += c + '=' + data[c] + '&';
    }
    convertResult = convertResult.substring(0, convertResult.length-1)
    return convertResult;
  }else{
    return data;
  }
}