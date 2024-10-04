import React, { useRef } from "react";
import { View, Text } from "react-native";
import Recorder from "./components/Recorder";

export default function App() {
  const recorderRef = useRef(null);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>My Voice Recorder</Text>
      <Recorder ref={recorderRef} />
    </View>
  );
}
