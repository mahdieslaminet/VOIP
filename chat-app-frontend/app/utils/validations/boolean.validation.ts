import * as z from "zod";

export const booleanSchema = (required?: boolean) => {
  return z
    .string()
    .trim()
    .refine(
      (val) => {
        if (!val) val = "";
        const validValues = ["true", "false"];
        if (!required) validValues.push("");
        return validValues.includes(val);
      },
      {
        message: "Must be true or false",
      }
    );
};
