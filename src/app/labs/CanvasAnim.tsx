"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

const CanvasAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const totalFrames = 40; // Tổng số frame
  const images = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // Khởi tạo Lenis cho hiệu ứng cuộn mượt
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
    });

    // Bắt đầu vòng lặp requestAnimationFrame để cập nhật Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    // Preload ảnh
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      // Lưu ý: Nếu ảnh được đặt trong public/assets/images thì đường dẫn cần bắt đầu bằng dấu "/"
      img.src = `/assets/images/SNTMNT_JANE_${i.toString().padStart(4, "0")}.png`;
      img.onload = () => {
        // Khi load ảnh đầu tiên, set kích thước canvas và vẽ ảnh lên ngay
        if (i === 1 && context) {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
        }
      };
      images.current.push(img);
    }

    // Dùng Lenis.on("scroll") để cập nhật canvas dựa theo tiến độ cuộn
    // Sự kiện scroll của Lenis truyền vào object có các thông tin: scroll (vị trí hiện tại) và limit (tổng chiều cao cuộn)
    lenis.on("scroll", ({ scroll, limit }) => {
      const progress = scroll / limit; // Tiến độ cuộn từ 0 đến 1
      const frameIndex = Math.round(progress * (totalFrames - 1)); // Xác định frame hiện tại
      if (context && images.current[frameIndex]) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images.current[frameIndex], 0, 0);
      }
    });

    // Cleanup khi unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <section className="h-[5000px] relative">
      {/* Dùng container sticky để canvas cố định khi cuộn */}
      <div className="sticky top-0">
        <canvas ref={canvasRef} className="max-w-full max-h-full" />
      </div>
    </section>
  );
};

export default CanvasAnimation;
