import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Alert, Dimensions, Animated, Easing, Image, KeyboardAvoidingView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { lightGreen } from '../../constants/Colors';
import { GestureHandlerRootView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { postRequest, putRequest } from 'api/final_api';
import { UPDATE_REQUEST } from 'api/Request';
const { width, height } = Dimensions.get('window');
const qrSize = 150; // Size of the square region for QR scanning

const QRScanner: React.FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const [inputFocused, setInputFocused] = useState(false); // State to manage input focus
    const scanLineAnim = useRef(new Animated.Value(0)).current;
    const [bikeNum, setBikeNum] = useState('');
    const router = useRouter();
    const { selectedTicketId, stationId } = useGlobalSearchParams();
    console.log(selectedTicketId);
    console.log(stationId);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        startScanLineAnimation();
    }, []);

    const startScanLineAnimation = () => {
        scanLineAnim.setValue(0);
        Animated.loop(
            Animated.sequence([
                Animated.timing(scanLineAnim, {
                    toValue: qrSize - 4,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(scanLineAnim, {
                    toValue: 0,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        scanLineAnim.stopAnimation(); // Stop the animation when scanned
        console.log('Scanned Data:', data);
        router.navigate('/ongoing-tkt')
    };

    const UpdateReq = async () => {
        try {
            const data: any = {
                "assignedTo": "JayaK",
                "state": "5",
                "comments": [
                    {
                        "comment": "Ticket Accepted",
                        "modifiedBy": "Mohan from LAPTOP"
                    }
                ]
            }
            const response = await putRequest(`${UPDATE_REQUEST}/${selectedTicketId}`, data);
            if (response) {
                console.log("success final");
                console.log(response);

            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleInput = async (text: string) => {
        setBikeNum(text);
        setInputFocused(false); // Reset input focus state
        router.replace({ pathname: '/ongoing-tkt', params: { selectedTicketId, stationId } }) // Navigate when done

        // await UpdateReq();

    };

    const fetchAPI = async (data: string) => {
        const apiUrl = `https://yourapi.com/endpoint?data=${data}`;
        try {
            const response = await fetch(apiUrl);
            const apiData = await response.json();
            console.log('API Response:', apiData);
            Alert.alert('API Response', JSON.stringify(apiData));
        } catch (error) {
            console.error('Error fetching API:', error);
            Alert.alert('Error', 'Failed to fetch API');
        }
        router.navigate('screen-two');
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            {!inputFocused && (
                <>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFill}
                    />
                    {/* Top overlay */}
                    <View style={[styles.overlay, { top: 0, height: (height) / 2 - 60 }]} />
                    {/* Bottom overlay */}
                    <View style={[styles.overlay, { bottom: 0, height: (height) / 2 - 60 }]} />
                    {/* Left overlay */}
                    <View style={[styles.overlay, { top: (height - 120) / 2, bottom: (height - 120) / 2, left: 0, width: (width - qrSize) / 2 }]} />
                    {/* Right overlay */}
                    <View style={[styles.overlay, { top: (height - 120) / 2, bottom: (height - 120) / 2, right: 0, width: (width - qrSize) / 2 }]} />

                    <View style={styles.qrContainer}>
                        <View style={styles.qrSquare}>
                            <View style={styles.qrBorderTopLeft} />
                            <View style={styles.qrBorderTopRight} />
                            <View style={styles.qrBorderBottomLeft} />
                            <View style={styles.qrBorderBottomRight} />
                            <Animated.View style={[styles.scanLine, { transform: [{ translateY: scanLineAnim }] }]} />
                        </View>
                        {scanned && (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    setScanned(false);
                                    startScanLineAnimation();
                                }}
                            >
                                <Text style={styles.txt}>Scan Again</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={styles.head1}>Scan the QR code on Bike</Text>
                    <Text style={styles.head2}>End your ride at KIIT Campus 6 by scanning the QR code or entering the bike number manually.</Text>
                </>
            )}
            <View style={styles.btnContainer}>
                <View style={styles.input}>
                    <TextInput
                        onChangeText={setBikeNum}
                        placeholder='Enter Bike Number'
                        value={bikeNum}
                        keyboardType="phone-pad"
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        onSubmitEditing={() => handleInput(bikeNum)} // Navigate when done
                    />
                </View>
                <View style={styles.button2}>
                    <TouchableOpacity
                        onPress={() => {
                            setScanned(false);
                            startScanLineAnimation();
                        }}
                    >
                        <Image source={require('../../assets/images/flash_on.png')} style={styles.img} />
                    </TouchableOpacity>
                </View>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 150,
        gap: 10
    },
    img: {
        height: 19.62,
        width: 9.62,
        marginLeft: 4,
        marginTop: 1

    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Adjust the opacity value as needed
        width: '100%',
    },

    input: {
        borderColor: '#D6D6D6',
        borderWidth: 1,
        width: 192,
        height: 40,
        borderRadius: 10,
        padding: 5,
        backgroundColor: 'white',
        paddingLeft: 10,

    },
    head1: {
        textAlign: 'center',
        position: 'absolute',
        bottom: 300,
        color: 'white',
        width: 289,
        fontSize: 19,
    },
    head2: {
        textAlign: 'center',
        position: 'absolute',
        bottom: 230,
        color: 'white',
        width: 289,
        fontSize: 14,
    },
    txt: {
        color: 'white',
        textAlign: 'center'
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
        textAlign: 'center',
    },
    button2: {
        backgroundColor: '#3DB54A',
        borderRadius: 10,
        width: 39,
        height: 39,
        borderColor: '#3DB54A',
        borderWidth: 1,
        padding: 10,
        alignContent: 'center',
        justifyContent: 'center',

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        position: 'relative',
    },
    qrContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: qrSize,
        height: qrSize,
    },
    qrSquare: {
        width: qrSize,
        height: qrSize,
        position: 'absolute',
        overflow: 'hidden',
    },
    qrBorderTopLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 30,
        height: 30,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: lightGreen,
    },
    qrBorderTopRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 30,
        height: 30,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: lightGreen,
    },
    qrBorderBottomLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 30,
        height: 30,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: lightGreen,
    },
    qrBorderBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: lightGreen,
    },
    scanLine: {
        width: '100%',
        height: 2,
        backgroundColor: 'white',
        position: 'absolute',
    },
});

export default QRScanner;
