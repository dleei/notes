import { Outlet } from "react-router-dom";
import { Suspense } from "react";

const Layout = () => {
  return (
      <div className="">
        <main>
          <Suspense fallback="">
            <Outlet />
          </Suspense>
        </main>
      </div>
  );
};

export default Layout;
