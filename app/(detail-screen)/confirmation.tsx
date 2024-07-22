import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Confirmation = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View>
                <View style={styles.actionIcons}>
                    <Image style={styles.Icons} source={require('../../assets/images/call 1.png')} />
                    <Image style={styles.Icons} source={require('../../assets/images/comment 1.png')} />
                    <Image style={styles.Icons} source={require('../../assets/images/location (2) 2.png')} />
                </View>
            </View>

        </GestureHandlerRootView>
    )
}

export default Confirmation

const styles = StyleSheet.create({
    actionIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#D9D9D9',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 13,
        marginTop: 15,
        height: 61,
        width: 305,
        alignSelf: 'center',
    },
    Icons: {
        height: 32,
        width: 32
    },

})