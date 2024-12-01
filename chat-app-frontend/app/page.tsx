import { VoicePlayer } from "./components/voice-player";
import { VoiceRecorder } from "./components/voice-recoreder";
import { VoiceSettings } from "./components/voice-settings";
import { RecorderProvider } from "./provider/recorder-provider";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <section className="space-y-6">
        <RecorderProvider>
          <VoiceRecorder />
          <VoicePlayer />
          <VoiceSettings />
        </RecorderProvider>
      </section>
    </main>
  );
}
