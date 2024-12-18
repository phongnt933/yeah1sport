import { PropsWithChildren, useEffect } from "react";
import { useAppSelector } from "../../redux";
import { Navigate } from "react-router-dom";
import ROUTE from "../../constants/routes";

interface PrivateRouteProps {
  title: string;
}

function PrivateRoute(props: PropsWithChildren<PrivateRouteProps>) {
  const { title, children } = props;
  const isLogin = useAppSelector((s) => s.auth.authenticated);

  useEffect(() => {
    document.title = title;
  }, []);

  if (!isLogin) {
    <Navigate to={ROUTE.LOGIN} />;
  }

  return <>{children}</>;
}

export default PrivateRoute;
