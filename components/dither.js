"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DitherSphere() {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#ffffff'); // Background color

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const texture = loader.load('/images/unicode.png');
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestMipMapNearestFilter;

    const glyphCount = 2000;
    const glyphsInRow = 7;

    const glyphMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uGlyphCount: { value: glyphsInRow },
      },
      vertexShader: `
        uniform float uGlyphCount;
        attribute float glyphIndex;
        varying vec2 vUv;

        void main() {
          float glyphOffset = glyphIndex / uGlyphCount;
          vUv = uv / uGlyphCount + vec2(glyphOffset, 0.0);
          vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec2 vUv;

        void main() {
          vec4 tex = texture2D(uTexture, vUv);
          if (tex.a < 0.1) discard;
          gl_FragColor = tex;
        }
      `,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(0.05, 0.05);
    const instancedMesh = new THREE.InstancedMesh(geometry, glyphMaterial, glyphCount);

    const glyphIndices = new Float32Array(glyphCount);
    const dummy = new THREE.Object3D();

    const bayerMatrix = [
      0, 8, 2, 10,
      12, 4, 14, 6,
      3, 11, 1, 9,
      15, 7, 13, 5
    ];

    for (let i = 0; i < glyphCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      dummy.position.set(x, y, z);
      dummy.lookAt(0, 0, 0);
      dummy.updateMatrix();

      const brightness = (z + 1) / 2;
      const threshold = bayerMatrix[i % 16] / 16;

      if (brightness > threshold) {
        instancedMesh.setMatrixAt(i, dummy.matrix);
        glyphIndices[i] = Math.floor(Math.random() * glyphsInRow);
      } else {
        dummy.position.set(9999, 9999, 9999); // Move off-screen
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
        glyphIndices[i] = 0;
      }
    }

    instancedMesh.geometry.setAttribute(
      'glyphIndex',
      new THREE.InstancedBufferAttribute(glyphIndices, 1)
    );

    scene.add(instancedMesh);

    // Mouse-based rotation
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = ((e.clientX / innerWidth) - 0.5) * 5;
      targetY = ((e.clientY / innerHeight) - 0.5) * 5;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      instancedMesh.rotation.y += (targetX - instancedMesh.rotation.y) * 0.05;
      instancedMesh.rotation.x += (targetY - instancedMesh.rotation.x) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />;
}
