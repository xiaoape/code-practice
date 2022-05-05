// 获取上一轮的 props 或 state
import {
    useEffect,
    useRef,
} from 'react'
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

export default usePrevious;