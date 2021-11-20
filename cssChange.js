/*
 * @LastEditTime: 2021-11-20 22:07:54
 * @LastEditors: jinxiaojian
 */
function cssChange (num) {
  document.getElementById('content').style.cssText = ` grid-template-columns: 1fr 1fr ${num}fr`;
}