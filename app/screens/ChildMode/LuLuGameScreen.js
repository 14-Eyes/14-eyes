import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableWithoutFeedback, Image, Animated, Modal, TouchableOpacity, ImageBackground } from "react-native";
import { Accelerometer } from "expo-sensors";
import routes from "../../navigation/routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const BASKET_WIDTH = 200;
const BASKET_HEIGHT = 120;
const BASKET_Y = screenHeight - 120;

const FRUIT_SIZE = 50;
const FRUIT_SPEED = 6;
const SPAWN_RATE = 1200;

const fruitImages = [
 require("../../assets/gameStuff/Lemon.png"),
 require("../../assets/gameStuff/Orange.png"),
 require("../../assets/gameStuff/Water.png"),
 require("../../assets/gameStuff/Blackberry.png"),
 require("../../assets/gameStuff/Grape.png"),
 require("../../assets/gameStuff/Green_Grape.png"),
 require("../../assets/gameStuff/Red_Grape.png"),
 require("../../assets/gameStuff/Strawberry.png"),
];

export default function LuLuGameScreen({navigation}) {
 const basketX = useRef(new Animated.Value((screenWidth - BASKET_WIDTH) / 2)).current;
 const basketXRef = useRef((screenWidth - BASKET_WIDTH) / 2);
 const basketBoundsRef = useRef({});

 const [fallingFruits, setFallingFruits] = useState([]);
 const [score, setScore] = useState(0);
 const [gameOver, setGameOver] = useState(false);
 const [gameStarted, startGame] = useState(true);
 const [paused, setPaused] = useState(false);

 basketX.addListener(({ value }) => {
   basketXRef.current = value;
   basketBoundsRef.current = {
     left: value,
     right: value + BASKET_WIDTH,
     top: BASKET_Y,
     bottom: BASKET_Y + BASKET_HEIGHT,
   };
 });

 useEffect(() => {
   if (gameOver || gameStarted || paused) return;

   Accelerometer.setUpdateInterval(16);
   const subscription = Accelerometer.addListener(({ x }) => {
     Animated.timing(basketX, {
       toValue: Math.max(0, Math.min(screenWidth - BASKET_WIDTH, basketXRef.current + x * 35)),
       duration: 16,
       useNativeDriver: false,
     }).start();
   });

   return () => subscription.remove();
 }, [gameOver, gameStarted, paused]);

 useEffect(() => {
   if (gameOver || gameStarted || paused) return;

   const spawnInterval = setInterval(() => {
     setFallingFruits(prev => [
       ...prev,
       {
         id: Date.now(),
         image: fruitImages[Math.floor(Math.random() * fruitImages.length)],
         x: Math.random() * (screenWidth - FRUIT_SIZE),
         y: -FRUIT_SIZE,
       }
     ]);
   }, SPAWN_RATE);

   const moveInterval = setInterval(() => {
     setFallingFruits(prev =>
       prev.reduce((acc, f) => {
         const moved = { ...f, y: f.y + FRUIT_SPEED };

         const b = basketBoundsRef.current;
         const caught =
           moved.x <  b.right &&
           moved.x + FRUIT_SIZE > b.left &&
           moved.y + FRUIT_SIZE > b.top &&
           moved.y < b.bottom;

         if (caught) {
           setScore(s => s + 1);
           return acc;
         }

         if (moved.y > screenHeight) {
           setGameOver(true);
           return acc;
         }

         acc.push(moved);
         return acc;
       }, [])
     );
   }, 16);

   return () => {
     clearInterval(spawnInterval);
     clearInterval(moveInterval);
   };
 }, [gameOver, gameStarted, paused]);

 const startLevel = () => {
   setScore(0);
   setFallingFruits([]);
   startGame(false);
   console.log(gameStarted)

   basketXRef.current = (screenWidth - BASKET_WIDTH) / 2;
   basketX.setValue(basketXRef.current);
 };

 const resetGame = () => {
   setScore(0);
   setFallingFruits([]);
   setGameOver(false);

   basketXRef.current = (screenWidth - BASKET_WIDTH) / 2;
   basketX.setValue(basketXRef.current);
 };

const pauseGame = () => {
  setPaused(true);
};

const resumeGame = () => {
  setPaused(false);
};

 const goHome = () => {
  setPaused(false);
  startGame(true);
  setGameOver(false);
  navigation.replace(routes.CHILD_GAME_HOME);
 };
 

 return (
   <TouchableWithoutFeedback>
      <ImageBackground
        style={styles.background}
        source={require("../../assets/gameStuff/LuLu_BG.png")}
      >
     <View style={styles.container}>
     <Modal visible={gameStarted} transparent={true} animationType="fade">
       <View style={styles.modalOverlay}>
         <View style={styles.modalContent}>
           <Text style={styles.modalTitle}>Juice Jumble</Text>
           <Text style={styles.modalText}>Tilt the screen left and right to move the basket! Catch as many fruits as you can.</Text>
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

     <Modal visible={gameOver} transparent={true} animationType="fade">
       <View style={styles.modalOverlay}>
         <View style={styles.modalContent}>
           <Text style={styles.modalTitle}>🎉 Game Over 🎉</Text>
           <Text style={styles.modalText}>You got {score} points!</Text>
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
          color="white"
          size={28}
        />
      </TouchableOpacity>

       <Animated.Image
         source={require("../../assets/gameStuff/Basket.png")}
         style={[styles.basket, { left: basketX, top: BASKET_Y }]}
       />

       {fallingFruits.map(fruit => (
         <Image
           key={fruit.id}
           source={fruit.image}
           style={[styles.fruit, { left: fruit.x, top: fruit.y }]}
         />
       ))}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>SCORE</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>

       <StatusBar style="light" />
     </View>
     </ImageBackground>
   </TouchableWithoutFeedback>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "transparent",
   justifyContent: "flex-end",
   alignItems: "center",
 },
  background: {
    flex: 1,
  },
 basket: {
   position: "absolute",
   width: BASKET_WIDTH,
   height: BASKET_HEIGHT,
   resizeMode: "contain",
 },
 fruit: {
   position: "absolute",
   width: FRUIT_SIZE,
   height: FRUIT_SIZE,
   resizeMode: "contain",
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
   marginBottom: 5,
   borderRadius: 10,
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
  marginBottom: 710,
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