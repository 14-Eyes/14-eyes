import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Modal, ImageBackground, Image } from 'react-native';
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Icon
   from 'react-native-vector-icons/FontAwesome6';

const randomArrFunction = (arr) => {
   for (let i = arr.length - 1; i > 0; i--) {
       const j =
           Math.floor(Math.random() * (i + 1));
       [arr[i], arr[j]] = [arr[j], arr[i]];
   }
   return arr;
};
const gameCardsFunction = () => {
   const icons = [
       require('../../assets/gameStuff/Blackberry.png'),
       require('../../assets/gameStuff/Blackberry.png'),
       require('../../assets/gameStuff/Grape.png'),
       require('../../assets/gameStuff/Grape.png'),
       require('../../assets/gameStuff/Green_Grape.png'),
       require('../../assets/gameStuff/Green_Grape.png'),
       require('../../assets/gameStuff/Red_Grape.png'),
       require('../../assets/gameStuff/Red_Grape.png'),
       require('../../assets/gameStuff/Blueberry.png'),
       require('../../assets/gameStuff/Blueberry.png'),
       require('../../assets/gameStuff/Plum.png'),
       require('../../assets/gameStuff/Plum.png'),
   ];
   const randomIcons =
       randomArrFunction(icons);
   return randomIcons.map(
       (icon, index) => ({
           id: index,
           symbol: icon,
           isFlipped: false,
       }));
};
const GarmanGameScreen = ({navigation}) => {
   const [cards, setCards] = useState(gameCardsFunction());
   const [selectedCards, setSelectedCards] = useState([]);
   const [matches, setMatches] = useState(0);
   const [winMessage, setWinMessage] = useState(new Animated.Value(0));
   const [gameWon, setGameWon] = useState(false);
   const [gameStarted, startGame] = useState(true);
   const [paused, setPaused] = useState(false);

   const cardClickFunction = (card) => {
       if (paused || gameStarted || gameWon) return;

       if (!gameWon && selectedCards.length < 2
           && !card.isFlipped) {
           const updatedSelectedCards =
               [...selectedCards, card];
           const updatedCards =
               cards.map((c) =>
                   c.id ===
                       card.id ?
                       { ...c, isFlipped: true } : c
               );
           setSelectedCards(updatedSelectedCards);
           setCards(updatedCards);
           if (updatedSelectedCards.length === 2) {
               if (updatedSelectedCards[0].symbol ===
                   updatedSelectedCards[1].symbol) {
                   setMatches(matches + 1);
                   setSelectedCards([]);
                   if (matches + 1 === cards.length / 2) {
                       geekWinGameFunction();
                       setGameWon(true);
                   }
               } else {
                   setTimeout(() => {
                       const flippedCards =
                           updatedCards.map((c) =>
                               updatedSelectedCards.some((s) =>
                                   s.id === c.id) ?
                                   { ...c, isFlipped: false } : c
                           );
                       setSelectedCards([]);
                       setCards(flippedCards);
                   }, 1000);
               }
           }
       }
   };
   const geekWinGameFunction = () => {
       Animated.timing(winMessage, {
           toValue: 1,
           duration: 1000,
           easing: Easing.linear,
           useNativeDriver: false,
       }).start();
   };
   useEffect(() => {
       if (matches === cards.length / 2) {
           geekWinGameFunction();
           setGameWon(true);
       }
   }, [matches]);
   const msg =
       `Matches: ${matches} / ${cards.length / 2}`;

 const startLevel = () => {
   startGame(false);
 };

 const resetGame = () => {
    setCards(gameCardsFunction());
    setSelectedCards([]);
    setMatches(0);
    setWinMessage(new Animated.Value(0));
    setGameWon(false);
 };

 const pauseGame = () => {
    setPaused(true);
 };

 const resumeGame = () => {
    setPaused(false);
 };

 const goHome = () => {
  setPaused(false);
  setGameWon(false);
  startGame(true);
  navigation.replace(routes.CHILD_GAME_HOME);
 };

   return (
      <ImageBackground
        style={styles.background}
        source={require("../../assets/gameStuff/Garman_BG.png")}
      >
       <View style={styles.container}>
        <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>MATCHES</Text>
            <Text style={styles.scoreValue}>{msg}</Text>
        </View>

        <Modal visible={gameStarted} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Fruit Finder</Text>
            <Text style={styles.modalText}>Click on the cards to flip them over. If the match isn't right, they'll flip back!</Text>
            <TouchableOpacity style={styles.button} onPress={startLevel}>
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={goHome}
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>

        <Modal visible={gameWon} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🎉 Game Over 🎉</Text>
            <Text style={styles.modalText}>You matched all the cards!</Text>
            <TouchableOpacity style={styles.button} onPress={resetGame}>
                <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={goHome}>
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>

        <Modal visible={paused} transparent={true} animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Game Paused</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={resumeGame}
                >
                    <Text style={styles.buttonText}>Resume</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={goHome}
                >
                    <Text style={styles.buttonText}>Back to Games</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <TouchableOpacity
            style={styles.pauseButton}
            onPress={pauseGame}
        >
            <MaterialCommunityIcons
                name="pause"
                size={28}
                color="white"
            />
        </TouchableOpacity>

            <View style={styles.grid}>
                {cards.map((card) => (
                    <TouchableOpacity
                        key={card.id}
                        style={
                            [styles.card,
                            card.isFlipped && styles.cardFlipped]}
                        onPress={() => cardClickFunction(card)}
                    >
                        {card.isFlipped ?
                            <Image name={card.symbol}
                            source={card.symbol} 
                            style={{ width: 40, height: 40, resizeMode: 'contain' }} /> : null}
                    </TouchableOpacity>
                ))}
            </View>
       </View>
    </ImageBackground>
   );
};
const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
   },
    background: {
        flex: 1,
    },
   grid: {
       flexDirection: 'row',
       flexWrap: 'wrap',
       justifyContent: 'center',
   },
   card: {
       width: 80,
       height: 80,
       margin: 10,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: colors.eltrblue,
       borderRadius: 10,
       borderWidth: 1,
       borderColor: 'black',
   },
   cardFlipped: {
       backgroundColor: '#0F4A64',
   },
   cardIcon: {
       color: 'white',
   },
 modalOverlay: {
   flex: 1,
   backgroundColor: 'rgba(0,0,0,0.6)',
   justifyContent: 'center',
   alignItems: 'center',
 },
 modalContent: {
   width: '80%',
   backgroundColor: 'white',
   padding: 30,
   borderRadius: 20,
   alignItems: 'center',
   elevation: 10,
 },
 modalTitle: {
   fontSize: 24,
   fontWeight: 'bold',
   marginBottom: 10,
 },
 modalText: {
   fontSize: 18,
   marginBottom: 20,
   textAlign: 'center',
 },
 pauseButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#3B82F6",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    },
 button: {
   backgroundColor: '#3B82F6',
   paddingHorizontal: 30,
   paddingVertical: 12,
   borderRadius: 10,
   marginBottom: 5,
 },
 buttonText: {
   color: 'white',
   fontSize: 16,
   fontWeight: 'bold',
 },
 scoreContainer: {
  backgroundColor: '#34495e',
  paddingHorizontal: 30,
  paddingVertical: 10,
  borderRadius: 20,
  marginBottom: 20,
  alignItems: 'center',
  borderWidth: 2,
  borderColor: '#f1c40f',
},
scoreLabel: {
  color: '#bdc3c7',
  fontSize: 14,
  fontWeight: 'bold',
},
scoreValue: {
  color: '#fff',
  fontSize: 28,
  fontWeight: '900',
},
});
export default GarmanGameScreen;