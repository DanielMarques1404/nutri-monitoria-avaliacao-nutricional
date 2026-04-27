import { useState, type SelectHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";
import { cn } from "../../utils/cn";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  placeholder: string;
  items: { id: number; name: string }[];
  errors?: FieldError;
  onchange?: (id: number) => void;
};

export const Select = (props: SelectProps) => {
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
        <select
          {...props}
          className="w-full font-ubuntu text-Blue-950 font-semibold placeholder:text-Grey-500 px-2 placeholder:font-semibold focus:outline-none focus:ring-0"
          onFocus={(event) => {
            propsOnFocus?.(event);
            setFocus(true);
          }}
          onBlur={(event) => {
            propsOnBlur?.(event);
            setFocus(false);
          }}
          onChange={
            props.onchange
              ? (e) =>
                  props.onchange &&
                  props.onchange(Number(e.currentTarget.value))
              : undefined
          }
        >
          <option value="0">{props.placeholder}</option>
          {props.items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
