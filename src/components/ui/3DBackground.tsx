"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf8f6ff);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xf8f6ff, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x8B5CF6, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create rotating 3D shapes
    const geometry1 = new THREE.IcosahedronGeometry(1.5, 4);
    const material1 = new THREE.MeshPhongMaterial({
      color: 0x8B5CF6,
      emissive: 0x6D28D9,
      shininess: 100,
      wireframe: false,
    });
    const mesh1 = new THREE.Mesh(geometry1, material1);
    mesh1.position.set(-5, 2, 0);
    scene.add(mesh1);
    meshesRef.current.push(mesh1);

    const geometry2 = new THREE.TorusGeometry(2, 0.5, 16, 100);
    const material2 = new THREE.MeshPhongMaterial({
      color: 0x34D399,
      emissive: 0x10B981,
      shininess: 100,
    });
    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.position.set(4, -1, -2);
    mesh2.rotation.x = Math.PI / 4;
    scene.add(mesh2);
    meshesRef.current.push(mesh2);

    const geometry3 = new THREE.OctahedronGeometry(1.2, 3);
    const material3 = new THREE.MeshPhongMaterial({
      color: 0xC4B5FD,
      emissive: 0x8B5CF6,
      shininess: 100,
    });
    const mesh3 = new THREE.Mesh(geometry3, material3);
    mesh3.position.set(1, 3, -1);
    scene.add(mesh3);
    meshesRef.current.push(mesh3);

    // Animation loop
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate meshes
      meshesRef.current[0].rotation.x += 0.003;
      meshesRef.current[0].rotation.y += 0.005;
      meshesRef.current[0].position.x += (mouseX * 2 - meshesRef.current[0].position.x) * 0.05;

      meshesRef.current[1].rotation.z += 0.002;
      meshesRef.current[1].position.y += (mouseY * 2 - meshesRef.current[1].position.y) * 0.05;

      meshesRef.current[2].rotation.x += 0.004;
      meshesRef.current[2].rotation.z += 0.003;
      meshesRef.current[2].position.x += (mouseX * 1.5 - meshesRef.current[2].position.x) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
