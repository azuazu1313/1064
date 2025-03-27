import * as THREE from "three";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LogoShader() {
  const mountRef = useRef(null);
  const planeRef = useRef(null); // Ref for GSAP scaling

  useEffect(() => {
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(500, 500);
    mountRef.current.appendChild(renderer.domElement);

    // Load texture (logo)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/landscape png logo.png", (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      // Shader uniforms
      const uniforms = {
        u_time: { value: 0.0 },
        u_texture: { value: texture },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) }, // Normalized mouse position
      };

      // Shader material with fragment shader
      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          varying vec2 v_uv;
          void main() {
            v_uv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float u_time;
          uniform sampler2D u_texture;
          uniform vec2 u_mouse;
          varying vec2 v_uv;

          void main() {
              vec2 uv = v_uv;

              // Compute distance from the mouse
              float dist = distance(uv, u_mouse);

              // Soft glass-like distortion effect
              float effect = smoothstep(0.15, 0.0, dist); // Smaller area, more elegant
              uv += effect * 0.02 * vec2(cos(u_time), sin(u_time)); // Subtle light refraction

              vec4 color = texture2D(u_texture, uv);
              gl_FragColor = color;
          }
        `,
      });

      // Plane Geometry with Shader Material
      const geometry = new THREE.PlaneGeometry(2, 2);
      const plane = new THREE.Mesh(geometry, material);
      scene.add(plane);
      planeRef.current = plane; // Store the plane for GSAP

      // Mouse move event
      const onMouseMove = (event) => {
        const { left, top, width, height } = renderer.domElement.getBoundingClientRect();
        const x = (event.clientX - left) / width;
        const y = 1.0 - (event.clientY - top) / height;
        material.uniforms.u_mouse.value.set(x, y);
      };
      window.addEventListener("mousemove", onMouseMove);

      // Animation Loop for Shader Time
      function animate() {
        material.uniforms.u_time.value += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      animate();

      return () => {
        mountRef.current.removeChild(renderer.domElement);
        window.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  // GSAP Hover Effects
  const handleHover = () => {
    gsap.to(planeRef.current.scale, { x: 1.1, y: 1.1, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(planeRef.current.scale, { x: 1, y: 1, duration: 0.3, ease: "power2.out" });
  };

  return <div ref={mountRef} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}></div>;
}
