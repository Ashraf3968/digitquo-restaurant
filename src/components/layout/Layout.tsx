import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7faf8_0%,#ffffff_35%,#f5f7fb_100%)] text-slate-900">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
