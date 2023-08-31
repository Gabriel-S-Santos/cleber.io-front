import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { FontFamily, Color } from "../GlobalStyles";

const SplashScreen = () => {
  return (
    <View style={styles.splashscreen}>
      <Text style={styles.title}>Cleber.io</Text>
      <Image
        style={styles.trashIcon}
        contentFit="cover"
        source={require("../assets/trash1@3x.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: "900",
    fontFamily: FontFamily.poppinsBlack,
    color: Color.white,
    textAlign: "left",
    position: "relative",
    margin:'0',
  },
  trashIcon: {
    marginTop:"7%",
    height: "9.63%",
    width: "15.56%",
    position: 'relative',
    maxWidth: "100%",
    maxHeight: "100%",
  },
  splashscreen: {
    backgroundColor: Color.darkslategray,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
