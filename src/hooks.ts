import {useState, useEffect, CSSProperties} from 'react'

const delay : number = 20 
const scGap : number = 0.01 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {

        }
    })
    return {
        w, 
        h, 
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)
const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 


export const useStyle = (w : number, h : number, scale : number) => {
    const background : string = "indigo"
    const size : number = Math.min(w, h) / 10 
    const position = 'absolute'
    const sf : number = Math.sin(scale * Math.PI)
    const sc1 : number = divideScale(sf, 0, 2)
    const sc2 : number = divideScale(sf, 1, 2)
    return {
        rectStyle() : CSSProperties {
            const left = `${w / 2 - size / 2}px`
            const top = `${h / 2 - size / 2 - (h / 2 - size / 2) * sc2}px`
            const width = `${size}px`
            const height = `${size / 2}px`
            const transform = `rotate(${180 * sc2}deg)`
            return {
                position, 
                background, 
                left, 
                top, 
                width, 
                height, 
                transform
            }
        },
        lineStyle() : CSSProperties {
            const lineWidth = Math.min(w, h) / 90
            const left = `0px`
            const top = `${h / 2 - lineWidth / 2}px`
            const width = `${w * sc1}px`
            const height = `${lineWidth}px`
            return {
                left, 
                top, 
                width,
                height, 
                background, 
                position
            }
        }
    } 
}