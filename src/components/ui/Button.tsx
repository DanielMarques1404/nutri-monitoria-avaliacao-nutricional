import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  classname?: string;
};

export const Button = ({ label, classname, ...buttonProps }: ButtonProps) => {
  return (
    <label
      className={cn(
        "bg-dark-green hover:bg-medium-green cursor-pointer",
        classname,
      )}
    >
      <button {...buttonProps}>{label}</button>
    </label>
  );
};
