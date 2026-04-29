import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, Text, Image, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import routes from "../../navigation/routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CANDY_ASSETS = {
  red: require('../../assets/gameStuff/Rednut.png'),
  blue: require('../../assets/gameStuff/Pistachio.png'),
  green: require('../../assets/gameStuff/Walnut.png'),
  yellow: require('../../assets/gameStuff/Jackfruit.png'),
  purple: require('../../assets/gameStuff/Tigernut.png'),
  orange: require('../../assets/gameStuff/Coconut.png'),
};
const { width } = Dimensions.get('window');
const GRID_SIZE = 8;
const TILE_SIZE = width / GRID_SIZE;
const CANDY_KEYS = Object.keys(CANDY_ASSETS);
const screenWidth = Dimensions.get('window').width;
const squareSize = screenWidth / width;

const NikaGameScreen = ({navigation}) => {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(20);
  const [isGameOver, setGameOver] = useState(false);
  const [gameStarted, startGame] = useState(true);
  const [paused, setPaused] = useState(false);

  // 1. Randomly generate grid colors
  const createBoard = () => {
    const randomGrid = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      const row = [];
      for (let c = 0; c < GRID_SIZE; c++) {
        // Simple random pick
        //const randomColor = CANDY_COLORS[Math.floor(Math.random() * CANDY_COLORS.length)];
        const randomColor = CANDY_KEYS[Math.floor(Math.random() * CANDY_KEYS.length)];
        row.push(randomColor);
      }
      randomGrid.push(row);
    }
    return randomGrid;
  };

  useEffect(() => {
    setGrid(createBoard());
  }, []);

  // 2. Core Match-Checking Logic
  const checkMatches = (currentGrid) => {
    let matchedIndices = [];
    // Horizontal Check
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE - 2; c++) {
        let color = currentGrid[r][c];
        if (color && color === currentGrid[r][c + 1] && color === currentGrid[r][c + 2]) {
          matchedIndices.push({ r, c }, { r, c: c + 1 }, { r, c: c + 2 });
        }
      }
    }
    // Vertical Check
    for (let c = 0; c < GRID_SIZE; c++) {
      for (let r = 0; r < GRID_SIZE - 2; r++) {
        let color = currentGrid[r][c];
        if (color && color === currentGrid[r + 1][c] && color === currentGrid[r + 2][c]) {
          matchedIndices.push({ r, c }, { r: r + 1, c }, { r: r + 2, c });
        }
      }
    }
    return matchedIndices;
  };

  // 3. Gesture Handling (Swapping Logic)
  const onGestureEvent = (event, r, c) => {
    const { translationX, translationY } = event.nativeEvent;
    const threshold = 30;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > threshold) handleSwap(r, c, r, c + 1); // Right
      else if (translationX < -threshold) handleSwap(r, c, r, c - 1); // Left
    } else {
      if (translationY > threshold) handleSwap(r, c, r + 1, c); // Down
      else if (translationY < -threshold) handleSwap(r, c, r - 1, c); // Up
    }
  };

