"use client";

import * as React from "react";
import { Switch } from "@headlessui/react";
import { classNames } from "../utils/tools/classNames";

interface ISwitchButtonProps {
  name?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (_: boolean) => void;
}

export const SwitchButton: React.FC<ISwitchButtonProps> = (props) => {
  return (
    <Switch
      {...props}
      className={classNames(
        "group inline-flex h-6 w-11 items-center rounded-full transition",
        props.checked ? "bg-gray-700" : "bg-gray-300",
        props.disabled ? "!cursor-not-allowed !opacity-50" : ""
      )}
    >
      <span
        className={classNames(
          "size-4 translate-x-1 rounded-full bg-white transition",
          props.checked ? "translate-x-6" : ""
        )}
      />
    </Switch>
  );
};

interface ISwitchWithinLabelProps extends ISwitchButtonProps {
  error?: string;
  label: string;
  desc?: string;
}
export const SwitchWithinLabel: React.FC<ISwitchWithinLabelProps> = ({
  error,
  label,
  desc,
  ...props
}) => {
  return (
    <section>
      <div className="w-full inline-flex justify-between items-center">
        <div className="flex flex-col items-start pr-4">
          <p className="font-semibold">{label}</p>
          {!!desc && (
            <p className="text-xs font-medium text-gray-500 text-justify pt-0.5">
              {desc}
            </p>
          )}
        </div>
        <div>
          <SwitchButton {...props} />
        </div>
      </div>
      {!!error && <p className="text-xs text-danger-600">{error}</p>}
    </section>
  );
};
