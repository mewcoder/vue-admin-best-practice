export default {
  inserted: function (el, binding) {
    el.addEventListener('click', debounce(binding.value));
  }
};

//https://juejin.cn/post/6844903944653651981

function debounce(fn, delay = 500, immediate = true) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate && !timer) {
      fn.apply(this, arguments);
    }
    timer = setTimeout(() => {
      if (!immediate) {
        fn.apply(this, arguments);
      } else {
        timer = null;
      }
    }, delay);
  };
}

// eslint-disable-next-line
function throttle(fn, timeout) {
  let last = 0;
  return function () {
    let now = Date.now();
    if (now - last > timeout) {
      fn.apply(this, arguments);
      last = now;
    }
  };
}