const handleSwap = (r1, c1, r2, c2) => {
  if (paused || isGameOver || r2 < 0 || r2 >= GRID_SIZE || c2 < 0 || c2 >= GRID_SIZE) return;

  const newGrid = [...grid.map(row => [...row])];
  const temp = newGrid[r1][c1];
  newGrid[r1][c1] = newGrid[r2][c2];
  newGrid[r2][c2] = temp;

  const matches = checkMatches(newGrid);
  
  if (matches.length > 0) {
    // 1. Decrement moves
    setMoves(prev => {
      const remaining = prev - 1;
      if (remaining <= 0) setGameOver(true);
      return remaining;
    });

    // 2. Handle matches
    setScore(prev => prev + (matches.length * 10));
    matches.forEach(({ r, c }) => { newGrid[r][c] = null; });
    setGrid(newGrid);
    setTimeout(() => applyGravity(newGrid), 300);
  }
};

  const applyGravity = (currentGrid) => {
    const newGrid = [...currentGrid.map(row => [...row])];

    for (let c = 0; c < GRID_SIZE; c++) {
      let emptySlots = 0;
      // 1. Move existing candies down
      for (let r = GRID_SIZE - 1; r >= 0; r--) {
        if (newGrid[r][c] === null) {
          emptySlots++;
        } else if (emptySlots > 0) {
          newGrid[r + emptySlots][c] = newGrid[r][c];
          newGrid[r][c] = null;
        }
      }
      // 2. Fill the top empty slots with new random colors
      for (let r = 0; r < emptySlots; r++) {
        newGrid[r][c] = CANDY_KEYS[Math.floor(Math.random() * CANDY_KEYS.length)];
      }
    }

    setGrid(newGrid);

    // 3. Check again for new matches created by falling candies (Cascade)
    const nextMatches = checkMatches(newGrid);
    if (nextMatches.length > 0) {
      setTimeout(() => {
        nextMatches.forEach(({ r, c }) => { newGrid[r][c] = null; });
        setGrid(newGrid);
        setTimeout(() => applyGravity(newGrid), 300);
      }, 300);
    }
  };

  const resetGame = () => {
    startGame(false);
    setGrid(createBoard());
    setScore(0);
    setMoves(20);
    setGameOver(false);
  };

  const pauseGame = () => {
    setPaused(true);
  };

  const resumeGame = () => {
    setPaused(false);
  };

  const goHome = () => {
   setPaused(false);
   navigation.replace(routes.CHILD_GAME_HOME);
   startGame(false);
   setGameOver(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        style={styles.background}
        source={require("../../assets/gameStuff/Garman_BG.png")}
      >
     {/* Game Over Modal */}
     <Modal visible={gameStarted} transparent={true} animationType="fade">
       <View style={styles.modalOverlay}>
         <View style={styles.modalContent}>
           <Text style={styles.modalTitle}>A Nutty Match</Text>
           <Text style={styles.modalText}>Match as many nuts as you can!</Text>
           <TouchableOpacity style={styles.button} onPress={resetGame}>
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

     <Modal visible={isGameOver} transparent={true} animationType="fade">
       <View style={styles.modalOverlay}>
         <View style={styles.modalContent}>
           <Text style={styles.modalTitle}>🎉 Well Done! 🎉</Text>
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
    
        <SafeAreaView style={styles.container}>

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

          <View style={styles.header}>
              <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>MOVES</Text>
              <Text style={[styles.scoreValue, moves <= 5 && {color: '#e74c3c'}]}>{moves}</Text>
              </View>
              <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>SCORE</Text>
              <Text style={styles.scoreValue}>{score}</Text>
              </View>
          </View>

          <View style={styles.board}>
            {grid.map((row, r) =>
              row.map((color, c) => (
                <PanGestureHandler
                  key={`${r}-${c}`}
                  onEnded={(e) => onGestureEvent(e, r, c)}
                  >
                  <View style={styles.tile}>
                      {color ? ( // If the candy isn't cleared (null)
                      <Image 
                          source={CANDY_ASSETS[color]} 
                          style={styles.candyImage}
                          resizeMode="contain"
                      />
                      ) : null}
                  </View>
                  </PanGestureHandler>
              ))
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    width: width,
    height: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#333',
  },
candyImage: {
  width: '90%',
  height: '90%',
},
background: {
  flex: 1,
},
tile: {
  width: TILE_SIZE,
  height: TILE_SIZE,
  justifyContent: 'center',
  alignItems: 'center',
  // You can remove the border here if you want a cleaner look
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
header: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  marginBottom: 20,
},
statBox: {
  alignItems: 'center',
  backgroundColor: '#34495e',
  padding: 10,
  borderRadius: 10,
  minWidth: 100,
},
overlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0,0,0,0.85)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
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
    top: 40,
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
gameOverText: { color: '#fff', fontSize: 40, fontWeight: 'bold' },

});

export default NikaGameScreen;