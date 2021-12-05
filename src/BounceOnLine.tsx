import React from 'react'
import {useStyle} from './hooks'
import withContext from './withContext'

interface BounceOnLineProps {
    w : number, 
    h : number,
    onClick : Function, 
    scale : number, 
}
const BounceOnLine = (props : BounceOnLineProps) => {
    const {lineStyle, rectStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <React.Fragment>
            <div onClick = {() => props.onClick()} style = {rectStyle()}></div>
            <div style = {lineStyle()}></div>
        </React.Fragment>
    )
}

export default withContext(BounceOnLine)