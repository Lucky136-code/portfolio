"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CinematicCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // --- SETUP SCENE, CAMERA, RENDERER ---
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.012);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 2, 15);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.08);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 20, 5);
    scene.add(directionalLight);

    // Subtle neon blue reflection light from below
    const fillLight = new THREE.DirectionalLight(0x00f0ff, 0.2);
    fillLight.position.set(-5, -5, -5);
    scene.add(fillLight);

    // --- VOLUMETRIC SPOTLIGHT BEAM ---
    const coneGeo = new THREE.ConeGeometry(4, 30, 32, 1, true);
    coneGeo.translate(0, -15, 0);
    coneGeo.rotateX(Math.PI / 2);

    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff, // Cyan spotlight beam
      transparent: true,
      opacity: 0.05,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const spotlight = new THREE.Mesh(coneGeo, coneMat);
    spotlight.position.set(0, 10, -5);
    scene.add(spotlight);

    // --- FLOATING PARTICLES (RAIN & DUST) ---
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 1] = Math.random() * 30 - 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 45;
      velocities[i] = 0.08 + Math.random() * 0.15;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- PROCEDURAL SKYSCRAPER GENERATION (MONOCHROME LIGHTS) ---
    // Generate clean black and white window light texture
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, 128, 256);
      
      // Black and white lights only
      const windowColors = ["#ffffff", "#dddddd", "#bbbbbb", "#888888"];
      
      // Draw grid of window lights
      for (let y = 8; y < 248; y += 12) {
        for (let x = 8; x < 120; x += 10) {
          if (Math.random() > 0.45) {
            ctx.fillStyle = windowColors[Math.floor(Math.random() * windowColors.length)];
            ctx.fillRect(x, y, 5, 7);
          }
        }
      }
    }
    const windowTexture = new THREE.CanvasTexture(canvas);
    windowTexture.wrapS = THREE.RepeatWrapping;
    windowTexture.wrapT = THREE.RepeatWrapping;
    windowTexture.repeat.set(1.5, 4);

    const buildingsGroup = new THREE.Group();
    const buildingCount = 130;
    const buildingMeshes: THREE.Mesh[] = [];
    const warningLights: THREE.Mesh[] = [];

    const buildingMatTemplate = new THREE.MeshStandardMaterial({
      color: 0x0a0a0c,
      roughness: 0.85,
      metalness: 0.9,
      emissive: 0xffffff, 
      emissiveMap: windowTexture,
      emissiveIntensity: 0.0,
    });

    const warningLightGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const warningLightMat = new THREE.MeshBasicMaterial({
      color: 0xff3333,
    });

    for (let i = 0; i < buildingCount; i++) {
      const w = 1.6 + Math.random() * 2.8;
      const h = 5 + Math.random() * 15;
      const d = 1.6 + Math.random() * 2.8;

      const geom = new THREE.BoxGeometry(w, h, d);
      const mat = buildingMatTemplate.clone();
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 9 + Math.random() * 30;
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      
      // Avoid placing buildings directly on the central road highway (X = -2 to +2)
      if (Math.abs(x) < 3.2) {
        continue;
      }
      
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(x, h / 2 - 12, z);
      
      buildingsGroup.add(mesh);
      buildingMeshes.push(mesh);

      // Add aviation red lights to tall buildings
      if (h > 10) {
        const warningLight = new THREE.Mesh(warningLightGeo, warningLightMat);
        warningLight.position.set(x, h - 12 + 0.1, z);
        buildingsGroup.add(warningLight);
        warningLights.push(warningLight);
      }
    }
    scene.add(buildingsGroup);

    // --- CENTRAL ROAD HIGHWAY ---
    const roadGeo = new THREE.BoxGeometry(4, 0.1, 90);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x070709,
      roughness: 0.9,
      metalness: 0.1,
    });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.position.set(0, -11.95, 0);
    scene.add(road);

    // Yellow highway dashes
    const dashesGroup = new THREE.Group();
    const dashGeo = new THREE.BoxGeometry(0.12, 0.02, 2.5);
    const dashMat = new THREE.MeshBasicMaterial({ color: 0xdd9900 });
    for (let z = -45; z <= 45; z += 8) {
      const dash = new THREE.Mesh(dashGeo, dashMat);
      dash.position.set(0, -11.89, z);
      dashesGroup.add(dash);
    }
    scene.add(dashesGroup);

    // --- CUSTOM DESIGNED ARMORED TACTICAL VEHICLE (BATMOBILE CONCEPT) ---
    const vehicleGroup = new THREE.Group();

    // Chassis/Base
    const chassisGeo = new THREE.BoxGeometry(1.4, 0.3, 2.8);
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x050506,
      roughness: 0.4,
      metalness: 0.8,
    });
    const chassis = new THREE.Mesh(chassisGeo, darkMetalMat);
    chassis.position.y = 0.2;
    vehicleGroup.add(chassis);

    // Angled Cockpit Shell
    const cockpitGeo = new THREE.BoxGeometry(0.9, 0.45, 1.2);
    const cockpit = new THREE.Mesh(cockpitGeo, darkMetalMat);
    cockpit.position.set(0, 0.55, 0.1);
    cockpit.rotation.x = -0.15; // slightly sloped nose
    vehicleGroup.add(cockpit);

    // Gold/Yellow windshield visor
    const visorGeo = new THREE.BoxGeometry(0.8, 0.15, 0.1);
    const visorMat = new THREE.MeshBasicMaterial({ color: 0xdd9900 });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.65, 0.62);
    vehicleGroup.add(visor);

    // Front Wheels (Sleek, small cylinders)
    const frontWheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.24, 16);
    frontWheelGeo.rotateZ(Math.PI / 2);
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x111113, roughness: 0.95 });
    
    const flWheel = new THREE.Mesh(frontWheelGeo, tireMat);
    flWheel.position.set(-0.75, 0.2, 0.9);
    const frWheel = new THREE.Mesh(frontWheelGeo, tireMat);
    frWheel.position.set(0.75, 0.2, 0.9);
    vehicleGroup.add(flWheel, frWheel);

    // Rear Wheels (Double wide, larger cylinders for tumbler chassis appearance)
    const rearWheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.45, 16);
    rearWheelGeo.rotateZ(Math.PI / 2);

    const rlWheel = new THREE.Mesh(rearWheelGeo, tireMat);
    rlWheel.position.set(-0.85, 0.3, -0.7);
    const rrWheel = new THREE.Mesh(rearWheelGeo, tireMat);
    rrWheel.position.set(0.85, 0.3, -0.7);
    vehicleGroup.add(rlWheel, rrWheel);

    // Engine Thruster Exhaust
    const exhaustGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.5, 12);
    exhaustGeo.rotateX(Math.PI / 2);
    const exhaust = new THREE.Mesh(exhaustGeo, darkMetalMat);
    exhaust.position.set(0, 0.3, -1.45);
    vehicleGroup.add(exhaust);

    // Jet Engine Flame
    const flameGeo = new THREE.ConeGeometry(0.12, 0.6, 12);
    flameGeo.rotateX(-Math.PI / 2); // flame points backward
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xff4400,
      transparent: true,
      opacity: 0.85,
    });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.set(0, 0.3, -1.8);
    vehicleGroup.add(flame);

    // Jet Exhaust Light (throws red/orange glow behind the vehicle)
    const exhaustLight = new THREE.PointLight(0xff4400, 1.8, 6);
    exhaustLight.position.set(0, 0.3, -2.0);
    vehicleGroup.add(exhaustLight);

    vehicleGroup.position.set(0, -11.9, 25);
    scene.add(vehicleGroup);

    // --- ANIMATION LOOP & SCROLL INTEG ---
    let scrollPercent = 0;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", handleScroll);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      // Animate particles
      const posArr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] -= velocities[i];
        if (posArr[i * 3 + 1] < -10) {
          posArr[i * 3 + 1] = 20;
          posArr[i * 3] = (Math.random() - 0.5) * 45;
          posArr[i * 3 + 2] = (Math.random() - 0.5) * 45;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Rotate spotlight
      spotlight.rotation.y = Math.sin(Date.now() * 0.0006) * 0.25;
      spotlight.rotation.x = Math.PI / 2 + Math.cos(Date.now() * 0.0005) * 0.12;

      // Blink warning beacons (every 600ms)
      const blink = Math.floor(Date.now() / 600) % 2 === 0;
      warningLights.forEach(light => {
        light.visible = blink;
      });

      // Jet exhaust flame scaling/flicker
      const flameScale = 0.85 + Math.sin(Date.now() * 0.08) * 0.2;
      flame.scale.set(flameScale, flameScale, flameScale);
      exhaustLight.intensity = 1.2 + Math.sin(Date.now() * 0.08) * 0.6;

      // Scroll-linked vehicle driving position
      // Moves from Z = 25 (start) to Z = -35 (far distance)
      const startVehicleZ = 25;
      const endVehicleZ = -35;
      const vehicleZ = startVehicleZ - scrollPercent * (startVehicleZ - endVehicleZ);
      vehicleGroup.position.z = vehicleZ;

      // Spin tires as vehicle moves
      const tireSpeed = -scrollPercent * 35;
      flWheel.rotation.x = tireSpeed;
      frWheel.rotation.x = tireSpeed;
      rlWheel.rotation.x = tireSpeed;
      rrWheel.rotation.x = tireSpeed;

      // Camera positions Interpolations (smooth dive to chase vehicle)
      let targetCamX = 0;
      let targetCamY = 2;
      let targetCamZ = 15;
      let spotlightOpacity = 0.05;
      let windowEmissiveIntensity = 0.0;

      if (scrollPercent <= 0.15) {
        // High view looking down at hero
        const t = scrollPercent / 0.15;
        targetCamX = 0;
        targetCamY = 2 - t * 10.5; // drop down towards road
        targetCamZ = 15 - t * 1.0; 
        spotlightOpacity = 0.05 * (1 - t * 0.3);
        windowEmissiveIntensity = t * 0.4;
      } else {
        // Drop behind vehicle and chase it down the highway
        targetCamX = 0;
        targetCamY = -8.8; // chase height (just above road level)
        targetCamZ = vehicleZ + 9.5; // chase follow distance behind vehicle
        spotlightOpacity = 0.02;
        windowEmissiveIntensity = 1.1;
      }

      camera.position.x += (targetCamX - camera.position.x) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;

      // Set camera focal look-at target: focus directly on the vehicle
      let lookTarget = new THREE.Vector3(0, -11.5, vehicleZ - 3);
      camera.lookAt(lookTarget);

      coneMat.opacity = spotlightOpacity;

      buildingMeshes.forEach(mesh => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = windowEmissiveIntensity;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      
      scene.clear();
      renderer.dispose();
      
      coneGeo.dispose();
      coneMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      windowTexture.dispose();
      warningLightGeo.dispose();
      roadGeo.dispose();
      roadMat.dispose();
      dashGeo.dispose();
      dashMat.dispose();
      chassisGeo.dispose();
      darkMetalMat.dispose();
      cockpitGeo.dispose();
      visorGeo.dispose();
      visorMat.dispose();
      frontWheelGeo.dispose();
      tireMat.dispose();
      rearWheelGeo.dispose();
      exhaustGeo.dispose();
      flameGeo.dispose();
      flameMat.dispose();
      
      buildingMeshes.forEach(mesh => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
