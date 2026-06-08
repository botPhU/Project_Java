import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="showcase-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
