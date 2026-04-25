import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  classname?: string;
};

export const Button = ({ label, classname, ...buttonProps }: ButtonProps) => {
  return (
    <button
      className={cn(
        "bg-dark-green hover:bg-medium-green cursor-pointer select-none",
        classname,
      )}
      {...buttonProps}
    >
      {label}
    </button>
  );
};
