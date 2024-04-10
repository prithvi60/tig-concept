import React from 'react'

export const BubbleText = ({value}) => {
  return (
    <div className="text-5xl text-center font-thin text-white h-20">
      {`${value}`.split("").map((child, idx) => (
        <span className={"hoverText cursor-wait"} key={idx}>
          {child}
        </span>
      ))}
    </div>
  )
}
