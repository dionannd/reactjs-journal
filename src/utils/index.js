export function currencyFormat(num = 0) {
  const amount = Number(num);
  return "Rp. " + amount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export default function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
