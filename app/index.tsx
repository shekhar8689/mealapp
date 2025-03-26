import { View, Text, StyleSheet, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';


const index = () => {

    const ring1padding = useSharedValue(0)
    const ring2padding = useSharedValue(0)

    const router = useRouter(); 

    useEffect(() => {
        const ring1Timeout = setTimeout(() => {
            ring1padding.value = withSpring(hp(5));
        }, 100);

        const ring2Timeout = setTimeout(() => {
            ring2padding.value = withSpring(hp(5.5));
        }, 300);

        const navigationTimeout = setTimeout(() => {
            router.push('/home'); 
        }, 2500);

        // Cleanup function to prevent memory leaks
        return () => {
            clearTimeout(ring1Timeout);
            clearTimeout(ring2Timeout);
            clearTimeout(navigationTimeout);
        };
    }, []);

    // Animated Styles
    const firstRingAnimatedStyle = useAnimatedStyle(() => ({
        padding: ring1padding.value,
    }));

    const secondRingAnimatedStyle = useAnimatedStyle(() => ({
        padding: ring2padding.value,
    }));

    return (
        <View style={styles.welocmeMainContainer} >
            <StatusBar backgroundColor="#f59e0b" barStyle="light-content" />

            {/* {logo image with rings} */}
            <Animated.View style={[styles.firstRing,firstRingAnimatedStyle ]} >
                <Animated.View style={[styles.secondRing,secondRingAnimatedStyle]} >
                    <Image source={{
                        uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", // Food dish image
                    }} style={styles.Imagestyle} />
                </Animated.View>
            </Animated.View>

            {/* {title and punchline} */}
            <View style={styles.TitleContainer}>
                <Text style={styles.TitleText}>Foody</Text>
                <Text style={styles.TitleTextContaint}>Food is always right</Text>
            </View>
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    welocmeMainContainer: {
        flex: 1, // flex-1
        justifyContent: "center", // justify-center
        alignItems: "center", // items-center
        backgroundColor: "#f59e0b",
    },
    firstRing: {
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 200,
        
    },
    secondRing: {
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 200,
    },
    Imagestyle: {
        height: hp(25),
        width: hp(25),
        borderRadius: 200
    },

    TitleContainer: {
        paddingTop: 10,
        alignItems: "center",
    },
    TitleText: {
        fontSize: hp(7),
        color: "white"
    },
    TitleTextContaint: {
        fontSize: hp(2),
        color: "white"
    }


})


