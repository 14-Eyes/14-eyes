import {
  SharedValue,
  useDerivedValue,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";
import { Canvas, Circle, Rect, Image, useImage } from "@shopify/react-native-skia";

export const PLATFORM_HEIGHT = 15;
export const PLATFORM_WIDTH = 50;

export const Platform = ({ platformDefinition }) => {
  const y = useDerivedValue(() => platformDefinition.value.y);
  const x = useDerivedValue(() => platformDefinition.value.x);
  const platformImage = useImage(require("../assets/gameStuff/Platform_Mumu.png"));

  return (
    <Image
      image={platformImage} 
      x={x} 
      y={y} 
      width={PLATFORM_WIDTH} 
      height={PLATFORM_HEIGHT} 
    />
  );
};