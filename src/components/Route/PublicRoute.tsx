import { PropsWithChildren, useEffect } from "react";

interface PublicRouteProps {
  title: string;
}

function PublicRoute(props: PropsWithChildren<PublicRouteProps>) {
  const { title, children } = props;

  useEffect(() => {
    document.title = title;
  }, [title]);

  return <>{children}</>;
}

export default PublicRoute;
