document.addEventListener("DOMContentLoaded", () => {
  // --- 1. MOUSE GLOW SPOTLIGHT CARD EFFECT ---
  const glowCards = document.querySelectorAll(".mouse-glow-card");
  glowCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // --- 2. STICKY NAVBAR SCROLL VISIBILITY ---
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar?.classList.add("visible");
    } else {
      navbar?.classList.remove("visible");
    }
  });

  // --- 3. WHATSAPP CONTACT FORM UPLINK ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("formName").value;
      const email = document.getElementById("formEmail").value;
      const message = document.getElementById("formMessage").value;
      const submitBtn = contactForm.querySelector("button[type='submit']");

      submitBtn.textContent = "Initiating Uplink...";
      
      const formattedMessage = `[Portfolio Uplink]\n\nSender: ${name} (${email})\n\nMessage:\n${message}`;
      const waUrl = `https://wa.me/919304277935?text=${encodeURIComponent(formattedMessage)}`;

      setTimeout(() => {
        window.open(waUrl, "_blank");
        submitBtn.textContent = "Send Message via WhatsApp";
        contactForm.reset();
      }, 800);
    });
  }

  // --- 4. THREE.JS 3D SKYLINE & HIGHWAY CANVAS SCENE ---
  initCinematicCanvas();
});

