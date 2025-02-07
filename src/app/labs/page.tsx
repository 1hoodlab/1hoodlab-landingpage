// HomePage.tsx
"use client";

import ReactLenis from "lenis/react";
import ThreeCanvasAnimation from "./Three";
import TwoCanvasAnimation from "./Two";

export default function HomePage() {
  return (
    <ReactLenis root>
      {/* Section chứa canvas animation */}
      <section className="relative min-h-screen">
        {/* Phần canvas luôn “dính” ở đầu trang */}
        <div className="sticky top-0 w-full h-screen">
          <ThreeCanvasAnimation />
        </div>
        {/* Phần này tạo khoảng cuộn cho animation, tổng chiều cao section = h-screen + scrollSpace */}
        <div className="h-[400vh]"></div>
      </section>
      <section className="relative min-h-screen">
        {/* Container canvas sticky */}
        <div className="sticky top-0 w-full h-screen">
          <TwoCanvasAnimation />
        </div>
        {/* Vùng cuộn cho animation thứ hai */}
        <div className="h-[400vh]"></div>
      </section>

      {/* Section nội dung của màn tiếp theo */}
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Màn Hình Tiếp Theo</h1>
          <p className="text-lg">
            Đây là nội dung của màn tiếp theo sau khi kết thúc canvas animation.
          </p>
        </div>
      </section>
    </ReactLenis>
  );
}
