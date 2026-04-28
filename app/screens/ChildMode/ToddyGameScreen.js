import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableWithoutFeedback, Image, Animated, Modal, TouchableOpacity, ImageBackground } from "react-native";
import { Accelerometer } from "expo-sensors";
import routes from "../../navigation/routes";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const BASKET_WIDTH = 100;
const BASKET_HEIGHT = 120;
const BASKET_Y = screenHeight - 130;

const FRUIT_SIZE = 70;
const FRUIT_SPEED = 5;
const SPAWN_RATE = 1200;
const BULLET_SIZE = 20;
const BULLET_SPEED = 10;

const fruitImages = [
 require("../../assets/gameStuff/Germ1.png"),
 require("../../assets/gameStuff/Germ2.png"),
 require("../../assets/gameStuff/Germ3.png"),
 require("../../assets/gameStuff/Germ4.png"),
 require("../../assets/gameStuff/Germ5.png"),
];

export default function ToddyGameScreen({navigation}) {
 const basketX = useRef(new Animated.Value((screenWidth - BASKET_WIDTH) / 2)).current;
 const basketXRef = useRef((screenWidth - BASKET_WIDTH) / 2);
 const basketBoundsRef = useRef({});

 const [fallingFruits, setFallingFruits] = useState([]);
 const [score, setScore] = useState(0);
 const [gameOver, setGameOver] = useState(false);
 const [gameStarted, startGame] = useState(true);
 const [bullets, setBullets] = useState([]);

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
   if (gameOver) return;

   Accelerometer.setUpdateInterval(16);
   const subscription = Accelerometer.addListener(({ x }) => {
     Animated.timing(basketX, {
       toValue: Math.max(0, Math.min(screenWidth - BASKET_WIDTH, basketXRef.current + x * 35)),
       duration: 16,
       useNativeDriver: false,
     }).start();
   });

   return () => subscription.remove();
 }, [gameOver, gameStarted]);

 useEffect(() => {
   if (gameOver || gameStarted) return;

   const spawnInterval = setInterval(() => {
     setFallingFruits(prev => [
       ...prev,
       {
         id: Date.now(),
         image: fruitImages[Math.floor(Math.random() * fruitImages.length)],
         x: Math.random() * (screenWidth - FRUIT_SIZE - 10),
         y: (-FRUIT_SIZE + 10),
       }
     ]);
   }, SPAWN_RATE);

const moveInterval = setInterval(() => {
  // 1. Calculate new positions for everything locally first
  setBullets((prevBullets) => {
    const movedBullets = prevBullets
      .map((b) => ({ ...b, y: b.y - BULLET_SPEED }))
      .filter((b) => b.y > -BULLET_SIZE);

    setFallingFruits((prevFruits) => {
      let activeBullets = [...movedBullets]; // Copy to modify as they hit things
      let nextFruits = [];

      prevFruits.forEach((f) => {
        const movedFruit = { ...f, y: f.y + FRUIT_SPEED };

        // Check if ANY bullet in our local list hits this fruit
        const bulletIndex = activeBullets.findIndex((b) => (
          b.x < movedFruit.x + FRUIT_SIZE &&
          b.x + BULLET_SIZE > movedFruit.x &&
          b.y < movedFruit.y + FRUIT_SIZE &&
          b.y + BULLET_SIZE > movedFruit.y
        ));

        if (bulletIndex !== -1) {
          // HIT: Remove bullet from local list and don't add fruit to nextFruits
          activeBullets.splice(bulletIndex, 1);
          setScore((s) => s + 5);
          return;
        }

        // Catch logic
        const b = basketBoundsRef.current;
        const caught =
          movedFruit.x < b.right &&
          movedFruit.x + FRUIT_SIZE > b.left &&
          movedFruit.y + FRUIT_SIZE > b.top &&
          movedFruit.y < b.bottom;

        if (caught) {
          setGameOver(true);
          return;
        }

        // Game Over logic
        if (movedFruit.y > screenHeight) {
          setScore((s) => s - 1);
          return;
        }

        nextFruits.push(movedFruit);
      });

      // Update bullets again ONLY with those that didn't hit anything
      // This solves the 'asynchronous state' issue
      if (activeBullets.length !== movedBullets.length) {
         setBullets(activeBullets);
      }

      return nextFruits;
    });

    return movedBullets;
  });
}, 16);

   return () => {
     clearInterval(spawnInterval);
     clearInterval(moveInterval);
   };
 }, [gameOver, gameStarted]);

 const shoot = () => {
  if (gameOver || gameStarted) return;
  
  setBullets(prev => [
    ...prev,
    {
      id: Date.now(),
      x: basketXRef.current + (BASKET_WIDTH / 2) - (BULLET_SIZE / 2),
      y: BASKET_Y,
    }
  ]);
};

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

 const goHome = () => {
  startGame(true);
  setGameOver(false);
  navigation.navigate(routes.CHILD_GAME_HOME);
 };

 return (
   <TouchableWithoutFeedback onPress={shoot}>
      <ImageBackground
        style={styles.background}
        source={require("../../assets/gameStuff/Garman_BG.png")}
      >
     <View style={styles.container}>
        {/* Render Bullets */}
        {bullets.map(bullet => (
          <View
            key={bullet.id}
            style={[styles.bullet, { left: bullet.x, top: bullet.y }]}
          />
        ))}
     {/* Game Over Modal */}
     <Modal visible={gameStarted} transparent={true} animationType="fade">
       <View style={styles.modalOverlay}>
         <View style={styles.modalContent}>
           <Text style={styles.modalTitle}>Red Rumble</Text>
           <Text style={styles.modalText}>Tilt the screen left and right to move the tomato! Click on the screen to shoot as many germs as possible!</Text>
           <TouchableOpacity style={styles.button} onPress={startLevel}>
             <Text style={styles.buttonText}>Play</Text>
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

       <Animated.Image
         source={require("../../assets/gameStuff/Tomato_Shooter.png")}
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
 scoreContainer: {
   justifyContent: "flex-start",
   marginTop: 20,
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
bullet: {
  position: "absolute",
  width: BULLET_SIZE,
  height: BULLET_SIZE,
  backgroundColor: "red",
  borderRadius: BULLET_SIZE / 2,
}
});