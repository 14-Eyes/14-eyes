import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";

import Screen from "../../components/Screen";
import ChildButtonFood from "../../components/ChildButtonFood";
import ChildButtonBottom from "../../components/ChildButtonBottom";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import check from "../../utility/check";

function ChildFood({ navigation, route }) {
  const food = route.params;
  const status = food.status;
  const [allergic, setAllergic] = useState(null);
  let traces = false;

  if (food.status) {
    traces = food.product.traces;

    useEffect(() => {
      checkAllergies();
    }, []);
  }

  const checkAllergies = async () => {
    const allergic = await check.checkAllergens(
      food.product.ingredients_text,
      food.product.traces
    );
    setAllergic(allergic);
  };

  if(status){
    return (
      <ScrollView style={styles.screen}>
        <Screen style = {styles.container}>
          <View style = {styles.spacing}>
            <Image
              source={require('../../assets/speechbubble.png')}
              style={styles.speechBubble}
            />
          </View>

          <View style = {styles.spacing2}>
            <AppText style={styles.text}>This looks like </AppText> 
            <AppText style={styles.fooditem}>{food.product.product_name}.</AppText> 

            {food.product.nutrition_grade_fr ? (
            <AppText style={styles.text}> Adam Apple gives a grade of: </AppText> ):
            <AppText style={styles.text}> Adam Apple does not have enough information to give a grade. </AppText>}
          </View>

          {food.product.nutrition_grade_fr ? (
          <View style = {styles.spacing}>
            {food.product.nutrition_grade_fr.includes('a') &&
              <Image
              source={require('../../assets/grade-a.png')}
              style={styles.grade}
              />
            }  
            
            {food.product.nutrition_grade_fr.includes('b') &&
              <Image
              source={require('../../assets/grade-b.png')}
              style={styles.grade}
              />
            }

            {food.product.nutrition_grade_fr.includes('c') &&
              <Image
              source={require('../../assets/grade-c.png')}
              style={styles.grade}
              />
            }

            {food.product.nutrition_grade_fr.includes('d') &&
              <Image
              source={require('../../assets/grade-d.png')}
              style={styles.grade}
              />
            }
              
            {food.product.nutrition_grade_fr.includes('e') &&
              <Image
              source={require('../../assets/grade-e.png')}
              style={styles.grade}
              />
            }
          </View>): null}

          <View style = {styles.spacing2}>
            <View style = {styles.spacing}>
              <View style = {styles.otherButtons}>
                <ChildButtonFood
                  title="More Details"
                  onPress={() => navigation.navigate(routes.CHILD_ABOUTFOOD, food)}
                />   
                <ChildButtonFood
                  title="Scan Again"
                  onPress={() => navigation.navigate(routes.CHILD_SCAN)} />
              </View> 
            </View>
          </View>
          {allergic ? (
            <>
            <View style = {styles.spacing}>
              <AppText style={styles.allergy}>
                Warning! You are allergic to: {allergic}
              </AppText>
            </View>
            </>
          ) : null}
        </Screen>
        <ChildButtonBottom
          title="HOME"
          onPress={() => navigation.navigate(routes.CHILD_HOME)} />  
      </ScrollView>
      );
  }
  
  else{
    return(      
      <ScrollView style={styles.screen}>
        <Screen style = {styles.container}>
          <View style = {styles.spacing2}>
            <View style = {styles.spacing}>
              <Image
              source={require('../../assets/speechbubble.png')}
              style={styles.speechBubble}
              />
            </View>
          </View>

          <View style = {styles.spacing2}>
            <AppText style={styles.text}>
              Sorry, Adam can't find this item!
            </AppText>
          </View>

          <View style = {styles.spacing2}>
            <View style = {styles.spacing}>
              <ChildButtonFood
                title="Scan Another Item"
                onPress={() => navigation.navigate(routes.CHILD_SCAN)} />
            </View>    
          </View>
        </Screen>
        <ChildButtonBottom
            title="HOME"
            onPress={() => navigation.navigate(routes.CHILD_HOME)} />   
      </ScrollView>

    );
  }
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.eltrlightblue,
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
},

  speechBubble: {
    marginBottom: 10,
    width: 360,
    height: 650,
    top: 300
  },

  grade: {
    width: 128,
    height: 132,
    bottom: 250,
  },

  fooditem: {
    color: colors.eltrred,
    fontSize: 24,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
    width: 250,
    bottom: 250
  },

  text: {
    color: colors.black,
    fontSize: 24,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
    width: 250,
    bottom: 250
  },

  spacing: {
    bottom: 75,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  spacing2: {
    bottom: 120,
    marginHorizontal: 5,
  },
  
  otherButtons: {   
    flexDirection:"row",
    width:"48%",
    bottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  allergy: {
    backgroundColor:colors.eltrred,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    bottom: 0,
  },
});

export default ChildFood;