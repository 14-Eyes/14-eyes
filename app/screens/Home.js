import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Text, SafeAreaView, TouchableOpacity, Image, Platform } from "react-native";
// import Carousel from "react-native-snap-carousel";
import Carousel from "react-native-reanimated-carousel";
// import { SliderBox } from "react-native-image-slider-box";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import choices from "../config/funfact";
const windowWidth = Dimensions.get('window').width;

{/* Change the bannerSponsor.png to change the image ad for the banner (size needs to be 1200px by 250px) */}
const funfact = choices.funfact; // used to map fun fact

var random_index = 0;

for(var i=0; i<18; i++)
{
    random_index = Math.floor(Math.random() * funfact.length);
    //console.log({random_index});
    funfact.splice(random_index, 1);
}

//console.log("funfact size: %d", funfact.length);

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                require("../assets/transparant.png"),
                require("../assets/adamBanner.png"),
                require("../assets/bannerSponsor.png"),
            ],
            activeIndex: 0,
            carouselItems: funfact.map((fact) => {
                return {text: <AppText key={fact.id}>{fact.label}</AppText>
            }})
        };
    }

   
    _renderItem({item,index}){
        return (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 20,
              height: 200,
              alignItems: 'center',
              padding: 2,
              marginLeft: 25,
              marginRight: 25,
               }}>
            <Text style={{fontSize: 25}}>{item.title}</Text>
            <Text>{item.text}</Text>
          </View>

        )
    }

    render() {
        return (

            <><Screen style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require("../assets/bannerSponsor.png")}
                    ></Image>
                </View>

                <View style={styles.buttonGood}>
                    <AppButton
                        title="Essential Nutrients"
                        onPress={() => this.props.navigation.navigate('Vitamins')}
                        color="buttongreen" />
                    <AppButton
                        title="Harmful Ingredients"
                        onPress={() => this.props.navigation.navigate('Fats')} 
                        color="buttongold"/>
                    <AppButton
                        title="Food Facts"
                        onPress={() => this.props.navigation.navigate('Energy')} 
                        color="buttonorange"/>
                </View>
                </Screen></>
        );
    }
}

/* for flex component in container
1 -> (only top half)
2 & 3 ->(all but last button)
4 -> (all 6)
*/

const styles = StyleSheet.create({
    container: {
        flex: 4,
        backgroundColor: colors.light,
        bottom: 10,
    },
    buttonContainer: {
      flex: 4,
    },
    buttonGood: {
      flexDirection: 'column',
      width: 250,
      alignSelf: 'center',
      top: 120,
    },
    text: {
        color: colors.primary,
    },
    logo: {
        alignSelf: "center",
    },
    logoContainer: {
        top: 40,
        position: "absolute",
        alignItems: "center",
        justifyContent: 'center',
    },
    button: {
        height: 50,
        width: "100%",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 11,
        color: colors.white,
        textTransform: "uppercase",
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        fontWeight: "bold",
    },
});
export default Home;

