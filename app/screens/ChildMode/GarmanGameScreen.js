import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Animated, Easing, Modal } from 'react-native';
import colors from "../../config/colors";
import routes from "../../navigation/routes";

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
       'apple-whole',
       'apple-whole',
       'lemon',
       'lemon',
       'carrot',
       'carrot',
       'pepper-hot',
       'pepper-hot',
       'leaf',
       'leaf',
       'egg',
       'egg',
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

   const cardClickFunction = (card) => {
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

 const goHome = () => {
  setGameWon(false);
  startGame(true);
  navigation.navigate(routes.CHILD_GAME_HOME);
 };

   return (
       <View style={styles.container}>
           <Text style={styles.matchText}>{msg}</Text>

        <Modal visible={gameStarted} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Fruit Finder</Text>
            <Text style={styles.modalText}>Click on the cards to flip them over. If the match isn't right, they'll flip back!</Text>
            <TouchableOpacity style={styles.button} onPress={startLevel}>
                <Text style={styles.buttonText}>Play</Text>
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
                               <Icon name={card.symbol}
                                   size={40} style={styles.cardIcon} /> : null}
                       </TouchableOpacity>
                   ))}
               </View>
       </View>
   );
};
const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor: 'white',
   },
   header1: {
       fontSize: 36,
       marginBottom: 10,
       color: 'green',
   },
   header2: {
       fontSize: 18,
       marginBottom: 20,
       color: 'black',
       fontWeight: 'bold',
   },
   matchText: {
       fontSize: 25,
       marginBottom: 20,
       color: 'black',
       fontWeight: 'bold',
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
});
export default GarmanGameScreen;