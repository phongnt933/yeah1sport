import React from "react";
import clsx from "clsx";

type GradientTypographyProps = React.HTMLAttributes<HTMLParagraphElement>;

function GradientTypography(props: GradientTypographyProps) {
  const { className, ...restProps } = props;
  return (
    <p className={clsx("gradient-typography", className)} {...restProps} />
  );
}

export default GradientTypography;
