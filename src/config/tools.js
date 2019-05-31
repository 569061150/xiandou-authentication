// 非空判断
export const isNull = (obj) => {
  if (obj != null && obj != 'undefined' && obj != 'null' && typeof(obj) != 'undefined' && obj != undefined && obj != '') {
    return false;
  } else {
    return true;
  }
}

// 获取地址栏参数
export const getQueryString = (paras) => {
  let url = location.href;
  let paraString = url.substring(url.indexOf('?') + 1, url.length).split('&');
  let paraObj = {};
  let j;
  for (let i = 0; i++;) {
    j = paraString[i];
    paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(j.indexOf('=') + 1, j.length);
  }
  let returnValue = paraObj[paras.toLowerCase()];
  if (typeof(returnValue) == 'undefined') {
    return '';
  } else {
    return decodeURIComponent(returnValue);
  }
}

// 格式化日期
export const format = (data) => {
  let s = '';
  let mouth = (data.getMonth() + 1) >= 10 ? (data.getMonth() + 1) : ('0' + (data.getMonth() + 1));
  let day = data.getDate() >= 10 ? data.getDate() : ('0' + data.getDate());
  s += data.getFullYear() + '-';
  s += mouth + '-';
  s += day;
  return (s);
}

// 获取星期几
export const getWekDay = (weekDay) => {
  switch (weekDay) {
    case 0:
      weekDay = '日';
      break;
    case 1:
      weekDay = '一';
      break;
    case 2:
      weekDay = '二';
      break;
    case 3:
      weekDay = '三';
      break;
    case 4:
      weekDay = '四';
      break;
    case 5:
      weekDay = '五';
      break;
    case 6:
      weekDay = '六';
      break;
  }
  return weekDay;
}

// 获取几天后的日期
export const getToDay = (n) => {
  let dd = new Date();
  dd.setDate(dd.getDate() + n); // 获取AddDayCount天后的日期
  let y = dd.getFullYear();
  let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);// 获取当前月份的日期，不足10补0
  let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();// 获取当前几号，不足10补0
  return y + '-' + m + '-' + d;
}

// 获取两个日期之间的所有日期
export const getAllDate = (begin, end) => {
  let allDate = [];
  let dayList = [];
  let dd = new Date(end);
  let targetday_milliseconds = dd.getTime() + 1000 * 60 * 60 * 24 * (6 - (new Date(end).getDay()));
  dd.setTime(targetday_milliseconds); // 注意，这行是关键代码
  let tYear = dd.getFullYear();
  let tMonth = dd.getMonth() + 1;
  let tDate = dd.getDate();
  end = tYear + '-' + tMonth + '-' + tDate;
  let ab = begin.split('-');
  let ae = end.split('-');
  let db = new Date();
  db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
  let de = new Date();
  de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
  let unixDb = db.getTime();
  let unixDe = de.getTime();
  for (let k = unixDb; k <= unixDe;) {
    let all = format((new Date(parseInt(k))));
    allDate.push(all);
    k = k + 24 * 60 * 60 * 1000;
  }

  // 将所有日期按照7天一个list存储
  let n = 7;
  let start = 0;
  end = start + n;
  for (let i = 0; i < allDate.length / 7; i++) {
    dayList.push(allDate.slice(start, end));
    start += n;
    end += n;
  }
  return dayList;
}

// 到下一级页面
export const goPage = (router, page) => {

  // if(fucId != undefined) userReport(fucId);
  if (page == 'back') {
    router.go(-1);
  } else {
    router.push(page);
  }
}

export const getDevice = () => {
  let u = window.navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  return isAndroid ? 'Android' : isIOS ? 'IOS' : 'Other';
}

