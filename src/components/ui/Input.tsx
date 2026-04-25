import { useState, type InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";
import { cn } from "../../utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errors?: FieldError;
};

export const Input = (props: InputProps) => {
  const [focus, setFocus] = useState(false);
  const { onFocus: propsOnFocus, onBlur: propsOnBlur } = props;

  return (
    <div className="flex flex-col items-start gap-1 p-2 rounded-md w-full">
      <div className="flex items-center justify-between w-full">
        <label htmlFor={props.id}>{props.label}</label>
        {props.errors && (
          <label className="text-Red-500 font-bold text-sm">
            {props.errors.message}
          </label>
        )}
      </div>
      <div
        className={cn(
          "flex items-start border border-Grey-500 p-2 rounded-md w-full focus:border-Blue-300 ",
          focus ? "border-Blue-950 border-2" : "",
          props.errors
            ? "border-Red-500 border-2"
            : "hover:border-Blue-950 hover:border-2",
        )}
      >
        <input
          {...props}
          className={cn(
            "w-full font-ubuntu text-Blue-950 font-semibold placeholder:text-Grey-500 px-2 py-1 placeholder:font-semibold focus:outline-none focus:ring-0 ",
            props.className ?? "",
          )}
          onFocus={(event) => {
            propsOnFocus?.(event);
            setFocus(true);
          }}
          onBlur={(event) => {
            propsOnBlur?.(event);
            setFocus(false);
          }}
        />
      </div>
    </div>
  );
};
