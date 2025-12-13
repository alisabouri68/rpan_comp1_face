import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AppLayout() {
  return (
    <>
      <Outlet />

      <ToastContainer theme="light" position="top-right" />
    </>
  );
}
