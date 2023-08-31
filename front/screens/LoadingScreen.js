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
    position: "relative",
    height: "16.48%",
    width: "25.56%",
  },
  loadingscreen: {
    backgroundColor: Color.darkslategray,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
