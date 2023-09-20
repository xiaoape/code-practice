// 自定义的useDebounce
// 这种和直接使用普通函数debounce有什么区别？好像没必要封装成hooks
import {
    useEffect,
    useRef,
    useCallback
} from 'react'

function useDebounce(fn, delay, dep = []) {
    const { current } = useRef({ fn, timer: null });
    useEffect(function () {
        current.fn = fn;
    }, [fn]);

    return useCallback(function f(...args) {
        if (current.timer) {
            clearTimeout(current.timer);
        }
        current.timer = setTimeout(() => {
            current.fn.call(this, ...args);
        }, delay);
    }, dep)
}

export default useDebounce