import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const glowX = useSpring(x, { stiffness: 180, damping: 24, mass: 0.5 });
  const glowY = useSpring(y, { stiffness: 140, damping: 22, mass: 0.8 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(media.matches);
    sync();

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const handleDown = () => setPointerDown(true);
    const handleUp = () => setPointerDown(false);

    media.addEventListener("change", sync);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [glowX, glowY, x, y]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-5 w-5 rounded-full border border-amber-400/80 bg-white/40 mix-blend-multiply lg:block"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          scale: pointerDown ? 0.78 : 1,
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[69] hidden h-28 w-28 rounded-full bg-[radial-gradient(circle,_rgba(251,191,36,0.28)_0%,_rgba(251,191,36,0.08)_45%,_transparent_72%)] blur-xl lg:block"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          scale: pointerDown ? 0.92 : 1.08,
        }}
      />
    </>
  );
}
