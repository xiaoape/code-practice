// 自定义的useScroll
// 传入一个元素的引用，返回滚动的x,y值
import {
    useState,
    useEffect
} from 'react'

const useScroll = (scrollRef) => {
    const [pos, setPos] = useState([0, 0])

    useEffect(() => {
        function handleScroll(e) {
            setPos([scrollRef.current.scrollLeft, scrollRef.current.scrollTop])
        }
        scrollRef.current.addEventListener('scroll', handleScroll, false)
        return () => {
            scrollRef.current.removeEventListener('scroll', handleScroll, false)
        }
    }, [])

    return pos
}

export default useScroll