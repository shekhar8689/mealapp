import { View, Text, ScrollView, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import axios from 'axios';
import Loading from '@/src/components/loading';


const RecipeDetails = () => {
  const params = useLocalSearchParams(); // Get the passed recipe data
  const router = useRouter();
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)

  const [isFavourite, setIsFavourite] = useState(false)

  useEffect(() => {
    getMealData(params.idMeal)
  }, [])

  const getMealData = async (id) => {
    try {

      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      console.log('got meal data:', response.data);

      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false)
      }
    } catch (error) {
      console.log('error', err.message);

    }
  }

  return (
    <ScrollView
      style={styles.recipeDetailsContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar barStyle={"light-content"} />
      {/* recipe image */}
      <View style={styles.recipeContainer}>
        <Image style={styles.imageContainer} source={{ uri: params.strMealThumb }} />
      </View>

      {/* backbutton */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonBackground}>
          <ChevronLeftIcon size={hp(4.5)} strokeWidth={3.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} style={styles.heartButtonBackground}>
          <HeartIcon size={hp(4.5)} strokeWidth={3.5} color={isFavourite ? "red" : "grey"} />
        </TouchableOpacity>
      </View>

      {/* meal description */}
      {
        loading ? (
          <Loading size="large" style={styles.lodingComponent} />
        ) : (
          <View style={styles.nameAndAreaData}>
            {/* name and area */}
            <View style={styles.mealTitle}>
              <Text style={styles.mealTitleText}>
                {meal?.strMeal}
              </Text>
              <Text style={styles.mealTitleSubText}>
                {meal?.strArea}
              </Text>
            </View>

            {/* misc */}
            <View style={styles.miscContainer}>
              <View style={styles.miscSecondContainer}>
                <View style={styles.miscLastContainer}>
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
              </View>
            </View>

          </View>
        )
      }
    </ScrollView>
  )
}
export default RecipeDetails;

const styles = StyleSheet.create({
  recipeDetailsContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  recipeContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  imageContainer: {
    width: wp(98),
    height: hp(50),
    borderRadius: 53,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginTop: 4,
  },
  backButtonContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 56,
  },
  backButtonBackground: {
    padding: 4,
    borderRadius: "100%",
    marginLeft: 15,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  heartButtonBackground: {
    padding: 4,
    borderRadius: "100%",
    marginRight: 15,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  lodingComponent: {
    marginTop: 16
  },
  nameAndAreaData: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 32,
    marginBottom: 16,
  },
  mealTitle: {
    marginBottom: 8,

  },
  mealTitleText: {
    fontSize: hp(3),
    fontWeight: "bold",
    flex: 1,
    color: "#404040",
  },
  mealTitleSubText: {
    fontSize: hp(2),
    fontWeight: "600",
    flex: 1,
    color: "#737373",
  },
  miscContainer:{
    flexDirection:"row",
    justifyContent: "space-around",
  },
  miscSecondContainer:{
    flex: 1,
    borderRadius: 9999,
    backgroundColor: "#fcd34d",
    padding: 8,
  },
  miscLastContainer:{
    height:hp(6.5),
    width:hp(6.5),
    borderRadius: 9999,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center"
  }
})
