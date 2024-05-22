export const useDebounce = (mainFunction: any, delay: any) => {
  let timer: any;

  return function (...args: any[]) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
};
