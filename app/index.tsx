import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const App = () => {
    const [fontsLoaded] = useFonts({
        'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
        'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),
        'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
        'Roboto-Italic': require('../assets/fonts/Roboto-Italic.ttf'),
        'Roboto-BoldItalic': require('../assets/fonts/Roboto-BoldItalic.ttf'),
        'Roboto-LightItalic': require('../assets/fonts/Roboto-LightItalic.ttf'),
        'Roboto-MediumItalic': require('../assets/fonts/Roboto-MediumItalic.ttf'),
        'Roboto-ThinItalic': require('../assets/fonts/Roboto-ThinItalic.ttf'),
        'Roboto-BlackItalic': require('../assets/fonts/Roboto-BlackItalic.ttf'),
    });
    const handlePress = () => router.push('/sign-up')
    if (!fontsLoaded) {
        return <ActivityIndicator />;
    }
    return (
        <GestureHandlerRootView>
            <SafeAreaView style={styles.lock}>

                <TouchableOpacity style={styles.lock} onPress={handlePress}>
                    <Image source={require('../assets/images/icon.png')} style={styles.logo} />

                </TouchableOpacity>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}


export default App

const styles = StyleSheet.create({
    txt: {
        color: 'white'
    },
    lock: {
        backgroundColor: 'white',
        color: 'black',
        height: '100%'

    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        margin: 'auto'
    }


})