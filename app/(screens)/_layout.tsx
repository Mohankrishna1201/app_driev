import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
const AuthLayout = () => {
    return (
        <>
            <Stack>

                <Stack.Screen
                    name="welcome"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="screen-2"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="screen-3"
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="qr-scanner"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>

        </>
    )
}

export default AuthLayout

const styles = StyleSheet.create({})