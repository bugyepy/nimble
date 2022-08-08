import React, { ButtonHTMLAttributes, ReactNode } from "react";

const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) => {
  return (
    <button className=" text-emerald-400 font-bold" {...props}>
      {children}
    </button>
  );
};

export default Button;
