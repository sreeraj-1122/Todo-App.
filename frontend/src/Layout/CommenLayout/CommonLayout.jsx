import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

const CommonLayout = () => {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
         <Outlet />
      </main>
    </div>
  );
};

export default CommonLayout;