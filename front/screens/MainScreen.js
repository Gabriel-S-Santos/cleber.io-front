import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const MainScreen = () => {
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    try {
      const response = await fetch(".../api/Thrashs");
      if (response.ok) {
        const data = await response.json();
        // Do something with the fetched data (update state, etc.)
      } else {
        console.error("Failed to fetch cards");
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handleLockClick = async (thrashId) => {
    try {
      const response = await fetch(`.../api/User/${userId}/${thrashId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // You can add the payload or data you want to update here
      });

      if (response.ok) {
        // Handle successful update (e.g., update UI)
      } else {
        console.error("Failed to update card");
      }
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <View style={styles.mainscreen}>
      <View style={[styles.bg, styles.bgPosition]}>
        <Text style={[styles.title, styles.titleClr]}>Cleber.io</Text>
        {/*btn*/}
        <Pressable
          style={styles.buttonbg}
          onPress={() => navigation.navigate("")}
        >
          <Text style={[styles.btntext, styles.titleClr]}>Adm</Text>
        </Pressable>
      </View>
      <View style={[styles.searchbar, styles.inputLayout]}>
        <View style={[styles.input, styles.inputShadowBox]} />
        <Text style={styles.placeholder}>Pesquisar...</Text>
      </View>

      {/* List of Cards */}
      <View style={styles.cardList}>
        {cards.map((card) => (
          <View key={card.id} style={styles.cardItem}>
            {/* Render card details */}
            <Text>{card.title}</Text>
            <Text>{card.description}</Text>
            {/* Lock icon */}
            <Pressable onPress={() => handleLockClick(card.id)}>
              <Image
                style={[styles.trshIcon, styles.iconLayout]}
                contentFit="cover"
                source={require("../assets/trsh@3x.png")}
              />
            </Pressable>
          </View>
        ))}
      </View>

      <View style={[styles.trashcard, styles.cardbgLayout]}>
        <View style={[styles.cardbg, styles.cardbgLayout]} />
        <View style={styles.trashid}>
          <Image
            style={[styles.trshIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/trsh@3x.png")}
          />
          <Text style={[styles.id, styles.idLayout]}>#001</Text>
        </View>
        <Image
          style={[styles.padlockopennedIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/padlockopenned@3x.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgPosition: {
    height: "8%",
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItens: "center",
  },
  titleClr: {
    color: Color.white,
    textAlign: "left",
    position: "relative",
  },
  idLayout: {
    height: 25,
    position: "realtive",
  },
  inputLayout: {
    height: 45,
    width: 310,
    position: "absolute",
  },
  inputShadowBox: {
    shadowOpacity: 1,
    elevation: 13,
    shadowRadius: 13,
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.gray,
    left: 0,
    top: 0,
  },
  cardbgLayout: {
    height: 145,
    width: 310,
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  bg: {
    backgroundColor: Color.darkslategray,
  },
  title: {
    top: 16,
    fontWeight: "900",
    fontFamily: FontFamily.poppinsBlack,
    textAlign: "left",
    fontSize: FontSize.size_xl,
    left: 25,
  },
  buttonbg: {
    borderRadius: 5,
    backgroundColor: Color.lightgreen,
    width: 75,
    height: 25,
    margin: "5%",
    marginRight: "7%",
  },
  btntext: {
    top: 3,
    left: 22,
    fontSize: 12,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    width: 32,
    height: 19,
    textAlign: "left",
  },
  logoutbtn: {
    top: 19,
    left: 260,
    width: 75,
    height: 25,
  },
  input: {
    borderRadius: Border.br_3xs,
    height: 45,
    width: 310,
    position: "absolute",
  },
  placeholder: {
    top: 11,
    left: 8,
    fontSize: FontSize.size_mini,
    fontWeight: "300",
    fontFamily: FontFamily.poppinsLight,
    color: Color.darkslategray,
    textAlign: "left",
    position: "absolute",
  },
  searchbar: {
    top: 87,
    left: 25,
  },
  cardbg: {
    borderRadius: 16,
    shadowOpacity: 1,
    elevation: 13,
    shadowRadius: 13,
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.gray,
    left: 0,
    top: 0,
  },
  trshIcon: {
    height: "100%",
    width: "33.63%",
    top: "0%",
    right: "66.37%",
    bottom: "0%",
    left: "0%",
  },
  id: {
    top: 9,
    left: 29,
    fontWeight: "800",
    fontFamily: FontFamily.poppinsExtraBold,
    color: "#565680",
    width: 57,
    textAlign: "left",
    fontSize: FontSize.size_xl,
  },
  trashid: {
    height: "26.9%",
    width: "27.9%",
    top: "38.62%",
    right: "57.1%",
    left: "15%",
    bottom: "34.48%",
    position: "absolute",
  },
  padlockopennedIcon: {
    height: "31.03%",
    width: "10.16%",
    top: "34.48%",
    right: "20.16%",
    left: "69.68%",
    bottom: "34.48%",
  },
  trashcard: {
    top: 176,
    left: 25,
  },
  padlockclosedIcon: {
    height: "5.63%",
    width: "8.8%",
    top: "74.63%",
    right: "7.04%",
    bottom: "19.75%",
    left: "84.17%",
  },
  mainscreen: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default MainScreen;