// 拼接开始时间与结束时间
export const timeQuantum = (beginTime, endTime, flag) => {
  if (flag) { // falg为true代表返回包含日期的时间格式
    let d = endTime.split(' ')[0];
    let dateQuan = d.substr(0, 4) + '年' + d.substr(5, 2) + '月' + d.substr(8, 2) + '日';
    return dateQuan + ' ' + beginTime.substr(11, 5) + '-' + endTime.substr(11, 5);
  } else {
    return beginTime.substr(11, 5) + '-' + endTime.substr(11, 5);
  }
}

// 求两个时间的天数差 日期格式为 YYYY-MM-dd
export const daysBetween = (DateOne, DateTwo) => {
  let OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
  let OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
  let OneYear = DateOne.substring(0, DateOne.indexOf('-'));

  let TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
  let TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
  let TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));

  let cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
  return Math.abs(cha);
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
}

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
  let oldScrollTop;
  document.body.addEventListener('scroll', () => {
    loadMore();
  }, false)

  // 运动过程中保持监听 scrollTop 的值判断是否到达底部
  element.addEventListener('touchmove', () => {
    loadMore();
  }, {passive: true})

  // 运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
  element.addEventListener('touchend', () => {
    oldScrollTop = document.body.scrollTop;
  }, {passive: true})

  const loadMore = () => {
    if (document.body.scrollTop + window.innerHeight >= document.querySelector('html').scrollHeight) {
      callback();
    }
  }
}

export const autoTextarea = (elem, extra, maxHeight) => {

  // 判断elem是否为数组
  if (elem.length > 0) {
    for (let i = 0; i < elem.length; i++) {
      e(elem[i]);
    }
  } else {
    e(elem);
  }

  function e(elem) {
    extra = extra || 0;
    let isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
      isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
      addEvent = function (type, callback) {
        elem.addEventListener ? elem.addEventListener(type, callback, false) : elem.attachEvent('on' + type, callback);
      },
      getStyle = elem.currentStyle ? function (name) {
        let val = elem.currentStyle[name];

        if (name === 'height' && val.search(/px/i) !== 1) {
          let rect = elem.getBoundingClientRect();
          return rect.bottom - rect.top -
            parseFloat(getStyle('paddingTop')) -
            parseFloat(getStyle('paddingBottom')) + 20 + 'px';
        }
        ;

        return val;
      } : function (name) {
        return getComputedStyle(elem, null)[name];
      },
      minHeight = parseFloat(getStyle('height'));

    elem.style.resize = 'none';

    let change = function () {
      let scrollTop, height,
        padding = 0,
        style = elem.style;

      if (elem._length === elem.value.length) return;
      elem._length = elem.value.length;

      if (!isFirefox && !isOpera) {
        padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
      }
      ;
      scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

      elem.style.height = minHeight + 'px';
      if (elem.scrollHeight > minHeight) {
        if (maxHeight && elem.scrollHeight > maxHeight) {
          height = maxHeight - padding;
          style.overflowY = 'auto';
        } else {
          height = elem.scrollHeight - padding;
          style.overflowY = 'hidden';
        }
        ;
        style.height = height + extra + 'px';
        scrollTop += parseInt(style.height) - elem.currHeight;
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
        elem.currHeight = parseInt(style.height);
      }
      ;
    };

    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
  }
}

/**
 * getTimeType
 */
export const getTimeType = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
}




// export const lazy = name => {
//   if (name.indexOf("_") != -1) {
//     return () => import(`@/page${name}.vue`)
//   } else {
//    return () => import(`@/components/defaut/main.vue`)
//   }
// }
//
//
//
// export const generaMenu = (routers, data) => {
//
//   // 将路由信息，菜单信息，用户信息存到sessionStorage里   () => import(`@/components/${name}.vue`)
//   data.forEach((item) => {
//     let menu = []
//     if (item.subs) {
//       generaMenu(routers, item.subs)
//     }
//     menu = {
//       component: lazy(item.index),
//       path: item.index,
//       name: item.index
//     }
//     routers.push(menu)
//   })
//
// }
