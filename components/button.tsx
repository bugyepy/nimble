import React, { ButtonHTMLAttributes, ReactNode } from "react";

const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) => {
  return (
    <button className="px-4 py-2 bg-emerald-400 text-white" {...props}>
      {children}
    </button>
  );
};

export default Button;
