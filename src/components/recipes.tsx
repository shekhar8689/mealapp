import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from '../constants';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { useRouter } from 'expo-router';

const recipes = ({ categories, meals }) => {
    
    const router = useRouter();

    return (
        <View style={styles.recipesMainContainer}>
            <Text style={styles.recipesText}>Recipes</Text>
            <View>
                {
                    categories.length == 0 || meals.length==0 ? (
                        <Loading size="large" style={styles.loadingContainer} />
                    ) : (
                        <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <RecipeCard item={item} index={i} router={router} />}
                            // refreshing={isLoadingNext}
                            // onRefresh={() => refetch({ first: ITEM_CNT })}
                            onEndReachedThreshold={0.1}
                        // onEndReached={() => loadNext(ITEM_CNT)}
                        />
                    )
                }

            </View>
        </View>
    )
}

export default recipes

const RecipeCard = ({ item, index, router }) => {
    let isEven = index % 2 == 0;
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <Pressable
                style={[styles.pressableContaier, { paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }]}
                onPress={() => router.push({ pathname: '/recipeDetails', params: item })}
            >
                <Image source={{ uri: item.strMealThumb }}
                 style={[styles.imageContainer, { height: index % 3 === 0 ? hp(25) : hp(35) }]}  />
                <Text style={styles.nameContaienr}>
                    {
                        item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal
                    }
                </Text>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    recipesMainContainer: {
        marginHorizontal: 16,
        gap: 12,
    },
    recipesText: {
        fontSize: hp(3),
        fontWeight: '600',
        color: '#525252',
    },
    pressableContaier: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 16,
        width: '100%',
    },
    imageContainer: {
        width: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 35,
    },
    nameContaienr: {
        fontSize: hp(1.5),
        fontWeight: '600',
        marginLeft: 8,
        color: '#525252',
    },
    loadingContainer:{
        marginTop:40
    }
})
