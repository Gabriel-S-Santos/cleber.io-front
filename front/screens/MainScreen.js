import * as React from "react";
import { StyleSheet, View, Text, Pressable, TextInput, Image } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import AsyncStorage from '@react-native-community/async-storage';

const MainScreen = ({ onLogout }) => {
  const [userId, setUserId] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [allCards, setAllCards] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [showLogoutButton, setShowLogoutButton] = React.useState(false);

  const fetchCards = async () => {
    try {
      const response = await fetch("https://cleberiodb.onrender.com/api/Thrashs");
      if (response.ok) {
        const data = await response.json();
        const user_id = await AsyncStorage.getItem("user_id");
        setAllCards(data.thrashs);
        setCards(data.thrashs);
        setUserId(user_id);
      } else {
        console.error("Failed to fetch cards");
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handleLockClick = async (thrashId) => {
    const cardToUpdate = cards.find((card) => card.id === thrashId);

    if (cardToUpdate && !cardToUpdate.openned) {
      try {
        const response = await fetch(`https://cleberiodb.onrender.com/api/Users/action/${userId}/${thrashId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          fetchCards();
          console.log("Updated card");
        } else {
          console.error("Failed to update card");
        }
      } catch (error) {
        console.error("Error updating card:", error);
      }
    }
  };

  const filterCards = () => {
    if (searchText === "") {
      setCards(allCards);
    } else {
      const filteredCards = cards.filter((card) =>
        card.id.toString().includes(searchText)
      );
      setCards(filteredCards);
    }
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleLogoutClick = () => {
    setShowLogoutButton(!showLogoutButton);
  };

  const handleLogout = async () => {
    console.log('logout')
    await AsyncStorage.setItem("user_id", "");
    onLogout();
  };

  React.useEffect(() => {
    fetchCards();
  }, [])
  
  React.useEffect(() => {
    filterCards();
  }, [searchText]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cleber.io</Text>
        <Pressable style={styles.logoutButton} onPress={handleLogoutClick}>
          <Text style={styles.logoutButtonText}>Adm</Text>
        </Pressable>
      </View>

      {showLogoutButton ? (
        <Pressable style={styles.redLogoutButton} onPress={handleLogout}>
          <Text style={styles.redLogoutButtonText}>Logout</Text>
        </Pressable>
      ) : null}

      <View style={styles.searchBar}>
        <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder="Pesquisar..."
            value={searchText}
            onChangeText={handleSearchTextChange} // Lidar com alterações no campo de pesquisa
          />
        </View>
      </View>

      {/* List of Cards */}
      <View style={styles.cardList}>
        {cards.map((card) => (
          <View
            key={card.id}
            style={[
              styles.cardItem,
              !card.openned && styles.cardClosed, // Aplicar o estilo condicional
            ]}
          >
            {/* Render card details */}
            <View style={styles.cardRow}>
              <View style={styles.cardLeft}>
                
                <Image
                  style={[
                    styles.trashIcon,
                    !card.openned && styles.trashClosed, // Altera a cor do ícone do lixo
                  ]}
                  source={require("../assets/trsh@3x.png")}
                />

                <Text
                  style={[
                    styles.cardId,
                    !card.openned && styles.cardIdClosed, // Altera a cor do texto do ID
                  ]}
                >
                  #{card.id}
                </Text>
              </View>
              <View style={styles.cardRight}>
              <Pressable onPress={() => handleLockClick(card.id)}>
                  {card.openned ? (
                    <Image style={styles.padlockOpenedIcon} source={require("../assets/padlockopenned@3x.png")} />
                  ) : (
                    <Image style={styles.padlockClosedIcon} source={require("../assets/padlockclosed@3x.png")} />
                  )}
              </Pressable>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    height: "100%",
    width: "100%",
  },
  header: {
    backgroundColor: Color.darkslategray,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    color: Color.white,
    fontWeight: "900",
    fontFamily: FontFamily.poppinsBlack,
    fontSize: FontSize.size_xl,
  },
  logoutButton: {
    borderRadius: 5,
    backgroundColor: Color.lightgreen,
    width: 75,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButtonText: {
    color: Color.white,
    fontSize: 12,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    position: "relative",
  },
  searchBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    marginVertical: 10,
  },
  inputContainer: {
    marginVertical: 8,
    marginLeft: 8,
    backgroundColor: Color.gray,
    borderRadius: Border.br_3xs,
    width: "95%",
    height: 45,
    shadowOpacity: 0.3,
    elevation: 6,
    shadowRadius: 6,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  input: {
    flex: 1,
    fontSize: FontSize.size_mini,
    fontWeight: "300",
    fontFamily: FontFamily.poppinsLight,
    color: Color.darkslategray,
    paddingHorizontal: 8,
  },
  cardList: {
    paddingHorizontal: 16,
  },
  cardItem: {
    marginVertical: 10,
    marginLeft: 8,
    height: 180,
    width: "95%",
    backgroundColor: Color.gray,
    borderRadius: Border.br_3xs,
    marginBottom: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    elevation: 6,
    shadowRadius: 6,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  trashIcon: {
    width: 45,
    height: 60,
  },
  cardId: {
    fontSize: FontSize.size_xl,
    fontWeight: "800",
    fontFamily: FontFamily.poppinsExtraBold,
    color: "#565680",
    marginLeft: 8,
  },
  cardRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  padlockOpenedIcon: {
    width: 40,
    height: 60,
  },
  padlockClosedIcon: {
    width: 40,
    height: 60,
  },
  cardClosed: {
    borderColor: "#E56F6F",
    borderWidth: 3,
    shadowColor: "#E56F6F",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 6,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  trashClosed: {
    tintColor: "#E56F6F",
  },
  cardIdClosed: {
    color: "#E56F6F",
  },
  redLogoutButton: {
    borderRadius: 5,
    backgroundColor: "#E56F6F",
    width: 75,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 45,
    right: 16,
    zIndex: 9999,
    marginTop: 10
  },
  redLogoutButtonText: {
    color: Color.white,
    fontSize: 12,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    position: "absolute",
  },
});

export default MainScreen;