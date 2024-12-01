"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";

import { StandardInput } from "./input";
import { StandardButton } from "./button";
import { DialogHead } from "./dialog-head";
import { SwitchWithinLabel } from "./switch";
import { RecorderContext } from "../provider/recorder-provider";
import {
  voiceSettingsFormSchema,
  voiceSettingsFormSchemaType,
} from "../utils/validations/voice-settings.validation";

export const VoiceSettings: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const settings = React.useContext(RecorderContext);

  const form = useForm<voiceSettingsFormSchemaType>({
    mode: "all",
    resolver: zodResolver(voiceSettingsFormSchema),
  });

  const handleSubmit = (data: voiceSettingsFormSchemaType) => {
    settings.setEchoCancellation(
      data.echoCancellation === "true" ? true : false
    );
    settings.setNoiseSuppression(
      data.noiseSuppression === "true" ? true : false
    );
    settings.setQuantizationTime(
      Number(
        data.quantization ||
          process.env.NEXT_PUBLIC_REFRESH_MEDIA_RECORDER_TIMEOUT ||
          1000
      )
    );
  };

  React.useEffect(() => {
    form.reset({
      quantization: settings.quantizationTime.toString(),
      echoCancellation: settings.echoCancellation ? "true" : "false",
      noiseSuppression: settings.noiseSuppression ? "true" : "false",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return (
    <>
      <StandardButton onClick={() => setOpen(true)}>Settings</StandardButton>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <main className="px-4 py-3 space-y-4">
                <DialogHead
                  onClickCloseBtn={() => setOpen(false)}
                  title="Voice settings"
                />
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  <Controller
                    control={form.control}
                    name="quantization"
                    render={({ field, fieldState: { error } }) => (
                      <div>
                        <StandardInput
                          label="Quantization (ms)"
                          placeholder="Time slices "
                          error={error?.message}
                          {...field}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="noiseSuppression"
                    render={({ field, fieldState: { error } }) => (
                      <SwitchWithinLabel
                        label="Noise Suppression"
                        desc="This technique is used to optimize data transfer speed. By turning this option on, you can stream audio more efficiently over the Internet in real time by temporarily reducing data during silent intervals."
                        checked={field.value === "true"}
                        onChange={(checked) =>
                          field.onChange(checked ? "true" : "false")
                        }
                        error={error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="echoCancellation"
                    render={({ field, fieldState: { error } }) => (
                      <SwitchWithinLabel
                        label="Echo Cancellation"
                        desc="Echo cancellation is a feature that attempts to prevent echo effects on a two-way audio connection by trying to reduce or eliminate crosstalk between the user's output device and their input device."
                        checked={field.value === "true"}
                        onChange={(checked) =>
                          field.onChange(checked ? "true" : "false")
                        }
                        error={error?.message}
                      />
                    )}
                  />
                  <StandardButton type="submit" additionalClassNames="w-full">
                    <span className="font-semibold text-gray-700">Submit</span>
                  </StandardButton>
                </form>
              </main>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
