import React, { useEffect, useState, useRef } from 'react';

import { View, Image, StyleSheet, PanResponder, TouchableOpacity, Dimensions } from 'react-native';

import ScoreBoard from '../../components/ScoreBoard'
import blueCandy from '../../assets/gameStuff/Acorn.png'
import greenCandy from '../../assets/gameStuff/Pistachio.png'
import orangeCandy from '../../assets/gameStuff/Walnut.png'
import purpleCandy from '../../assets/gameStuff/Lemon.png'
import redCandy from '../../assets/gameStuff/Orange.png'
import yellowCandy from '../../assets/gameStuff/Water.png'
import blank from '../../assets/gameStuff/blank.png'

const width = 8
const screenWidth = Dimensions.get('window').width;
const squareSize = screenWidth / width;
const candyColors = [
   blueCandy,
   orangeCandy,
   purpleCandy,
   redCandy,
   yellowCandy,
   greenCandy
]

const NikaGameScreen = () => {
   const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
   const [scoreDisplay, setScoreDisplay] = useState(0);
   const squareBeingDraggedId = useRef(null);

   const checkForColumnOfFour = () => {
       for (let i = 0; i <= 39; i++) {
           const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
           const decidedColor = currentColorArrangement[i]
           const isBlank = currentColorArrangement[i] === blank

           if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
               setScoreDisplay((score) => score + 4)
               columnOfFour.forEach(square => currentColorArrangement[square] = blank)
               return true
           }
       }
   }

   const checkForRowOfFour = () => {
       for (let i = 0; i < 64; i++) {
           const rowOfFour = [i, i + 1, i + 2, i + 3]
           const decidedColor = currentColorArrangement[i]
           const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
           const isBlank = currentColorArrangement[i] === blank

           if (notValid.includes(i)) continue

           if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
               setScoreDisplay((score) => score + 4)
               rowOfFour.forEach(square => currentColorArrangement[square] = blank)
               return true
           }
       }
   }

   const checkForColumnOfThree = () => {
       for (let i = 0; i <= 47; i++) {
           const columnOfThree = [i, i + width, i + width * 2]
           const decidedColor = currentColorArrangement[i]
           const isBlank = currentColorArrangement[i] === blank

           if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
               setScoreDisplay((score) => score + 3)
               columnOfThree.forEach(square => currentColorArrangement[square] = blank)
               return true
           }
       }
   }

   const checkForRowOfThree = () => {
       for (let i = 0; i < 64; i++) {
           const rowOfThree = [i, i + 1, i + 2]
           const decidedColor = currentColorArrangement[i]
           const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
           const isBlank = currentColorArrangement[i] === blank

           if (notValid.includes(i)) continue

           if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
               setScoreDisplay((score) => score + 3)
               rowOfThree.forEach(square => currentColorArrangement[square] = blank)
               return true
           }
       }
   }

   const moveIntoSquareBelow = () => {
       for (let i = 0; i <= 55; i++) {
           const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
           const isFirstRow = firstRow.includes(i)

           if (isFirstRow && currentColorArrangement[i] === blank) {
               let randomNumber = Math.floor(Math.random() * candyColors.length)
               currentColorArrangement[i] = candyColors[randomNumber]
           }

           if ((currentColorArrangement[i + width]) === blank) {
               currentColorArrangement[i + width] = currentColorArrangement[i]
               currentColorArrangement[i] = blank
           }
       }
   }

   const panResponder = useRef(
       PanResponder.create({
           onStartShouldSetPanResponder: () => true,
           onPanResponderGrant: (evt, gestureState) => {
               const { x0, y0 } = gestureState;
               const col = Math.floor(x0 / squareSize);
               const row = Math.floor((y0 - 100) / squareSize);
               squareBeingDraggedId.current = row * width + col;
           },
           onPanResponderRelease: (evt, gestureState) => {
               const { dx, dy } = gestureState;
               const startId = squareBeingDraggedId.current;
               let targetId = null;

               if (Math.abs(dx) > Math.abs(dy)) {
                   if (dx > 30) targetId = startId + 1;
                   else if (dx < -30) targetId = startId - 1;
               } else {
                   if (dy > 30) targetId = startId + width;
                   else if (dy < -30) targetId = startId - width;
               }

               if (targetId !== null && targetId >= 0 && targetId < width * width) {
                   handleSwap(startId, targetId);
               }
           },
       })
   ).current;

   const handleSwap = (startId, targetId) => {
       const newArrangement = [...currentColorArrangement];
       const color1 = newArrangement[startId];
       const color2 = newArrangement[targetId];

       newArrangement[targetId] = color1;
       newArrangement[startId] = color2;

       setCurrentColorArrangement(newArrangement);
   };

   const createBoard = () => {
       const randomColorArrangement = [];
       for (let i = 0; i < width * width; i++) {
           const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
           randomColorArrangement.push(randomColor);
       }
       setCurrentColorArrangement(randomColorArrangement);
   };

   useEffect(() => { createBoard(); }, []);

   useEffect(() => {
       const timer = setInterval(() => {
           checkForColumnOfFour()
           checkForRowOfFour()
           checkForColumnOfThree()
           checkForRowOfThree()
           moveIntoSquareBelow()
           setCurrentColorArrangement([...currentColorArrangement])
       }, 100)
       return () => clearInterval(timer)
   }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])

   return (
       <View style={styles.app}>
           <View style={styles.game} {...panResponder.panHandlers}>
               {currentColorArrangement.map((candyColor, index) => (
                   <Image
                       key={index}
                       source={candyColor}
                       style={styles.candyImage}
                   />
               ))}
           </View>


       </View>
   );
}

const styles = StyleSheet.create({
   app: { flex: 1, backgroundColor: '#fff', paddingTop: 100 },
   game: { width: screenWidth, height: screenWidth, flexDirection: 'row', flexWrap: 'wrap' },
   candyImage: { width: squareSize, height: squareSize },
});

export default NikaGameScreen;