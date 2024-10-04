import React, { forwardRef, useState, useImperativeHandle } from "react";
import { Button, View, Text } from "react-native";
import { Audio } from "expo-av";
import { getMicrophonePermission } from "../utils/permissions";

const Recorder = forwardRef((props, ref) => {
  const [recording, setRecording] = useState(null);
  const [recordedURI, setRecordedURI] = useState(null);

  const startRecording = async () => {
    // Check for microphone permission before recording
    const hasPermission = await getMicrophonePermission();
    if (!hasPermission) return;

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordedURI(uri);
      setRecording(null);
    } catch (err) {
      console.error("Failed to stop recording:", err);
    }
  };

  const playRecording = async () => {
    if (recordedURI) {
      const { sound } = await Audio.Sound.createAsync({ uri: recordedURI });
      await sound.playAsync();
    }
  };

  useImperativeHandle(ref, () => ({
    startRecording,
  }));

  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Text>Voice Recorder</Text>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button title="Play Recording" onPress={playRecording} disabled={!recordedURI} />
    </View>
  );
});

export default Recorder;
