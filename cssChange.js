/*
 * @LastEditTime: 2021-11-20 21:15:03
 * @LastEditors: jinxiaojian
 */
var widthKey = 33
function cssChange(key, top) {
  if (top) {
    widthKey = top;
  } else {
    if (widthKey + key >= 95 || widthKey + key <= 5) {
      alert('到达极限了!')
    } else {
      widthKey += key;
    }
  }
  widthKey2 = (99 - widthKey) / 2
  a.style.cssText = `width:${widthKey2}%`;
  b.style.cssText = `width:${widthKey2}%`;
  c.style.cssText = `width:${widthKey}%`;
}