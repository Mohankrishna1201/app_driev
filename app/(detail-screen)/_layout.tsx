import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
const DetailLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name='ongoing-tkt' options={{ headerShown: false }} />
                <Stack.Screen name='confirmation' options={{ headerShown: false }} />
            </Stack>

        </>
    )
}

export default DetailLayout

const styles = StyleSheet.create({})