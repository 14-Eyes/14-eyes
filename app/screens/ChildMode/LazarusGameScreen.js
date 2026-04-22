import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const GRID_SIZE = 8;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CELL_SIZE = (SCREEN_WIDTH - 40) / GRID_SIZE;
const WORDS_TO_FIND = ['LIME', 'LEMON', 'TOMATO', 'GRAPE'];

export default function GameScreenMain() {
 const [grid, setGrid] = useState([]);
 const [answerKey, setAnswerKey] = useState([]);
 const [foundWords, setFoundWords] = useState([]);
 const [selection, setSelection] = useState({ start: null, end: null, cells: [] });
 const [isGameOver, setIsGameOver] = useState(false);

 // Check for Game Over whenever foundWords updates
 useEffect(() => {
   if (foundWords.length === WORDS_TO_FIND.length && WORDS_TO_FIND.length > 0) {
     setIsGameOver(true);
   }
 }, [foundWords]);

 const resetGame = () => {
   setFoundWords([]);
   setIsGameOver(false);
   generatePuzzle();
 };

 useEffect(() => {
   generatePuzzle();
 }, []);

   const generatePuzzle = () => {
   let newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
   let locations = [];

   // All 8 possible directions: [rowDir, colDir]
   const directions = [
       [0, 1], [0, -1], [1, 0], [-1, 0], // Horizontal & Vertical
       [1, 1], [1, -1], [-1, 1], [-1, -1] // Diagonals
   ];

   WORDS_TO_FIND.forEach(word => {
       let placed = false;
      
       // Create a list of all possible starting positions and directions
       let attempts = [];
       for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            directions.forEach(dir => attempts.push({ r, c, dir }));
        }
       }
      
       // Shuffle attempts so the board looks different every time
       attempts.sort(() => Math.random() - 0.5);

       for (let i = 0; i < attempts.length; i++) {
       const { r, c, dir } = attempts[i];
       let path = [];
       let canPlace = true;

       for (let j = 0; j < word.length; j++) {
           let currR = r + (dir[0] * j);
           let currC = c + (dir[1] * j);


           if (currR < 0 || currR >= GRID_SIZE || currC < 0 || currC >= GRID_SIZE ||
           (newGrid[currR][currC] !== '' && newGrid[currR][currC] !== word[j])) {
           canPlace = false;
           break;
           }
           path.push({ row: currR, col: currC });
       }

       if (canPlace) {
           path.forEach((p, index) => newGrid[p.row][p.col] = word[index]);
           locations.push({ word, path });
           placed = true;
           break; // Move to the next word
       }
       }

       if (!placed) {
       console.warn(`Could not place word: ${word}`);
       }
   });

   // Fill empty spots with random letters
   for (let r = 0; r < GRID_SIZE; r++) {
       for (let c = 0; c < GRID_SIZE; c++) {
       if (newGrid[r][c] === '') {
           newGrid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
       }
       }
   }

   setGrid(newGrid);
   setAnswerKey(locations);
   };

 const getPath = (start, end) => {
   const rDiff = end.row - start.row;
   const cDiff = end.col - start.col;
   const steps = Math.max(Math.abs(rDiff), Math.abs(cDiff));
   if (steps === 0) return [start];
   const rStep = rDiff / steps;
   const cStep = cDiff / steps;

   if (rStep !== 0 && cStep !== 0 && Math.abs(rStep) !== Math.abs(cStep)) return [start];

   return Array.from({ length: steps + 1 }, (_, i) => ({
     row: Math.round(start.row + i * rStep),
     col: Math.round(start.col + i * cStep),
   }));
 };

 const onGestureEvent = (event) => {
   const { x, y } = event.nativeEvent;
   const col = Math.floor(x / CELL_SIZE);
   const row = Math.floor(y / CELL_SIZE);

   if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
     if (!selection.start || selection.end?.row !== row || selection.end?.col !== col) {
       const start = selection.start || { row, col };
       setSelection({ start, end: { row, col }, cells: getPath(start, { row, col }) });
     }
   }
 };

 const onGestureEnd = () => {
   const selectedWord = selection.cells.map(c => grid[c.row][c.col]).join('');
   const match = answerKey.find(a => a.word === selectedWord &&
     JSON.stringify(a.path) === JSON.stringify(selection.cells));

   if (match && !foundWords.some(f => f.word === match.word)) {
     setFoundWords(prev => [...prev, match]);
   }
   setSelection({ start: null, end: null, cells: [] });
 };

 if (grid.length === 0) return <View style={styles.container}><Text>Generating...</Text></View>;

return (
   <GestureHandlerRootView style={styles.container}>
     {/* Game Over Modal */}
     <Modal visible={isGameOver} transparent={true} animationType="fade">
       <View style={styles.modalOverlay}>
         <View style={styles.modalContent}>
           <Text style={styles.modalTitle}>🎉 Well Done! 🎉</Text>
           <Text style={styles.modalText}>You found all {WORDS_TO_FIND.length} words.</Text>
           <TouchableOpacity style={styles.button} onPress={resetGame}>
             <Text style={styles.buttonText}>Play Again</Text>
           </TouchableOpacity>
         </View>
       </View>
     </Modal>

     <Text style={styles.title}>Word Search</Text>
    
     <View style={styles.wordList}>
       {WORDS_TO_FIND.map(w => (
         <Text key={w} style={[styles.word, foundWords.some(f => f.word === w) && styles.wordFound]}>
           {w}
         </Text>
       ))}
     </View>

     <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnd}>
       <View style={styles.grid}>
         {grid.map((row, rIdx) => (
           <View key={rIdx} style={styles.row}>
             {row.map((letter, cIdx) => {
               const isSelected = selection.cells.some(c => c.row === rIdx && c.col === cIdx);
               const isFound = foundWords.some(f => f.path.some(p => p.row === rIdx && p.col === cIdx));
               return (
                 <View key={`${rIdx}-${cIdx}`} style={[styles.cell, isSelected && styles.active, isFound && styles.found]}>
                   <Text style={styles.letter}>{letter}</Text>
                 </View>
               );
             })}
           </View>
         ))}
       </View>
     </PanGestureHandler>
   </GestureHandlerRootView>
 );
}

const styles = StyleSheet.create({
 container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
 title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
 wordList: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 },
 word: { margin: 8, fontSize: 16, fontWeight: 'bold', color: '#444' },
 wordFound: { textDecorationLine: 'line-through', color: '#ccc' },
 grid: { backgroundColor: '#f9f9f9', borderWidth: 2, borderColor: '#333' },
 row: { flexDirection: 'row' },
 cell: { width: CELL_SIZE, height: CELL_SIZE, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#ddd' },
 active: { backgroundColor: 'rgba(59, 130, 246, 0.4)' },
 found: { backgroundColor: '#10B981' },
 letter: { fontSize: 18, fontWeight: 'bold' },
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
 },
 buttonText: {
   color: 'white',
   fontSize: 16,
   fontWeight: 'bold',
 },
});