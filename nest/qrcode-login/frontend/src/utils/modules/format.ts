/**
 * 数字格式化，以万为单位
 * @param {number} num 数字
 * @returns {string} 格式化后的字符串
 */

function formatNum(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + "万";
  } else {
    return num.toString();
  }
}

export default formatNum;
