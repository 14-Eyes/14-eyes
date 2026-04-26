import { View, Dimensions, Button, StyleSheet, Modal, TouchableOpacity, Text } from "react-native";
import { useFrameCallback, useSharedValue, useDerivedValue, useAnimatedSensor, SensorType, runOnJS } from "react-native-reanimated";
import { Canvas, Circle, Rect, Image, useImage } from "@shopify/react-native-skia";
import { useState } from "react";
import { PLATFORM_HEIGHT, PLATFORM_WIDTH, Platform } from "../../config/platform";
import { Score } from "../../config/score";
import routes from "../../navigation/routes";

// possible textures?
// https://craftpix.net/product/jump-game-kit/

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const BALL_RADIUS = 20;
const BALL_COLOR = "#ADD8E6";
const BALL_VELOCITY = 0;
const DEFAULT_BOUNCE_VELOCITY = -0.7; // Adjust this value based on desired bounce height
const BALL_GRAVITY = 1 / 1000;

const defaultPlatforms = new Array(15).fill(0).map((_, i) => {
 return {
   x: Math.random() * SCREEN_WIDTH,
   y: Math.random() * SCREEN_HEIGHT,
 };
});

export default function MuMuGameScreen({navigation}) {
 const ballImage = useImage(require("../../assets/gameStuff/MuMu.png"));
 const [gameOver, setGameOver] = useState(false);
 const [gameStarted, startGame] = useState(true);

 const x = useSharedValue(SCREEN_WIDTH / 2);
 const y = useSharedValue(SCREEN_HEIGHT / 2);
 const imageX = useDerivedValue(() => x.value - BALL_RADIUS);
 const imageY = useDerivedValue(() => y.value - BALL_RADIUS);
 const velocityY = useSharedValue(BALL_VELOCITY);
 const [sensorInt, setSensorInt] = useState(2000);
 const deviceRollSensor = useAnimatedSensor(SensorType.ROTATION);
 const deviceGyroSensor = useAnimatedSensor(SensorType.GYROSCOPE);
 const prevMaxY = useSharedValue(SCREEN_HEIGHT / 2);
 const score = useSharedValue(0);

 const handleGameOver = () => {
    setGameOver(true);
  };

 const platforms = defaultPlatforms.map((platform) =>
   useSharedValue(platform),
 );

 useFrameCallback((frameInfo) => {
   const perf = performance.now();
   const { timeSincePreviousFrame: dt } = frameInfo;
   if (dt == null) {
     return;
   }

   if(gameOver || gameStarted) {
    return;
   }

   velocityY.value += BALL_GRAVITY * dt;
   if (!(velocityY.value < 0 && y.value < SCREEN_HEIGHT / 2)) {
     y.value += velocityY.value * dt;
   }

   // if ball is moving up and is in the upper half of the screen
   if (velocityY.value < 0 && y.value < SCREEN_HEIGHT / 2) {
     if (prevMaxY.value - y.value > 100) {
       score.value += (SCREEN_HEIGHT - prevMaxY.value) / 100;
     }
   }

   // Bounce off the floor
   if (y.value > SCREEN_HEIGHT - BALL_RADIUS) {
    if (y.value > SCREEN_HEIGHT - BALL_RADIUS) {
      if (!gameOver) {
        runOnJS(handleGameOver)(); // This prevents the crash
      }
    }

     //y.value = SCREEN_HEIGHT - BALL_RADIUS;
     //velocityY.value = DEFAULT_BOUNCE_VELOCITY;
   }

   platforms.forEach((platform) => {
     // Bounce off the platform
     if (
       y.value + BALL_RADIUS >= platform.value.y &&
       y.value - BALL_RADIUS <= platform.value.y + PLATFORM_HEIGHT
     ) {
       if (
         x.value + BALL_RADIUS > platform.value.x &&
         x.value - BALL_RADIUS < platform.value.x + PLATFORM_WIDTH
       ) {
         if (velocityY.value > 0) {
           // Ensures ball is moving downwards
           y.value = platform.value.y - BALL_RADIUS;
           // Bounce off the platform and reset the velocity
           velocityY.value = DEFAULT_BOUNCE_VELOCITY;
         }
       }
     }

     // Move the platform down if the ball is moving up and is in the upper half of the screen
     if (velocityY.value < 0 && y.value < SCREEN_HEIGHT / 2) {
       platform.value = {
         y: platform.value.y + Math.abs(velocityY.value * dt),
         x: platform.value.x,
       };
     }

     // Teleport the platform to the top if it reaches the bottom
     if (platform.value.y > SCREEN_HEIGHT) {
       platform.value = {
         y: -PLATFORM_HEIGHT,
         x: Math.random() * SCREEN_WIDTH,
       };
     }
   });

   const deviceRoll = deviceRollSensor.sensor.value.roll;
   const deviceGyro = deviceGyroSensor.sensor.value.y;

   x.value += deviceGyro;
   x.value += deviceRoll * 10;

   // teleport the ball to the other side of the screen
   if (x.value < 0) {
     x.value = SCREEN_WIDTH;
   } else if (x.value > SCREEN_WIDTH) {
     x.value = 0;
   }

   if (prevMaxY.value < y.value) {
     prevMaxY.value = y.value;
   }
 });

 const startLevel = () => {
   startGame(false);
   console.log(gameStarted)
 };

 const resetGame = () => {
    y.value = SCREEN_HEIGHT / 2;
    x.value = SCREEN_WIDTH / 2;
    velocityY.value = 0;
   setGameOver(false);
 };

 const goHome = () => {
  startGame(true);
  setGameOver(false);
  navigation.navigate(routes.CHILD_GAME_HOME);
 };

 return (
  <View style={styles.container}>
    <Canvas style={{ flex: 1 }}>
     <Score score={score} />
     {platforms.map((platform, i) => (
       <Platform platformDefinition={platform} key={i} />
     ))}
     <Image
        image={ballImage}
        x={imageX} // Offset by radius to center the image on the coordinate
        y={imageY}
        width={BALL_RADIUS * 2}
        height={BALL_RADIUS * 2}
      />
   </Canvas>
        <Modal visible={gameStarted} transparent={true} animationType="fade">
       <View style={styles.modalOverlay}>
         <View style={styles.modalContent}>
           <Text style={styles.modalTitle}>Search for Sunrays</Text>
           <Text style={styles.modalText}>Tilt the screen left and right to move MuMu! Get as far as you can!</Text>
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
           <Text style={styles.modalText}>MuMu fell down the well!</Text>
           <TouchableOpacity style={styles.button} onPress={resetGame}>
             <Text style={styles.buttonText}>Play Again</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={goHome}>
             <Text style={styles.buttonText}>Home</Text>
           </TouchableOpacity>
         </View>
       </View>
     </Modal>
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: 'rgba(0, 0, 0, 0.6)',
 },
  background: {
    flex: 1,
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
});