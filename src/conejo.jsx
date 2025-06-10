import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function Conejo({ animation, loop }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/ch_conejo.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && actions[animation]) {
      // Configura el loop según la prop
      actions[animation].setLoop(loop ? 2201 : 2200); // 2201 = LoopRepeat, 2200 = LoopOnce
      actions[animation].reset().fadeIn(0.5).play();
      
      return () => {
        actions[animation]?.fadeOut(0.5);
      };
    }
  }, [animation, actions, loop]);

  return <primitive object={scene} ref={group} />;
}

useGLTF.preload('/ch_conejo.glb');