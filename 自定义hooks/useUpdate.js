// useUpdate 实现组件的强制更新
// 强制更新的场景有哪些？
import { useState } from 'react'

const useUpdate = () => {
    const [, setFlag] = useState()
    const update = () => {
        setFlag(Date.now())
    }
  
    return update
  }

export default useUpdate