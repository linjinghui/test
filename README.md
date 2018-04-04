# 常用工具类汇总

## getUrlParamt: 获取地址栏参数
@param {string} name - 参数名称

## dataFormat: 日期转换为指定格式的字符串
### @param {date} date 日期
### @param {string} fmt 日期格式 yyyy-MM-dd HH:mm:ss

dataIntelligentFormat: 日期智能转换为字符串
@param {date} date 日期

strToData: 字符串转换成日期
@param {string} strDate 字符串日期

getLastDay: 获取最近七天
@param {number} dayNum 最近几天，负数表示往前
@param {string} fmt 格式化日期

ssgSaveData: 保存数据到sessionStorage
@param {string} key 键
@param {object} data 值

ssgGetData: 从sessionStorage获取数据
@param {string} key 键

ssgGetDataDel: 从sessionStorage获取数据后删除记录
@param {string} key 键

ssgDeleteData: 删除 sessionStorage 中的数据 key 为空则清空 sessionStorage
@param {string} key 键

lsgSaveData: 保存数据到localStorage
@param {string} key 键
@param {object} data 值

lsgGetData: 从 localStorage 获取数据
@param {string} key 键

lsgGetDataDel: 从 localStorage 获取数据后删除记录
@param {string} key 键

lsgDeleteData: 删除 localStorage 中的数据 key 为空则清空 localStorage
@param {string} key 键

unique: 去除数组中的重复的数据
@param {array} arr 例如 ['zhangsan' 'lisi' 'wangmazi' 'zhangsan']

debounce: 一段时间内防止高频率调用
@param {export function} func 函数体
@param {number} wait 时间-单位毫秒
@param {boolean} immediate 是否立即执行-可不传，默认false

once: 使函数只执行一次
@param {export function} func 函数体
@param {object} context 上下文-可不传

getAbsoluteUrl: 获取url绝对路径
@param {string} url 路径名 - ./index.html

getAbsoluteUrlByWebsite: url - 指定域名地址 如：http://www.baidu.com/page/roote/
rpath - 相对路径地址 如：../index

downloadFile: 下载文件
@param {string} url 文件地址

downloadFileByBlob: 下载文件通过blob数据
@param {blob} blobData 文件数据
@param {string} fileName 文件名称

browerVersion: 判断设置类型

isEmail: 是否邮箱

isWebsite: 是否网址

isMobilePhone: 是否手机

isNumber: 是否纯数字

isChinese: 是否纯汉字

clearAllSeletion: 清除所有选中状态

selectElement: 选中元素文本
target: document.getElementById('p1')

getRandomColor: 随机颜色

parseFileSize: 容量单位转换
@param {number} size: 容量大小
@param {string} initUnit: 初始单位
@param {number} decimals: 保留小数点位数
@param {string} targetUnit: 转换后的单位 - 可不传

getImageSourceSize: 获取图片原始宽高

removeHtmlTag: 去除html标签

getFileSuffix: 根据文件名称，返回后缀，不识别的后缀返回 other
