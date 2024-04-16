import { useAnimate } from "framer-motion";
import React, { useRef } from "react";
// import { FiMousePointer } from "react-icons/fi";

// export const Example = () => {
//   return (
//     <MouseImageTrail
//       renderImageBuffer={50}
//       rotationRange={25}
//       images={[
//         "../public/hover.png",
//         "../public/bg 1.png",
//         "../public/bg 2.png",
//         "../public/bg 3.png",
//         "../public/hover.png",
//         "../public/bg 1.png",
//         "../public/bg 2.png",
//         "../public/bg 3.png",
//       ]}
//     >
//       <section className="grid w-full h-screen bg-white place-content-center">
//         <p className="flex items-center gap-2 text-3xl font-bold text-black uppercase">
//           {/* <FiMousePointer /> */}
//           <span>Hover me</span>
//         </p>
//       </section>
//     </MouseImageTrail>
//   );
// };

export const MouseImageTrail = ({
  children,
  // List of image sources
  images,
  // Will render a new image every X pixels between mouse moves
  renderImageBuffer,
  // images will be rotated at a random number between zero and rotationRange,
  // alternating between a positive and negative rotation
  rotationRange,
  scrollDown
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Using the Pythagorean theorem to calculate the distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector);

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 0.5 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      // className={`relative flex flex-col items-center justify-center w-full space-y-3 h-dvh md:gap-6 xl:gap-14 ${
      //   scrollDown === false ? "block" : "hidden"
      // }`}
      className={`fixed top-0 w-full h-screen overflow-hidden -z-10 ${
        !scrollDown ? "block" : "hidden"
      }`}
      onMouseMove={handleMouseMove}
    >
      {children}
      {images.map((img, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="absolute top-0 left-0 object-cover w-20 h-20 border-2 border-black opacity-0 pointer-events-none rounded-xl bg-neutral-900"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};
