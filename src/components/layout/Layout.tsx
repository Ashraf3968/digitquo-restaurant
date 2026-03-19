import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#fffdf9_0%,_#f6efe3_46%,_#f9f4eb_100%)] text-stone-900">
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[28rem] bg-[radial-gradient(circle_at_18%_18%,rgba(251,191,36,0.14),transparent_28%),radial-gradient(circle_at_82%_10%,rgba(251,146,60,0.12),transparent_24%)]"
        animate={{ y: [0, 10, 0], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[24rem] bg-[radial-gradient(circle_at_20%_90%,rgba(253,230,138,0.12),transparent_26%),radial-gradient(circle_at_85%_82%,rgba(251,113,133,0.08),transparent_22%)]"
        animate={{ y: [0, -8, 0], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="relative z-10"
          initial={{ opacity: 0, y: 18, scale: 0.992 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.995 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <a href="/reservations" className="fixed bottom-4 right-4 z-40 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-xl transition duration-300 hover:-translate-y-0.5 hover:bg-stone-800 lg:hidden">
        Reserve Now
      </a>
    </div>
  );
}