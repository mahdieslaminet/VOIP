import React from "react";
import { classNames } from "../utils/tools/classNames";

interface IStandardInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value?: string;
  label?: string;
  error?: string;
  showError?: boolean;
  labelClassName?: string;
}
export const StandardInput: React.FC<IStandardInputProps> = ({
  label,
  error = "",
  value = "",
  className = "",
  showError = true,
  labelClassName = "",
  ...props
}) => {
  return (
    <>
      {!!label && (
        <p
          className={
            labelClassName || "text-gray-500 mb-1.5 text-xs font-semibold"
          }
        >
          {label}
        </p>
      )}
      <input
        value={value}
        className={classNames(
          "ring-1 w-full rounded-xl py-1 px-3 text-gray-800 disabled:bg-gray-50",
          "placeholder:text-size-12 placeholder:font-medium placeholder:text-gray-300",
          className,
          !error
            ? "focus:outline-primary-100 ring-gray-200"
            : "focus:outline-danger-200 ring-danger-300"
        )}
        {...props}
      />
      {!!error && showError && (
        <p className="pt-xs text-xs text-danger-600">{error}</p>
      )}
    </>
  );
};
