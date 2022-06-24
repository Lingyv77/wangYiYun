export function setCookie(cname, cvalue, exdays) { //创建cookie  cname键  cvalue值 exdays到期
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 1000 * 60 * 60 * 24));//增加毫秒数 d对象的时间加长
  var expires = "expires=" + d.toUTCString();
  document.cookie = `${cname}=${cvalue};${expires};`;
}

export function getCookie(cname) {  //通过cname获取值
  var name = cname + '=';
  var decodeCookie = decodeURIComponent(document.cookie);
  var ca = decodeCookie.split('; ');
  for (var i = 0; i < ca.length; i++) {
    let c = ca[i];
    if (c.search(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
}

export function removeCookie(cname) {  //cookie删除
  document.cookie = `${cname}=;expires=${new Date(0)};`;
}
