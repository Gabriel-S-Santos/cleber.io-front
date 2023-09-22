import * as React from "react";
import { Text, StyleSheet, View, Pressable, TextInput, Alert } from "react-native";
import { Border, FontSize, Color, FontFamily } from "../GlobalStyles";
import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = ({ onLoginSuccess }) => {
  const [user, onChangeUser] = React.useState('');
  const [pass, onChangePass] = React.useState('');
  const [inputBorderColor, setInputBorderColor] = React.useState('#66e097');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleLogin = async () => { 
    try {
      const response = await fetch('https://cleberiodb.onrender.com/api/Users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          password: pass,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem("user_id", data.user.id);
        await AsyncStorage.setItem("user", data.user.username);
        onLoginSuccess();
      } else {
        setErrorMessage("Usuário ou senha incorretos.");
        setInputBorderColor('red');

        setTimeout(() => {
          setErrorMessage('');
          setInputBorderColor('#66e097');
        }, 2000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Usuário ou senha incorretos.");
      setInputBorderColor('red');

      setTimeout(() => {
        setErrorMessage('');
        setInputBorderColor('#66e097');
      }, 2000);
    }
  };

  return (
    <View style={styles.loginscreen}>
      <View style={styles.login}>

      {errorMessage !== '' && (
        <Text style={styles.errorMessage}>{errorMessage}</Text> // Mostra a mensagem de erro se houver
      )}

        {/* TITULO */}
        <Text style={styles.title}>Cleber.io</Text>
        
        <TextInput
          style={[styles.divLayout, { borderColor: inputBorderColor }]}
          onChangeText={onChangeUser}
          value={user}
          placeholder="Username"
        />

        <TextInput
          style={[styles.divLayout, { borderColor: inputBorderColor }]}
          onChangeText={onChangePass}
          value={pass}
          placeholder="Password"
          secureTextEntry={true}
        />

        {/*btn*/}
        <Pressable
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={[styles.btntext, styles.btntextTypo]}>Entrar</Text>
        </Pressable>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  divLayout1: {
    borderRadius: Border.br_3xs,
    top: 0,
  },
  btntextTypo: {
    fontSize: FontSize.size_mini,
    textAlign: "left",
    color: Color.white,
    position: "relative",
  },
  divLayout: {
    paddingLeft:'2%',
    textAlign:'left',
    color:Color.white,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
    borderStyle: "solid",
    borderColor: "#66e097",
    borderWidth: 1,
    borderRadius: Border.br_3xs,
    height: '5vh',
    width: '100%',
    position: "relative",
    marginBottom:'2vh',
  },
  title: {
    fontSize: 45,
    fontWeight: "900",
    fontFamily: FontFamily.poppinsBlack,
    textAlign: "center",
    color: Color.white,
    position: "relative",
    marginBottom:'3vh'    
  },
  btntext: {
    fontFamily: FontFamily.poppinsRegular,
  },
  button: {
    backgroundColor: Color.lightgreen,
    borderRadius: Border.br_3xs,
    height: '4.5vh',
    width: 106,
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '17vw',
  },
  placeholder: {
    textAlign:'center',
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
  },
  login: {
    display:'flex',
    flexDirection:'column',
    justifyContent:"center",
    alignItems:'center',
    position: "relative",
  },
  loginscreen: {
    backgroundColor: Color.darkslategray,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 50,
    textAlign: 'center',
  },
});

export default LoginScreen;