function initCinematicCanvas() {
  const canvas = document.getElementById("cinematic-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
  } catch (e) {
    console.warn("WebGL initialization failed, static black background active.", e);
    return;
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.012);

  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 2, 15);

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 1);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.08);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(5, 20, 5);
  scene.add(directionalLight);

  const fillLight = new THREE.DirectionalLight(0x00f0ff, 0.2);
  fillLight.position.set(-5, -5, -5);
  scene.add(fillLight);

  // Volumetric Spotlight Beam
  const coneGeo = new THREE.ConeGeometry(4, 30, 32, 1, true);
  coneGeo.translate(0, -15, 0);
  coneGeo.rotateX(Math.PI / 2);

  const coneMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.05,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const spotlight = new THREE.Mesh(coneGeo, coneMat);
  spotlight.position.set(0, 10, -5);
  scene.add(spotlight);

  // Floating Particles
  const particleCount = 500;
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

  // Procedural Skyscraper Texture
  const texCanvas = document.createElement("canvas");
  texCanvas.width = 128;
  texCanvas.height = 256;
  const ctx = texCanvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 128, 256);
    const windowColors = ["#ffffff", "#dddddd", "#bbbbbb", "#888888"];
    for (let y = 8; y < 248; y += 12) {
      for (let x = 8; x < 120; x += 10) {
        if (Math.random() > 0.45) {
          ctx.fillStyle = windowColors[Math.floor(Math.random() * windowColors.length)];
          ctx.fillRect(x, y, 5, 7);
        }
      }
    }
  }
  const windowTexture = new THREE.CanvasTexture(texCanvas);
  windowTexture.wrapS = THREE.RepeatWrapping;
  windowTexture.wrapT = THREE.RepeatWrapping;
  windowTexture.repeat.set(1.5, 4);

  const buildingsGroup = new THREE.Group();
  const buildingCount = 120;
  const buildingMeshes = [];
  const warningLights = [];

  const buildingMatTemplate = new THREE.MeshStandardMaterial({
    color: 0x0a0a0c,
    roughness: 0.85,
    metalness: 0.9,
    emissive: 0xffffff,
    emissiveMap: windowTexture,
    emissiveIntensity: 0.0,
  });

  const warningLightGeo = new THREE.SphereGeometry(0.12, 8, 8);
  const warningLightMat = new THREE.MeshBasicMaterial({ color: 0xff3333 });

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

    if (Math.abs(x) < 3.2) continue;

    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x, h / 2 - 12, z);
    buildingsGroup.add(mesh);
    buildingMeshes.push(mesh);

    if (h > 10) {
      const warningLight = new THREE.Mesh(warningLightGeo, warningLightMat);
      warningLight.position.set(x, h - 12 + 0.1, z);
      buildingsGroup.add(warningLight);
      warningLights.push(warningLight);
    }
  }
  scene.add(buildingsGroup);

  // Highway Road & Yellow Dashes
  const roadGeo = new THREE.BoxGeometry(4, 0.1, 90);
  const roadMat = new THREE.MeshStandardMaterial({
    color: 0x070709,
    roughness: 0.9,
    metalness: 0.1,
  });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.position.set(0, -11.95, 0);
  scene.add(road);

  const dashesGroup = new THREE.Group();
  const dashGeo = new THREE.BoxGeometry(0.12, 0.02, 2.5);
  const dashMat = new THREE.MeshBasicMaterial({ color: 0xdd9900 });
  for (let z = -45; z <= 45; z += 8) {
    const dash = new THREE.Mesh(dashGeo, dashMat);
    dash.position.set(0, -11.89, z);
    dashesGroup.add(dash);
  }
  scene.add(dashesGroup);

  // Tactical Vehicle
  const vehicleGroup = new THREE.Group();
  const chassisGeo = new THREE.BoxGeometry(1.4, 0.3, 2.8);
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x050506,
    roughness: 0.4,
    metalness: 0.8,
  });
  const chassis = new THREE.Mesh(chassisGeo, darkMetalMat);
  chassis.position.y = 0.2;
  vehicleGroup.add(chassis);

  const cockpitGeo = new THREE.BoxGeometry(0.9, 0.45, 1.2);
  const cockpit = new THREE.Mesh(cockpitGeo, darkMetalMat);
  cockpit.position.set(0, 0.55, 0.1);
  cockpit.rotation.x = -0.15;
  vehicleGroup.add(cockpit);

  const visorGeo = new THREE.BoxGeometry(0.8, 0.15, 0.1);
  const visorMat = new THREE.MeshBasicMaterial({ color: 0xdd9900 });
  const visor = new THREE.Mesh(visorGeo, visorMat);
  visor.position.set(0, 0.65, 0.62);
  vehicleGroup.add(visor);

  const frontWheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.24, 16);
  frontWheelGeo.rotateZ(Math.PI / 2);
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x111113, roughness: 0.95 });

  const flWheel = new THREE.Mesh(frontWheelGeo, tireMat);
  flWheel.position.set(-0.75, 0.2, 0.9);
  const frWheel = new THREE.Mesh(frontWheelGeo, tireMat);
  frWheel.position.set(0.75, 0.2, 0.9);
  vehicleGroup.add(flWheel, frWheel);

  const rearWheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.45, 16);
  rearWheelGeo.rotateZ(Math.PI / 2);
  const rlWheel = new THREE.Mesh(rearWheelGeo, tireMat);
  rlWheel.position.set(-0.85, 0.3, -0.7);
  const rrWheel = new THREE.Mesh(rearWheelGeo, tireMat);
  rrWheel.position.set(0.85, 0.3, -0.7);
  vehicleGroup.add(rlWheel, rrWheel);

  const flameGeo = new THREE.ConeGeometry(0.12, 0.6, 12);
  flameGeo.rotateX(-Math.PI / 2);
  const flameMat = new THREE.MeshBasicMaterial({
    color: 0xff4400,
    transparent: true,
    opacity: 0.85,
  });
  const flame = new THREE.Mesh(flameGeo, flameMat);
  flame.position.set(0, 0.3, -1.8);
  vehicleGroup.add(flame);

  const exhaustLight = new THREE.PointLight(0xff4400, 1.8, 6);
  exhaustLight.position.set(0, 0.3, -2.0);
  vehicleGroup.add(exhaustLight);

  vehicleGroup.position.set(0, -11.9, 25);
  scene.add(vehicleGroup);

  // Scroll Interaction
  let scrollPercent = 0;
  const updateScroll = () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;
  };
  window.addEventListener("scroll", updateScroll);

  // Animation Loop
  const animate = () => {
    requestAnimationFrame(animate);

    // Particles fall
    const posArr = particleGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      posArr[i * 3 + 1] -= velocities[i];
      if (posArr[i * 3 + 1] < -10) {
        posArr[i * 3 + 1] = 20;
        posArr[i * 3] = (Math.random() - 0.5) * 45;
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 45;
      }
    }
    particleGeo.attributes.position.needsUpdate = true;

    // Spotlight & Beacon animation
    spotlight.rotation.y = Math.sin(Date.now() * 0.0006) * 0.25;
    spotlight.rotation.x = Math.PI / 2 + Math.cos(Date.now() * 0.0005) * 0.12;

    const blink = Math.floor(Date.now() / 600) % 2 === 0;
    warningLights.forEach((light) => (light.visible = blink));

    const flameScale = 0.85 + Math.sin(Date.now() * 0.08) * 0.2;
    flame.scale.set(flameScale, flameScale, flameScale);
    exhaustLight.intensity = 1.2 + Math.sin(Date.now() * 0.08) * 0.6;

    // Vehicle position along highway
    const startVehicleZ = 25;
    const endVehicleZ = -35;
    const vehicleZ = startVehicleZ - scrollPercent * (startVehicleZ - endVehicleZ);
    vehicleGroup.position.z = vehicleZ;

    const tireSpeed = -scrollPercent * 35;
    flWheel.rotation.x = tireSpeed;
    frWheel.rotation.x = tireSpeed;
    rlWheel.rotation.x = tireSpeed;
    rrWheel.rotation.x = tireSpeed;

    // Camera follow lerp
    let targetCamX = 0;
    let targetCamY = 2;
    let targetCamZ = 15;
    let windowEmissiveIntensity = 0.0;

    if (scrollPercent <= 0.15) {
      const t = scrollPercent / 0.15;
      targetCamY = 2 - t * 10.5;
      targetCamZ = 15 - t * 1.0;
      windowEmissiveIntensity = t * 0.4;
    } else {
      targetCamY = -8.8;
      targetCamZ = vehicleZ + 9.5;
      windowEmissiveIntensity = 1.1;
    }

    camera.position.x += (targetCamX - camera.position.x) * 0.08;
    camera.position.y += (targetCamY - camera.position.y) * 0.08;
    camera.position.z += (targetCamZ - camera.position.z) * 0.08;

    camera.lookAt(new THREE.Vector3(0, -11.5, vehicleZ - 3));

    buildingMeshes.forEach((mesh) => {
      mesh.material.emissiveIntensity = windowEmissiveIntensity;
    });

    renderer.render(scene, camera);
  };

  animate();

  window.addEventListener("resize", () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}
