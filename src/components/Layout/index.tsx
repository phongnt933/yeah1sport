import { PropsWithChildren } from "react";
import AppHeader from "./Header";
import AppFooter from "./Footer";

function AppLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <>
      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
}

export default AppLayout;
