import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";

export function Device(props) {
  const { nodes, materials } = useGLTF("/record_player.glb");
  return (
    <group {...props} dispose={null} scale={[4,4,4]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials.wood}
        position={[0, 0, -0.35]}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={materials.wood}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003.geometry}
        material={materials.wood}
        position={[-0.257, -0.003, -0.175]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={materials["Light blue metal"]}
        position={[0, 0.095, -0.175]}
        scale={[0.892, 0.892, 0.838]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane005.geometry}
        material={materials.wood}
        position={[0, 0.002, -0.175]}
        scale={[0.25, 0.405, 0.168]}
      />
      <group position={[0, 0.05, 0.008]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials["plastic metalic"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_2.geometry}
          material={materials.background}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_3.geometry}
          material={materials["button label 1"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_4.geometry}
          material={materials["button label 2"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_5.geometry}
          material={materials["button label 3"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_6.geometry}
          material={materials["off/on button label"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials.rubber}
        position={[-0.186, 0.049, 0.008]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.014, 0.014, 0.008]}
      />
      {/* Record Arm */}
      <motion.group
           initial={{
            scale:0
        }}
        animate={{
        //   y: section === 0 ? 0 : -1,
          scale:1
        }}
      
      >
      <group
        position={[0.187, 0.12, -0.213]}
        rotation={[-0.004, -0.677, -0.001]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials.metal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_2.geometry}
          material={materials["white plastic"]}
        />
      </group> 
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={materials["plastic metalic"]}
        position={[0.187, 0.12, -0.213]}
        rotation={[1.567, -0.001, 0.677]}
        scale={[0.004, 0.037, 0.004]}
      />
      <group
        position={[0.187, 0.12, -0.213]}
        rotation={[-0.004, -0.677, -0.001]}
        scale={[-0.01, -0.009, -0.051]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_1.geometry}
          material={materials["hard plastic black"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_2.geometry}
          material={materials["white plastic"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_3.geometry}
          material={materials["triangle icon"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder005.geometry}
        material={materials.metal}
        position={[0.187, 0.117, -0.213]}
        rotation={[-0.004, -0.677, -0.001]}
        scale={[0, 0.005, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials["hard plastic black"]}
        position={[0.187, 0.12, -0.213]}
        rotation={[-0.004, -0.677, -0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials["hard plastic black"]}
        position={[0.187, 0.111, -0.254]}
        rotation={[-0.003, -Math.PI / 9, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006.geometry}
        material={materials["plastic metalic"]}
        position={[0.187, 0.12, -0.213]}
        rotation={[-0.004, -0.328, -0.001]}
        scale={[0.003, 0.002, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials.metal}
        position={[0.187, 0.12, -0.213]}
        rotation={[-0.003, 0, 0]}
        scale={[-0.004, 0, -0.004]}
      />
      </motion.group>
      <group
        position={[0.178, 0.111, -0.244]}
        rotation={[-0.003, -Math.PI / 9, 0]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={materials["hard plastic black"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008_1.geometry}
          material={materials["plastic metalic"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007.geometry}
        material={materials.wire}
        position={[0.187, 0.104, -0.192]}
        rotation={[-1.059, 0, 0]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007.geometry}
        material={materials.wood}
        position={[0, 0.095, -0.175]}
      />
      <group
        position={[-0.184, 0.103, -0.075]}
        rotation={[0, 0.908, 0]}
        scale={[0.022, 0.001, 0.022]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder009_1.geometry}
          material={materials["hard plastic black"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder009_2.geometry}
          material={materials["hard plastic white"]}
        />
      </group>
      <group position={[0.187, 0.12, -0.203]} scale={[0.117, 0.088, 0.117]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder011_1.geometry}
          material={materials.vinyl}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder011_2.geometry}
          material={materials["Light blue metal"]}
        />
      </group>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder011.geometry}
        material={materials.metal}
        position={[-0.233, 0.096, -0.02]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-0.005, -0.001, -0.005]}
      />
      <group
        position={[0.033, 0.047, 0.017]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.016, 0.009, 0.016]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005_1.geometry}
          material={materials.rubber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005_2.geometry}
          material={materials["button metalic part"]}
        />
      </group>
      <group
        position={[0.095, 0.047, 0.017]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.016, 0.009, 0.016]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_1.geometry}
          material={materials.rubber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_2.geometry}
          material={materials["button metalic part"]}
        />
      </group>
      <group
        position={[0.157, 0.047, 0.017]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.016, 0.009, 0.016]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder012_1.geometry}
          material={materials.rubber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder012_2.geometry}
          material={materials["button metalic part"]}
        />
      </group>
      <group
        position={[-0.091, 0.048, 0.01]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.001, 0, 0]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_1.geometry}
          material={materials["light "]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_2.geometry}
          material={materials["dark light"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder012.geometry}
        material={materials["light indicator"]}
        position={[-0.091, 0.048, 0.008]}
        scale={[0.011, 0.003, 0.003]}
      />
    </group>
  );
}

useGLTF.preload("/record player.glb");
