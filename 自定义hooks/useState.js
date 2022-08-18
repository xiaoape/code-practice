// 自定义useState
// 我们使用class组件更新状态时，setState会支持两个参数，一个是更新后的state或者回调式更新的state
// 另一个参数是更新后的回调函数

import {
    useEffect,
    useRef,
    useState
} from 'react'

const useXState = (initState) => {
    const [state, setState] = useState(initState)
    let isUpdate = useRef()
    const setXState = (state, cb) => {
        setState(prev => {
            isUpdate.current = cb
            return typeof state === 'function' ? state(prev) : state
        })
    }
    useEffect(() => {
        if (isUpdate.current) {
            isUpdate.current()
        }
    })

    return [state, setXState]
}

export default useXState