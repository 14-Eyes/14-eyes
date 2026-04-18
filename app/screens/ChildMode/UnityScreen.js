import React, { useRef, useEffect } from 'react';

import UnityView from '@azesmway/react-native-unity';
import { View } from 'react-native';
import route from "../../navigation/routes";

const UnityScreen = ({ navigation, route }) => {
 const unityRef = useRef<UnityView>(null);
 const {messageToUnity} = route.params;

 // useEffect(() => {
   // if (messageToUnity) {
     // unityRef.current?.postMessage('', '', messageToUnity);
   // }
 // }, [messageToUnity]);


 const handleUnityMessage = (message) => {
  if(message === "Home") {
    navigation.navigate(routes.CHILD_HOME);
  }

  if(message === "Recipe") {
    navigation.navigate(routes.CHILD_RECIPES);
  }
 };
 //End


 return (
   <UnityView
     ref={unityRef}
     style={{ 
        flex: 1, 
        height: '99.5%', // Force native layout engine to recalculate
        width: '100%' 
     }}
     onUnityMessage={e => handleUnityMessage(e.nativeEvent.message)} // and this line
   />
 );
};

export default UnityScreen;