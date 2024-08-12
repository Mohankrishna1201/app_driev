import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import { NavigationContainer } from '@react-navigation/native'
import { GlobalProvider } from 'api/GlobalContext'

const HomeLayout = () => {
    return (
        <GlobalProvider>
            <Stack>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(screens)" options={{ headerShown: false }} />
                <Stack.Screen name="(detail-screen)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </GlobalProvider>

    )
}

export default HomeLayout

const styles = StyleSheet.create({})