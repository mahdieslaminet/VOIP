"use client";

import React from "react";
import { IoClose } from "react-icons/io5";

interface IDialogHeadProps {
  title: string;
  onClickCloseBtn?: React.MouseEventHandler<HTMLButtonElement>;
}
export const DialogHead: React.FC<IDialogHeadProps> = ({
  onClickCloseBtn,
  title,
}) => {
  return (
    <section className="flex justify-between items-center">
      <p className="font-semibold text-lg">{title}</p>
      <button
        onClick={onClickCloseBtn}
        className="hover:bg-gray-100 rounded-md p-0.5"
      >
        <IoClose className="w-6 h-6" />
      </button>
    </section>
  );
};
