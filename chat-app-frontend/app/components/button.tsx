"use client";

import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { classNames } from "../utils/tools/classNames";

interface IStandardButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  additionalClassNames?: string;
}

export const StandardButton: React.FC<IStandardButton> = ({
  children,
  additionalClassNames = "",
  className = "bg-gray-100 px-3 py-2 border-gray-200 border rounded-xl",
  ...props
}) => {
  return (
    <button className={classNames(className, additionalClassNames)} {...props}>
      {children}
    </button>
  );
};
