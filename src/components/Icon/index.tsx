import React from "react";
import clsx from "clsx";

export interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

interface IconWrapperProps {
  children: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  className?: string;
  style?: React.CSSProperties;
}

function Icon(props: IconWrapperProps) {
  const { className, children, style } = props;

  return React.createElement("svg", {
    ...children.props,
    className: clsx("tdm-icon", className, children.props.className),
    style: { ...children.props.style, ...style },
    children: children.props.children,
  });
}

export default Icon;
