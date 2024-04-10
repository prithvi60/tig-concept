import React from 'react'

export const BubbleText = ({value}) => {
  return (
    <h2 className="text-5xl text-center text-white font-SpaceGrotesk">
      {`${value}`.split("").map((child, idx) => (
        <span className="hoverText" key={idx}>
          {child}
        </span>
      ))}
    </h2>
  )
}
