import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Color } from "../GlobalStyles";

const LoadingScreen = () => {
  return (
    <View style={styles.loadingscreen}>
      <Image
        style={styles.trashIcon}
        contentFit="cover"
        source={require("../assets/trash@3x.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  trashIcon: {
    position: "absolute",
    height: "15.38%",
    width: "25.56%",
    top: "42.75%",
    right: "37.22%",
    bottom: "41.88%",
    left: "37.22%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  loadingscreen: {
    backgroundColor: Color.darkslategray,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default LoadingScreen;
