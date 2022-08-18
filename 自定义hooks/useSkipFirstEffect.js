// 跳过首次effect执行
import { useEffect, useRef } from 'react'

const useSkipFirstEffect = (effect, deps) => {
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }

    return !!effect && effect()
  }, deps)
}

export default useSkipFirstEffect
