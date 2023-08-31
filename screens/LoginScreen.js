import * as React from "react";
import { Text, StyleSheet, View, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, FontSize, Color, FontFamily } from "../GlobalStyles";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [user, onChangeUser] = React.useState('');
  const [pass, onChangePass] = React.useState('');

  return (
    <View style={styles.loginscreen}>
      <View style={styles.login}>

        {/* TITULO */}
        <Text style={styles.title}>Cleber.io</Text>
        
        <TextInput
          style={styles.divLayout}
          onChangeText={onChangeUser}
          value={user}
          placeholder="Username"
        />

        <TextInput
          style={styles.divLayout}
          onChangeText={onChangePass}
          value={pass}
          placeholder="Password"
          secureTextEntry={true}
        />

        {/*btn*/}
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("MainScreen")}
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
});

export default LoginScreen;
