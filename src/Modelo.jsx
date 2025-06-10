import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Modelo() {
  const gltf = useGLTF('/ch_conejo.glb'); // carga desde /public
  return <primitive object={gltf.scene} scale={1} />;
}
