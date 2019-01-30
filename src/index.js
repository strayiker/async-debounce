module.exports = (fn, delay, defaultValue) => {
  let timer = null;
  let prevPromise = null;

  const result = {
    value: defaultValue,
  };

  return async (...args) => {
    if (prevPromise) {
      if (result.error) {
        prevPromise.reject(result.value);
      } else {
        prevPromise.resolve(result.value);
      }
    }

    timer = clearTimeout(timer);
    prevPromise = null;

    return new Promise((resolve, reject) => {
      prevPromise = { resolve, reject };
      timer = setTimeout(async () => {
        try {
          result.value = await fn(...args);
          resolve(result.value);
        } catch (error) {
          result.value = error;
          result.error = true;
          reject(error);
        }
      }, delay);
    });
  };
};
