import React from 'react'

export const BubbleText = ({value}) => {
  return (
    <div className="h-16 text-5xl font-thin text-center text-white">
      {`${value}`.split("").map((child, idx) => (
        <span className={"hoverText cursor-wait"} key={idx}>
          {child}
        </span>
      ))}
    </div>
  )
}
