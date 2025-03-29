import { View, Text, ScrollView, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import { HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid';
import axios from 'axios';
import Loading from '@/src/components/loading';
import YoutubeIframe from 'react-native-youtube-iframe'
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import localData from '@/assets/data/data.json'; 

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
      if (response?.data?.meals) {
        const apiMeal = response.data.meals[0];
        // Find matching local data
        const localMeal = localData.find(item => item.id === id) || {};
        // Merge API and local data
        setMeal({ ...apiMeal, ...localMeal });
      }
      setLoading(false);
    } catch (error) {
      console.log('error:', error.message);
      setLoading(false);
    }
  }

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++)
      if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim() !== "") {
        indexes.push(i);
      }

    return indexes
  }

  const getYoutubeVideoId = url=>{
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1]
    }
    return null;
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
        <Image style={styles.imageContainer} source={{ uri: params.strMealThumb }}
        />
      </View>

      {/* sharedTransitionTag={params.strMeal} */}

      {/* backbutton */}
      <Animated.View entering={FadeIn.delay(200).duration(1000)} style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonBackground}>
          <ChevronLeftIcon size={hp(4.5)} strokeWidth={3.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} style={styles.heartButtonBackground}>
          <HeartIcon size={hp(4.5)} strokeWidth={3.5} color={isFavourite ? "red" : "grey"} />
        </TouchableOpacity>
      </Animated.View>

      {/* meal description */}
      {
        loading ? (
          <Loading size="large" style={styles.lodingComponent} />
        ) : (
          <View style={styles.nameAndAreaData}>
            {/* name and area */}
            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} style={styles.mealTitle}>
              <Text style={styles.mealTitleText}>
                {meal?.strMeal}
              </Text>
              <Text style={styles.mealTitleSubText}>
                {meal?.strArea}
              </Text>
            </Animated.View>

            {/* misc */}
            <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} style={styles.miscContainer}>

              {/* time */}
              <View style={styles.miscSecondContainer}>
                <View style={styles.miscLastContainer}>
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View style={styles.timeTextContainer}>
                <Text style={styles.timeTextNumber}>{meal?.time || 35}</Text>
                <Text style={styles.timeTextletter}>mins</Text>
                </View>
              </View>

              {/* users */}
              <View style={styles.miscSecondContainer}>
                <View style={styles.miscLastContainer}>
                  <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View style={styles.timeTextContainer}>
                <Text style={styles.timeTextNumber}>{meal?.servings || 3}</Text>
                <Text style={styles.timeTextletter}>Servings</Text>
                </View>
              </View>

              {/* fire */}
              <View style={styles.miscSecondContainer}>
                <View style={styles.miscLastContainer}>
                  <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View style={styles.timeTextContainer}>
                <Text style={styles.timeTextNumber}>{meal?.calories || 200}</Text>
                <Text style={styles.timeTextletter}>cal</Text>
                </View>
              </View>

              {/* stack */}
              <View style={styles.miscSecondContainer}>
                <View style={styles.miscLastContainer}>
                  <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View style={styles.timeTextContainer}>
                  <Text style={styles.timeTextNumber}>

                  </Text >
                  <Text style={styles.timeTextletter}>{meal?.level || "Easy"}</Text>
                </View>
              </View>
            </Animated.View>

            {/* ingredients */}
            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} style={styles.mainIngredientContainer}>
              <Text style={styles.IngredientMainText}>
                Ingredients
              </Text>
              <View>
                {
                  ingredientsIndexes(meal).map(i => {
                    return (
                      <View key={i} style={styles.indexesMainContainer} >
                        <View style={styles.indexesContainer} />
                        <View style={styles.ingredientPoints}>
                          <Text style={styles.ingredientPointsOne}>{meal['strMeasure' + i]}</Text>
                          <Text style={styles.ingredientPointsTwo}>{meal['strIngredient' + i]}</Text>
                        </View>

                      </View>
                    )
                  })
                }
              </View>
            </Animated.View>

            {/* Instruction */}
            <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} style={styles.mainIngredientContainer}>
              <Text style={styles.IngredientMainText}>
                Instructions
              </Text>
              <Text style={styles.instructionsPara}>
                {
                  meal?.strInstructions
                }
              </Text>
            </Animated.View>

            {/* recipe video */}
            {
              meal.strYoutube && (
                <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)}>
                  <Text style={styles.IngredientMainText}>
                    Recipe Video
                  </Text>
                  <View>
                    <YoutubeIframe 
                    videoId={getYoutubeVideoId(meal.strYoutube)}
                    height={hp(30)} />
                  </View>
                </Animated.View>
              )
            }
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
  miscContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  miscSecondContainer: {
    borderRadius: 9999,
    backgroundColor: "#fcd34d",
    padding: 8,
  },
  miscLastContainer: {
    height: hp(6.5),
    width: hp(6.5),
    borderRadius: 9999,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  timeTextContainer: {
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 4
  },
  timeTextNumber: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#404040",

  },
  timeTextletter: {
    fontSize: hp(1.3),
    fontWeight: "bold",
    color: "#404040",

  },
  mainIngredientContainer: {
    marginBottom: 16,
  },
  IngredientMainText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#404040",
  },
  IngredientParaText: {
    marginLeft: 3,
    marginBottom: 8,
  },
  indexesMainContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  indexesContainer: {
    height: hp(1.5),
    width: hp(1.5),
    backgroundColor: "#fcd34d",
    borderRadius: 9999,
  },
  ingredientPoints: {
    flexDirection: "row",
    gap: 4,
  },
  ingredientPointsOne: {
    fontWeight: "900",
    color: "#525252",
    fontSize: hp(1.7)
  },
  ingredientPointsTwo: {
    fontWeight: "500",
    color: "#525252",
    fontSize: hp(1.7)
  },
  instructionsPara: {
    fontSize: hp(1.6),
    color: "#404040",
  }
})
