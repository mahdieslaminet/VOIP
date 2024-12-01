"use client";

import * as React from "react";

import { StandardButton } from "./button";
import { SocketIoContext } from "../provider/socket-io.provider";
import { RecorderContext } from "../provider/recorder-provider";

export const VoiceRecorder: React.FC = () => {
  const { socket } = React.useContext(SocketIoContext);
  const settings = React.useContext(RecorderContext);

  const [isRecording, setIsRecording] = React.useState<boolean>(false);

  const record = React.useRef<boolean>(false);
  const audioBlob = React.useRef<BlobPart[]>([]);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);

  const sendVoiceToServer = (blob: Blob) => {
    if (!socket) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onloadend = function () {
      const base64String = fileReader.result as string;
      socket.emit("audioStream", base64String);
      audioBlob.current = [];
    };
  };

  const resetMediaRecorder = () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.start();
    setTimeout(() => {
      if (!mediaRecorderRef.current) return;
      mediaRecorderRef.current.stop();
    }, settings.quantizationTime);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: settings.echoCancellation,
          noiseSuppression: settings.noiseSuppression,
        },
        video: false,
      });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = async (event) => {
        if (!record.current) return;
        if (event.data.size <= 0 || !socket) return;
        audioBlob.current.push(event.data);
      };

      mediaRecorderRef.current.addEventListener("stop", async () => {
        if (!record.current) return;
        if (!socket || !mediaRecorderRef.current) return;
        sendVoiceToServer(new Blob(audioBlob.current));
        resetMediaRecorder();
      });

      resetMediaRecorder();
      setIsRecording(true);
      record.current = true;
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();
    setIsRecording(false);
    record.current = false;

    if (!audioBlob.current?.length) return;
    sendVoiceToServer(new Blob(audioBlob.current));
  };

  return (
    <div className="space-y-2">
      <p className="text-3xl font-semibold">Real-Time Voice Recorder</p>
      {isRecording ? (
        <StandardButton onClick={stopRecording}>Stop Recording</StandardButton>
      ) : (
        <StandardButton onClick={startRecording}>
          Start Recording
        </StandardButton>
      )}
    </div>
  );
};
