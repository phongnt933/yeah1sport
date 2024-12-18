import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/login";
import ForgotPasswordPage from "../pages/forgotPassword";
import HomePage from "../pages/home";
import PrivateRoute from "../components/Route/PrivateRoute";
import PublicRoute from "../components/Route/PublicRoute";
import ROUTE from "../constants/routes";
import RegisterPage from "../pages/register";
import NotFoundPage from "../pages/notFound";
import TeamPage from "../pages/team";
import FindFieldPage from "../pages/findField";
import MatchingPage from "../pages/matching";

interface AppRoute {
  path: string;
  title: string;
  element: React.ComponentType;
  isPrivate: boolean;
}

// Cấu hình route với isPrivate và PublicRoute/PrivateRoute
const routes: AppRoute[] = [
  {
    path: ROUTE.LOGIN,
    title: "Đăng nhập",
    element: LoginPage,
    isPrivate: false,
  },
  {
    path: ROUTE.FORGOT_PASSWORD,
    title: "Quên mật khẩu",
    element: ForgotPasswordPage,
    isPrivate: false,
  },
  {
    path: ROUTE.REGISTER,
    title: "Đăng ký",
    element: RegisterPage,
    isPrivate: false,
  },
  {
    path: ROUTE.HOME,
    title: "Trang chủ",
    element: HomePage,
    isPrivate: false,
  },
  {
    path: ROUTE.MY_TEAM,
    title: "Đội của tôi",
    element: TeamPage,
    isPrivate: true,
  },
  {
    path: ROUTE.FIND_FIELD,
    title: "Tìm sân",
    element: FindFieldPage,
    isPrivate: true,
  },
  {
    path: ROUTE.MATCHING,
    title: "Cáp kèo - Tìm đối thử",
    element: MatchingPage,
    isPrivate: true,
  },
  {
    path: "*",
    title: "404",
    element: NotFoundPage,
    isPrivate: false,
  },
];

// Tạo router với createBrowserRouter
const router = createHashRouter(
  routes.map(({ path, element: Component, isPrivate, title }) => ({
    path,
    element: isPrivate ? (
      <PrivateRoute title={title}>
        <Component />
      </PrivateRoute>
    ) : (
      <PublicRoute title={title}>
        <Component />
      </PublicRoute>
    ),
  }))
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
