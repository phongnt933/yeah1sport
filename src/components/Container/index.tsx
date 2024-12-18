import clsx from "clsx";
import { PropsWithChildren } from "react";

interface ContainerProps {
  className?: string;
}

function Container(props: PropsWithChildren<ContainerProps>) {
  const { children, className } = props;
  return (
    <div className={clsx("max-w-[1280px] w-full px-6 mx-auto", className)}>
      {children}
    </div>
  );
}

export default Container;
