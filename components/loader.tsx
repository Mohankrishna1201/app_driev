import React from 'react'
import { StyleSheet, View, ColorValue } from 'react-native'
import { lightGreen } from 'constants/Colors'


const LoadingSpinner = (): JSX.Element => {
    return (
        <View style={styles.container} accessibilityRole='progressbar'>
            <View style={[styles.background]} />
            <View style={[styles.progress, { borderTopColor: '#3DB54A' }]} />
        </View>
    )
}

const height = 24

const styles = StyleSheet.create({
    container: {
        width: height,
        height: height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        width: '100%',
        height: '100%',
        borderRadius: height / 2,
        borderWidth: 4,
        opacity: 0.25,
        backgroundColor: 'gray'
    },
    progress: {
        width: '100%',
        height: '100%',
        borderRadius: height / 2,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderWidth: 4,
        position: 'absolute'
    }
})

export default LoadingSpinner