import React from "react";
import Icon, { IconProps } from ".";

const FacebookIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg
        viewBox="0 0 10 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8.71875 9H6.375V16H3.25V9H0.71875V6.09375H3.25V3.90625C3.27083 2.63542 3.61458 1.66667 4.28125 1C4.96875 0.333333 5.88542 0 7.03125 0C7.61458 0 8.125 0.03125 8.5625 0.09375C9.02083 0.15625 9.26042 0.1875 9.28125 0.1875V2.65625H8.03125C7.40625 2.67708 6.97917 2.84375 6.75 3.15625C6.5 3.44792 6.375 3.80208 6.375 4.21875V6.09375H9.15625L8.71875 9Z" />
      </svg>
    </Icon>
  );
};

export default FacebookIcon;
