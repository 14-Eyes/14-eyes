import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Text, SafeAreaView, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import { SliderBox } from "react-native-image-slider-box";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import choices from "../config/funfact";
import { number, string } from "yup/lib/locale";
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
                    <SliderBox
                        images={this.state.images}
                        sliderBoxHeight={85}
                        dotStyle={{
                            width: 0,
                            height: 0,
                        }}
                        autoplay
                        circleLoop />
             
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center',}}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  initialNumToRender={5}
                  //maxToRenderPerBatch={5}
                  data={this.state.carouselItems}
                  sliderWidth={300}
                  itemWidth={400}
                  height={150}
                  renderItem={this._renderItem}
                  autoplay
                  autoplayInterval={6500}
                  />
            </View>

                <View style={styles.buttonGood}>
                    <AppButton
                        title="Vitamins & Minerals"
                        onPress={() => this.props.navigation.navigate('Vitamins')}
                        color="buttongreen" />
                    <AppButton
                        title="Healthy Fats"
                        onPress={() => this.props.navigation.navigate('Fats')} 
                        color="buttongold"/>
                    <AppButton
                        title="For Athletes"
                        onPress={() => this.props.navigation.navigate('Energy')} 
                        color="buttonorange"/>
                </View>
                    <View style={styles.buttonBad}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('FoodDye')}
                        style={[styles.button, { backgroundColor: colors.buttonblue }]}
                    >
                        <Text style={styles.buttonText}>Food Dyes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Preservatives')}
                        style={[styles.button, { backgroundColor: colors.eltrpurple }]}
                    >
                        <Text style={styles.buttonText}>Preservatives</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Sugars')}
                        style={[styles.button, { backgroundColor: colors.buttonpink }]}
                    >
                        <Text style={styles.buttonText}>Sugars</Text>
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
  buttonContainer: {
      flex: 4,
  },
  buttonGood: {
      flexDirection: 'column',
      width: 250,
      alignSelf: 'center',
      top: 120,
  },
  buttonBad: {
      flexDirection: 'row',
      flex: 4,
      //alignSelf: 'center',
      //justifyContent: 'space-between',
      width: windowWidth / 3,
      top: 125,
  },
  text: {
	  color: colors.primary,
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

