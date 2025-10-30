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
            <Image
                    style={styles.logo}
                    source={require("../assets/bannerSponsor.png")}
                ></Image>
                <View style={styles.flexContainer}>
                    <Carousel
                        loop
                        autoPlay
                        autoPlayInterval={6500}
                        width={windowWidth * 0.9}
                        height={100}
                        data={this.state.carouselItems}
                        scrollAnimationDuration={1000}
                        renderItem={({ item, index }) => (
                            <View
                            key={index}
                            style={{
                                backgroundColor: 'floralwhite',
                                borderRadius: 20,
                                height: 100,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginHorizontal: 10,
                                padding: 10,
                            }}
                            >
                            <Text style={{ fontSize: 18, textAlign: 'center' }}>
                                {item.text}
                            </Text>
                            </View>
                        )}
                    />
                </View>
               <View style={styles.buttonGood}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('EssentialNutrients')}
                        style={[styles.button]}
                        >
                        <Image source={require('../assets/essential_nutrients.png')} style={[styles.image]} />
                        <Text style={styles.buttonText}>Essential Nutrients</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('HarmfulIngredients')}
                        style={[styles.button]}
                        >
                        <Image source={require('../assets/harmful_ingredients.png')} style={[styles.image]} />
                        <Text style={styles.buttonText}>Harmful Ingredients</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('FoodFacts')}
                        style={[styles.button]}
                        >
                        <Image source={require('../assets/food_facts.png')} style={[styles.image]} />
                        <Text style={styles.buttonText}>Other Food Facts</Text>
                    </TouchableOpacity>
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
    flexContainer: {
        //flex: 1,
        flexDirection:'row',
        justifyContent: 'center',
        top: 60,
    },
    buttonGood: {
      flexDirection: 'column',
      width: 300,
      alignSelf: 'center',
      top: 100,
    },
    text: {
        color: colors.primary,
    },
    logo: {
        alignSelf: "center",
        top: 0,
        position: "absolute",
        justifyContent: 'center',
    },
    button: {
        height: 100,
        width: "100%",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
        marginVertical: 5,
    },
    buttonText: {
        fontSize: 18,
        color: colors.white,
        textTransform: "uppercase",
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        fontWeight: "bold",
        position: 'absolute',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
        resizeMode: 'cover', // Or 'contain', 'stretch', etc.
    },
});
export default Home;

