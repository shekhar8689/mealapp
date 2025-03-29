import { View, Text, StyleSheet, StatusBar, FlatList, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect, useState } from 'react'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '@/src/components/categories';
import axios from 'axios'
import Recipes from '@/src/components/recipes';

const home = () => {

    const [activeCategory, setActiveCategory] = useState('Beef')
    const [categories, setCategories] = useState([])
    const [meals, setMeals] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredMeals, setFilteredMeals] = useState([])
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
        if (searchQuery.length >= 2) {
            searchRecipes(searchQuery);
        } else {
            setFilteredMeals(meals);
        }
    }, [searchQuery, meals]);

    const handleChangeCategory = category => {
        getRecipes(category);
        setActiveCategory(category);
        setMeals([]);
        setSearchQuery('');
    }

    const getCategories = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
            if (response && response.data) {
                setCategories(response.data.categories);
                getRecipes(response.data.categories[0].strCategory);
            }
        } catch (error) {
            console.log('Error fetching categories:', error);
        }
    }

    const getRecipes = async (category = 'Beef') => {
        setLoading(true);
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            if (response && response.data) {
                setMeals(response.data.meals);
                setFilteredMeals(response.data.meals);
            }
        } catch (error) {
            console.log('Error fetching recipes:', error);
        }
        setLoading(false);
    }

    const searchRecipes = async (query) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${query}`);
            if (response && response.data) {
                setFilteredMeals(response.data.meals || []);
            }
        } catch (error) {
            console.log('Error searching recipes:', error);
        }
        setLoading(false);
    }

    return (
        <View style={styles.MainHomeContainer}>
            <StatusBar backgroundColor="#ffff" barStyle={'dark-content'} />
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >

                <View style={styles.avatarContainer}>
                    <Image style={styles.avatarIcon} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" }} />
                    <BellIcon size={hp(4)} color="grey" />
                </View>

                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingsText}>Hello, Shekhar!</Text>
                    <Text style={styles.greetingsTextPara}>Make your own food</Text>
                    <Text style={styles.greetingsTextPara}>Stay at <Text style={styles.hometext}>home</Text></Text>
                </View>

                <View style={styles.searchContainer}>
                    <TextInput 
                        placeholder='Search any recipe'
                        placeholderTextColor={'grey'}
                        style={styles.inputContainer}
                        value={searchQuery}
                        onChangeText={setSearchQuery} 
                    />
                    <View style={styles.searchIcon}>
                        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={4} color="grey" />
                    </View>
                </View>

                <View style={styles.categoriesContainer}>
                    {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
                </View>

                <View>
                    {loading ? (
                        <ActivityIndicator size="large" color="#f59e0b" />
                    ) : (
                        filteredMeals.length > 0 ? (
                            <Recipes meals={filteredMeals} categories={categories} />
                        ) : (
                            <Text style={styles.noDataText}>No recipes found</Text>
                        )
                    )}
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
        marginHorizontal: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 2,
    },
    avatarIcon: {
        height: hp(5),
        width: hp(5.5)
    },
    greetingContainer: {
        marginHorizontal: 16,
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
        marginTop: 25,
        marginBottom: 25
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
        borderRadius: 100,
        padding: 10,
    },
    categoriesContainer: {
        marginBottom: 10
    },
    noDataText: {
        textAlign: "center",
        fontSize: hp(2),
        color: "grey",
        marginTop: 20
    }
})
