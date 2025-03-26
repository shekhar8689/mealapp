import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { categoryData } from '../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';


const categories = ({categories,activeCategory, handleChangeCategory}) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()} >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        style={styles.scrollViewMainContainer}
      >
        {
          categories.map((cat, index) => {
            let isActive = cat.strCategory == activeCategory;
            let activeButtonClass = isActive? styles.activeCategory : styles.inactiveCategory;
            return (
              <TouchableOpacity key={index}
              onPress={()=>handleChangeCategory(cat.strCategory)}
               style={[styles.categoryDataContainer]}>
                <View style={[styles.categoryDataImageContainer,,activeButtonClass]}>
                  <Image source={{ uri: cat.strCategoryThumb }} style={styles.categoryImage} />
                </View>
                <Text style={styles.categoryDataTextContainer} >
                  {cat.strCategory}
                </Text>
              </TouchableOpacity>
            )
          })
        }

      </ScrollView>
    </Animated.View>
  )
}

export default categories

const styles = StyleSheet.create({
  scrollViewMainContainer: {
    marginRight: 16
  },
  categoryDataContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
  },
  categoryDataImageContainer: {
    borderRadius: hp(5),
    padding: 6,
    columnGap: 5,
    backgroundColor: "red"

  },
  categoryImage: {
    height: hp(6),
    width: hp(6),
    borderRadius: hp(3),

  },
  categoryDataTextContainer:{
    fontSize:hp(1.6),
    color: "#525252",
    fontWeight: "600",
  },
  activeCategory: {
    backgroundColor: "#fbbf24", // Equivalent to Tailwind 'bg-amber-400'
    borderRadius: hp(5),
    padding: 8,
  },
  inactiveCategory: {
    backgroundColor: "rgba(0,0,0,0.1)", // Equivalent to Tailwind 'bg-black/10'
    borderRadius: hp(5),
    padding: 8,
  },

})
