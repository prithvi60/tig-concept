import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const DiscThree = (props) => {
  const groupRef = useRef();

  const { nodes, materials } = useGLTF("/record.glb");

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* disc 1 */}
      <group scale={[0.1, 0.1, 0.1]} position={[0, -12, 0]}>
        <mesh
          castShadow={true}
          receiveShadow={true}
          geometry={nodes.VinylRecord3_VinylRecord3_0.geometry}
          material={materials.VinylRecord3}
          rotation={[-0.357, 0.1, 0.984]}
        />
      </group>
      {/* disc 2 */}

      <group scale={[0.1, 0.1, 0.1]} position={[0, -8, 0]}>
        <mesh
          castShadow={true}
          receiveShadow={true}
          geometry={nodes.VinylRecord3_VinylRecord3_0.geometry}
          material={materials.VinylRecord3}
          rotation={[-0.357, 0.1, 0.984]}
        />
      </group>
      {/* disc 3 */}

      <group scale={[0.1, 0.1, 0.1]} position={[0, -4, 0]}>
        <mesh
          castShadow={true}
          receiveShadow={true}
          geometry={nodes.VinylRecord3_VinylRecord3_0.geometry}
          material={materials.VinylRecord3}
          rotation={[-0.357, 0.1, 0.984]}
        />
      </group>
      {/* disc 4 */}

      <group scale={[0.1, 0.1, 0.1]} position={[0, 0, 0]}>
        <mesh
          castShadow={true}
          receiveShadow={true}
          geometry={nodes.VinylRecord3_VinylRecord3_0.geometry}
          material={materials.VinylRecord3}
          rotation={[-0.357, 0.1, 0.984]}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/record.glb");
export default DiscThree;
