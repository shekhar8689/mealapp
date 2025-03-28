import { View, Text, StyleSheet, StatusBar, FlatList, Image, ScrollView, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect, useState } from 'react'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '@/src/components/categories';
import axios from 'axios'
import Recipes from '@/src/components/recipes';

const home = () => {

    const[activeCategory, setActiveCategory] = useState('Beef')
    const [categories,setCategores] = useState([])
    const [meals, setMeals] = useState([])

    useEffect(()=>{
        getCategories();
        getRecipes();
    },[])

    const handleChangeCategory = category =>{
        getRecipes(category);
        setActiveCategory(category)
        setMeals([])
    }

    const getCategories = async ()=>{
        try {
        
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
            // console.log('got categories:', response.data);
            
            if (response && response.data) {
                setCategores(response.data.categories)
            }
        } catch (error) {
            console.log('error');
        }
    }

    const getRecipes = async (category='Beef')=>{
        try {
        
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            // console.log('got recipes:', response.data);
            
            if (response && response.data) {
                setMeals(response.data.meals);
            }
        } catch (error) {
            console.log('error');
            
        }
    }


    return (
        <View style={styles.MainHomeContainer}>
            <StatusBar backgroundColor="#ffff" barStyle={'dark-content'} />
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >

                {/* {avatar and bell icon} */}
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatarIcon} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" }} />
                    <BellIcon size={hp(4)} color="grey" />
                </View>

                // greetings and punchline
                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingsText}>Hello,Shekhar!</Text>
                    <View>
                        <Text style={styles.greetingsTextPara}>Make your own food</Text>
                    </View>
                    <View>
                        <Text style={styles.greetingsTextPara}>stay at <Text style={styles.hometext}>home</Text></Text>
                    </View>
                </View>

                {/* serach bar */}
                <View style={styles.searchContainer}>
                    <TextInput placeholder='search any recipe'
                        placeholderTextColor={'grey'}
                        style={styles.inputContainer} />
                    <View style={styles.searchIcon}>
                        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={4} color="grey" />
                    </View>
                </View>

                {/* {categories} */}
                <View style={styles.categoriesContainer}>
                    {categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
                </View>

                {/* {recipes} */}
                <View>
                    <Recipes meals={meals} categories={categories} />
                </View>
            </ScrollView>
        </View>
    )
}

export default home

const styles = StyleSheet.create({
    MainHomeContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    scrollContainer: {
        padding: 10,
        gap: 24,
        paddingTop: 20,
    },
    avatarContainer: {
        marginHorizontal: 8, // Equivalent to mx-4
        flexDirection: "row", // Equivalent to flex-row
        justifyContent: "space-between", // Equivalent to justify-between
        alignItems: "center", // Equivalent to items-center
        marginTop: 2,
    },
    avatarIcon: {
        height: hp(5),
        width: hp(5.5)
    },
    demo: {
        color: "black"
    },
    greetingContainer: {
        marginHorizontal: 16, // mx-4
        gap: 10,
        marginBottom: 8,
        paddingTop: 10,

    },
    greetingsText: {
        fontSize: hp(1.8),
        color: "#525252",
        fontWeight: "600"
    },
    greetingsTextPara: {
        fontSize: hp(3.8),
        color: "#525252",
        fontWeight: "600"
    },
    hometext: {
        color: '#f59e0b',
    },
    searchContainer: {
        marginHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        padding: 6,
        marginTop:25,
        marginBottom:25
    },
    inputContainer: {
        fontSize: hp(1.8),
        flex: 1,
        marginBottom: 1,
        paddingLeft: 3,
        letterSpacing: 1,
    },
    searchIcon: {
        backgroundColor: 'white',
        borderRadius: "100%",
        padding: 10,
    },
    categoriesContainer:{
        marginBottom:10
    }
})
