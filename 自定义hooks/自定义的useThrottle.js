// 自定义的useThrottle
import {
    useEffect,
    useRef,
    useCallback
} from 'react'

function useThrottle(fn, delay, dep = []) {
    const { current } = useRef({ fn, timer: null });
    useEffect(function () {
        current.fn = fn;
    }, [fn]);

    return useCallback(function f(...args) {
        if (!current.timer) {
            current.timer = setTimeout(() => {
                delete current.timer;
            }, delay);
            current.fn.call(this, ...args);
        }
    }, dep);
}

export default useThrottle