"use client";

import * as React from "react";

import { StandardButton } from "./button";
import { SocketIoContext } from "../provider/socket-io.provider";

export const VoicePlayer: React.FC = () => {
  const { socket } = React.useContext(SocketIoContext);
  const [isListening, setIsIslistening] = React.useState<boolean>(false);
  const listen = React.useRef<boolean>(false);

  const toggleListening = () => {
    setIsIslistening(!isListening);
  };
  React.useEffect(() => {
    listen.current = isListening;
  }, [isListening]);

  React.useEffect(() => {
    if (!socket) return;

    socket.on("audioStream", (audioData: string) => {
      if (!listen.current) return;
      const newData = audioData.split(";");
      const audio = new Audio(`data:audio/ogg;${newData[1]}`);
      if (!audio || document.hidden) return;
      audio.play();
    });
  }, [socket]);

  return (
    <div className="space-y-2">
      <p className="text-3xl font-semibold">Real-Time Voice Listener</p>
      <StandardButton onClick={toggleListening}>
        {isListening ? "Stop" : "Start"} Listening
      </StandardButton>
    </div>
  );
};
