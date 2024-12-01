import * as z from "zod";

import { integerSchema } from "./integer.validation";
import { booleanSchema } from "./boolean.validation";

export const voiceSettingsFormSchema = z.object({
  quantization: integerSchema(true),
  echoCancellation: booleanSchema(true),
  noiseSuppression: booleanSchema(true),
});

export type voiceSettingsFormSchemaType = z.infer<
  typeof voiceSettingsFormSchema
>;
