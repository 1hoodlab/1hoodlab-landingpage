"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import CanvasAnimation from "./CanvasAnim";
import ReactLenis from "lenis/react";

export default function HomePage() {
  return (
    <ReactLenis root>
      <CanvasAnimation />
    </ReactLenis>
  );
}
