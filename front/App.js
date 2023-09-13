const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import MainScreen from "./screens/MainScreen";
import LoginScreen from "./screens/LoginScreen";
import SplashScreen from "./screens/SplashScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

const App = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
  });

  const [showLoginScreen, setShowLoginScreen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (fontsLoaded && !showLoginScreen) {
      setTimeout(() => {
        setShowLoginScreen(true);
      }, 3000);
    }
  }, [fontsLoaded, showLoginScreen]);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setShowLoginScreen(false);
    setLoggedIn(false);
  };

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showLoginScreen ? (
          loggedIn ? (
            <Stack.Screen name="MainScreen">
              {(props) => (
                <MainScreen {...props} onLogout={handleLogout} />
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="LoginScreen">
              {(props) => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}
            </Stack.Screen>
          )
        ) : (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;