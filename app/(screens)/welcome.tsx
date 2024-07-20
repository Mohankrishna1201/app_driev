import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { getRequest, postRequest } from '../../api/final_api';
import { SEND_OTP, VERIFY_OTP } from '../../api/Request';
import { router } from 'expo-router';

const Welcome: React.FC = () => {
    const [name, setName] = useState<string>('Vijay');
    const [scheduledTkt, setScheduledTkt] = useState<number>(0);
    const [completedTkt, setCompletedTkt] = useState<number>(0);
    const [active, setActive] = useState<string>('#####')

    const handleGoToTkt = () => {
        router.navigate('/screen-2')
    }
    return (
        <GestureHandlerRootView>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.bg}>
                    <Image source={require('../../assets/images/icon.png')} style={styles.icon} />
                    <Text style={styles.sideHead}>{`Hi ${name}`}</Text>
                    <Text style={styles.welcomeMsg}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                    </Text>
                    <View style={styles.boxArea}>
                        <View style={styles.box}>
                            <View style={styles.row}>
                                <Text style={styles.schedule}>
                                    Scheduled Tickets
                                </Text>
                                <Text style={styles.schedule}>
                                    {`${scheduledTkt}`}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.box}>
                            <View style={styles.row}>
                                <Text style={styles.schedule}>
                                    Completed Tickets
                                </Text>
                                <Text style={styles.schedule}>
                                    {`${completedTkt}`}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.box1}>
                            <View style={styles.row1}>
                                <View>
                                    <Text style={styles.activetxt}>
                                        Active Ticket
                                    </Text>
                                    <Text style={styles.tkt}>
                                        Ticket Id : {`${active}`}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={handleGoToTkt} style={styles.gotoTkt} >
                                    <Text style={styles.button}>
                                        Go to Ticket
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </View>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    gotoTkt: {
        marginLeft: 30
    },
    schedule: {
        fontSize: 16,

    },
    activetxt: {
        fontSize: 16,

    },
    tkt: {
        fontSize: 15,

    },
    name: {
        alignSelf: 'center',
        marginTop: 10,
        textAlign: 'center',
        width: 296,
        fontSize: 20
    },
    welcomeMsg: {
        alignSelf: 'center',
        textAlign: 'center',
        color: '#6F6F6F',
        width: 295,
        marginTop: 10
    },
    blue: {
        color: '#0084fd',
    },
    sideHead: {
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 80,
    },
    boxArea: {
        marginTop: 30,

    },
    icon: {
        width: 96,
        height: 96,
        flexShrink: 0,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 535,
    },
    bg: {
        backgroundColor: '#f6f6f6ff',
        width: '100%',
        height: 584,
        flexShrink: 0,
        marginTop: 400,
        borderRadius: 26,
    },
    txt: {
        color: 'black',
        fontSize: 30,
        margin: 'auto',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        fontSize: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 110,
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,

    },
    box: {
        borderColor: '#D6D6D6',
        borderWidth: 1,
        width: 299,
        height: 78,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        paddingLeft: 15,
        marginBottom: 0,
        paddingTop: 29,
        marginTop: 20,

    },
    box1: {
        borderColor: '#D6D6D6',
        borderWidth: 1,
        width: 327,
        height: 140,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingTop: 14,
        marginTop: 40,

    },
    button: {
        backgroundColor: '#3DB54A',
        borderRadius: 20,
        width: 110,
        height: 42,
        borderColor: '#3DB54A',
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'white',
        fontSize: 14,
        textAlign: 'center'
    },
    label: {
        marginLeft: '10%',
        marginBottom: 10,
    },
    logo: {
        height: 120,
        width: 150,
        alignSelf: 'center',
        marginBottom: 50,
    },
    btnText: {
        alignSelf: 'center',
        fontWeight: '600',
        color: '#ffffff',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 296,
        alignSelf: 'center',
    },
    otpInput: {
        borderColor: '#D6D6D6',
        borderWidth: 1,
        width: 44,
        height: 44,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: 'white',
    },
});
