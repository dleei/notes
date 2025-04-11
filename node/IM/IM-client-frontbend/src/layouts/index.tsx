import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import LayoutWrapper from "./style";

const Layout = () => {
  return (
    <LayoutWrapper>
      <div className="layout-container">
        <main>
          <Suspense fallback="">
            <Outlet />
          </Suspense>
        </main>
      </div>
    </LayoutWrapper>
  );
};

export default Layout;

