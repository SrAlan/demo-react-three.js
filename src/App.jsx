import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Conejo from './conejo';

function App() {
  const [gravityEnabled, setGravityEnabled] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('Idle_c');
  const [bgTransition, setBgTransition] = useState(0); // 0-1 para la transición
  const bgTimeout = useRef(null);

  // Maneja la transición del fondo
  useEffect(() => {
    if (gravityEnabled) {
      // Transición a azul oscuro
      let start = null;
      const duration = 1000;
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        setBgTransition(Math.min(progress, 1));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    } else {
      // Transición a cielo claro
      let start = null;
      const duration = 1000;
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = 1 - (timestamp - start) / duration;
        setBgTransition(Math.max(progress, 0));
        if (progress > 0) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }

    return () => {
      if (bgTimeout.current) clearTimeout(bgTimeout.current);
    };
  }, [gravityEnabled]);

  // Maneja las animaciones del conejo
  useEffect(() => {
    if (gravityEnabled) {
      setCurrentAnimation('Flotando');
    } else {
      setCurrentAnimation('aterrizando');
      bgTimeout.current = setTimeout(() => {
        setCurrentAnimation('Idle_c');
      }, 2000);
    }

    return () => {
      if (bgTimeout.current) clearTimeout(bgTimeout.current);
    };
  }, [gravityEnabled]);

  const toggleGravity = () => {
    setGravityEnabled(!gravityEnabled);
  };

  // Color de fondo: púrpura oscuro -> cielo claro
  const bgColor = `rgb(
  ${Math.floor(10 + (135 - 10) * (1 - bgTransition))}, 
  ${Math.floor(30 + (206 - 30) * (1 - bgTransition))}, 
  ${Math.floor(60 + (235 - 60) * (1 - bgTransition))}
  )`;



  return (
    <div style={{ 
      height: '100vh',
      width: '100vw',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: bgColor
    }}>
      <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
>

        {/* Estrellas visibles cuando gravityEnabled es TRUE */}
        {gravityEnabled && (
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={bgTransition * 2}
          />
        )}

        <ambientLight intensity={1.5} />
        <directionalLight 
          position={[1, 1, 1]} 
          intensity={1} 
          color={gravityEnabled ? '#d4e6ff' : '#ffffff'}
        />
        <Conejo 
          animation={currentAnimation} 
          loop={gravityEnabled || currentAnimation === 'Idle_c'}
        />
        <OrbitControls />
      </Canvas>

      {/* Título */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: 0,
        right: 0,
        zIndex: 1,
        textAlign: 'center',
      }}>
        <h1 style={{ 
          color: gravityEnabled ? '#d4e6ff' : 'white',
          textShadow: gravityEnabled ? '0 0 8px rgba(200,230,255,0.8)' : '2px 2px 4px rgba(0,0,0,0.8)',
          fontSize: '3rem',
          margin: 0,
          padding: '10px 20px',
          display: 'inline-block',
          backgroundColor: gravityEnabled ? 'rgba(0, 10, 30, 0.3)' : 'rgba(0, 0, 0, 0.14)',
          borderRadius: '10px',
          transition: 'all 2s ease'
        }}>
          3D Animation with
          <br />React + Three.js Demo
        </h1>
      </div>

      {/* Botón de Gravedad */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: 0,
        right: 0,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
      }}>
        <button 
          onClick={toggleGravity}
          style={{
            padding: '12px 24px',
            fontSize: '1.2rem',
            backgroundColor: gravityEnabled ? 'rgba(100, 180, 255, 0.8)' : 'rgba(255, 100, 100, 0.8)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: gravityEnabled ? '0 0 15px rgba(100,180,255,0.5)' : '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.5s ease',
            fontWeight: 'bold',
            color: 'white',
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          {gravityEnabled ? 'Desactivar Gravedad' : 'Activar Gravedad'}
        </button>
      </div>
    </div>
  );
}

export default App;