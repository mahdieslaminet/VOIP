"use client";

import React from "react";

export const RecorderContext = React.createContext<{
  quantizationTime: number;
  echoCancellation: boolean;
  noiseSuppression: boolean;
  setQuantizationTime: (_: number) => void;
  setEchoCancellation: (_: boolean) => void;
  setNoiseSuppression: (_: boolean) => void;
}>({
  quantizationTime: Number(
    process.env.NEXT_PUBLIC_REFRESH_MEDIA_RECORDER_TIMEOUT || 1000
  ),
  echoCancellation: true,
  noiseSuppression: true,
  setQuantizationTime: () => undefined,
  setEchoCancellation: () => undefined,
  setNoiseSuppression: () => undefined,
});

interface IRecorderProviderProps {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
}
export const RecorderProvider: React.FC<IRecorderProviderProps> = ({
  children,
}) => {
  const [echoCancellation, setEchoCancellation] =
    React.useState<boolean>(true);
  const [noiseSuppression, setNoiseSuppression] =
    React.useState<boolean>(true);
  const [quantizationTime, setQuantizationTime] = React.useState<number>(
    Number(process.env.NEXT_PUBLIC_REFRESH_MEDIA_RECORDER_TIMEOUT || 1000)
  );

  return (
    <RecorderContext.Provider
      value={{
        noiseSuppression,
        echoCancellation,
        quantizationTime,
        setNoiseSuppression,
        setEchoCancellation,
        setQuantizationTime,
      }}
    >
      {children}
    </RecorderContext.Provider>
  );
};
