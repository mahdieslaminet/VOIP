import * as z from "zod";

export const integerSchema = (
  required?: boolean,
  max?: number | string,
  min = 0
) => {
  return z
    .string()
    .refine(
      (val) => {
        return required && !!val?.trim?.();
      },
      {
        message: "* Required",
      }
    )
    .refine(
      (val) => {
        if (isNaN(Number(val))) return false;
        return /^\d+$/g.test(val.replace(/^-/g, ""));
      },
      {
        message: `Must be integer`,
      }
    )
    .refine(
      (val) => {
        return Number(val) > min;
      },
      {
        message: `Must be bigger then ${min}`,
      }
    )
    .refine(
      (val) => {
        if (isNaN(Number(max))) return true;
        return Number(val) <= Number(max);
      },
      {
        message: `Must be less then or equals to ${max}`,
      }
    );
};
