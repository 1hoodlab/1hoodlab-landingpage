"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import Lenis from "lenis";

const ThreeCanvasAnimation = () => {
  // Ref chứa DOM để gắn canvas của three.js
  const containerRef = useRef<HTMLDivElement>(null);
  const totalFrames = 40;
  // Lưu các texture đã preload
  const textures = useRef<THREE.Texture[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- Khởi tạo Scene, Camera và Renderer ---
    const scene = new THREE.Scene();

    // Sử dụng OrthographicCamera để dễ dàng map ảnh 2D lên plane.
    const camera = new THREE.OrthographicCamera(
      width / -2, // left
      width / 2, // right
      height / 2, // top
      height / -2, // bottom
      0.1,
      1000
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    for (let i = 1; i <= totalFrames; i++) {
      const textureUrl = `/assets/images/SNTMNT_JANE_${i
        .toString()
        .padStart(4, "0")}.png`;
      const texture = loader.load(textureUrl);
      textures.current.push(texture);
    }

    const planeGeometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({
      map: textures.current[0],
      transparent: true,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, material);
    scene.add(planeMesh);

    const lenis = new Lenis({
      smoothWheel: true,
    });

    // Hàm animate chạy mỗi frame
    function animate(time: number) {
      // Cập nhật Lenis để xử lý cuộn mượt
      lenis.raf(time);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // Cập nhật texture theo tiến độ cuộn
    // Khi Lenis emit sự kiện "scroll", chúng ta tính toán progress và chọn frame tương ứng.
    lenis.on("scroll", ({ scroll, limit }) => {
      const progress = scroll / limit; // Giá trị từ 0 đến 1
      const frameIndex = Math.round(progress * (totalFrames - 1));
      if (textures.current[frameIndex]) {
        material.map = textures.current[frameIndex];
        material.needsUpdate = true;
      }
    });

    // --- Xử lý resize cửa sổ ---
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.left = newWidth / -2;
      camera.right = newWidth / 2;
      camera.top = newHeight / 2;
      camera.bottom = newHeight / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- Cleanup khi component unmount ---
    return () => {
      lenis.destroy();
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      textures.current.forEach((texture) => texture.dispose());
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    // Container có chiều cao lớn để tạo vùng cuộn (ở đây 5000px)
    <section className="h-[5000px] relative">
      {/* Container chứa canvas của Three.js được sticky để giữ luôn hiển thị */}
      <div className="sticky top-0 w-full h-screen" ref={containerRef}></div>
    </section>
  );
};

export default ThreeCanvasAnimation;
