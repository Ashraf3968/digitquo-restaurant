import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "../common/CustomCursor";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.16),_transparent_34%),linear-gradient(180deg,_#fffdf9_0%,_#f7f2ea_100%)] text-stone-900">
      <CustomCursor />
      <motion.div
        className="pointer-events-none fixed left-[-8rem] top-24 z-0 hidden h-72 w-72 rounded-full bg-amber-200/20 blur-3xl xl:block"
        animate={{ x: [0, 50, -20, 0], y: [0, -18, 24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none fixed bottom-16 right-[-6rem] z-0 hidden h-80 w-80 rounded-full bg-rose-100/30 blur-3xl xl:block"
        animate={{ x: [0, -44, 24, 0], y: [0, 24, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="relative z-10"
          initial={{ opacity: 0, y: 16, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.995 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <a href="/reservations" className="fixed bottom-4 right-4 z-40 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-xl lg:hidden">
        Reserve Now
      </a>
    </div>
  );
}

