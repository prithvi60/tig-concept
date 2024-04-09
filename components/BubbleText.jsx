import React from 'react'

export const BubbleText = () => {
  return (
    <h2 className="text-5xl text-center text-white font-SpaceGrotesk">
      {"The Internet Generation".split("").map((child, idx) => (
        <span className="hoverText" key={idx}>
          {child}
        </span>
      ))}
    </h2>
  )
}
