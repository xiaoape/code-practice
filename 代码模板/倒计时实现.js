// 使用 requestAnimationFrame实现倒计时
// setInterval是宏任务，定时器不准，遇到线程被阻塞后，会有很大的误差
// 使用setTimeout实现，通过计算setInterval延迟了多久，然后动态的设置下次setTimeout触发的时间去修正误差
// setTimout能明显降低误差，但是setTimeout依旧是宏任务，依旧会被阻塞，如果使用动画依旧可能会掉帧，而且不好
// 的地方是在校准时间的过程中，为了快速追赶落后的时间，时间跳动太快了，导致体验不太好，体感上感觉这时间不准

// setTimeout，setInterval属于JS引擎，RAF属于GUI引擎，RAF不受JS线程阻塞
// 注意单纯的使用RAF依然会存在误差
import React, { useState, useEffect, useRef } from "react";
const [count, setCount] = useState < number > (0)
const [duration, setTotalDuration] = useState < number > (0)
const requestRef = useRef(null);
const previousTimeRef = useRef(null);
const currentCountRef = useRef < number > (0);

const animate = time => {
    if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        if (deltaTime > 1000) {
            if (currentCountRef.current > 0) {
                previousTimeRef.current = time;
                setCount(prevCount => {
                    currentCountRef.current = prevCount - 1000
                    return prevCount - 1000
                });
            } else {
                setCount(0)
                cancelAnimationFrame(requestRef.current);
                return
            }
        }
    } else {
        previousTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(animate);
}

useEffect(() => {
    const totalDuration = 60 * 1000
    setCount(totalDuration)
    setTotalDuration(totalDuration)
}, [])

useEffect(() => {
    if (duration <= 0) {
        return
    }
    currentCountRef.current = duration
    previousTimeRef.current = undefined
    if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current)
}, [duration])

// 参考链接：https://juejin.cn/post/7022636375136534565
// https://juejin.cn/post/7026735190634414087
