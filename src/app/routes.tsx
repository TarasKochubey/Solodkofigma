import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layout/MainLayout";
import { Home } from "./pages/Home";
import { Memory } from "./pages/Memory";
import { Log } from "./pages/Log";
import { Onboarding } from "./pages/Onboarding";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "memory", Component: Memory },
      { path: "log", Component: Log },
    ],
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  }
]);