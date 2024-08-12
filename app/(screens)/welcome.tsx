import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { getRequest, postRequest, getRequestPlusHeaders, MapEmployee } from '../../api/final_api';
import { SEND_OTP, VERIFY_OTP } from '../../api/Request';
import { router, useGlobalSearchParams } from 'expo-router';
import { TICKET_SUMMARY, LAST_ACTIVE_TKT, FIND_EMPLOYEE } from '../../api/Request';
import { useGlobalContext } from 'api/GlobalContext';

const Welcome: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [scheduledTkt, setScheduledTkt] = useState<number>(0);
    const [completedTkt, setCompletedTkt] = useState<number>(0);
    const [active, setActive] = useState<string>('#####');
    const [loading, setLoading] = useState<boolean>(true);
    const [stationId, setStationId] = useState<string>('');
    const [role, setRole] = useState<any>();
    const { fetchEmployeeData } = useGlobalContext();
    // const stationId =
    //     "S-15502,S-15535,S-17484,S-17920,S-19920,S-24396,S-26141,S-29506";

    //params
    const { contact } = useGlobalSearchParams();
    console.log(contact);
    const { employeeData } = useGlobalContext()
    console.log("check", employeeData)
    const getSummary = async () => {
        // if (contact) {
        //     FindingEmployee();


        // }

        const response: any = await getRequestPlusHeaders(`${TICKET_SUMMARY}`, stationId);
        setCompletedTkt(response.completedTickets);
        setScheduledTkt(response.pendingTickets);
        setLoading(false);
        console.log(response);
    }

    const latestTicket = async () => {
        const response: any = await getRequestPlusHeaders(`${LAST_ACTIVE_TKT}`, stationId);
        console.log(response[0].ticketId);
        setActive(response[0].ticketId);

    }
    // const FindingEmployee = async () => {
    //     const response: any = await MapEmployee(FIND_EMPLOYEE, contact);
    //     setStationId(response.stationId);
    //     console.log(response);
    //     setName(response.name)
    //     setRole(response.role);


    // }
    useEffect(() => {
        // if (contact) {
        //     fetchEmployeeData(contact);
        // }
        getSummary();
        latestTicket();
        setStationId(employeeData.stationId);
    })
    const handleGoToTkt = () => {
        router.replace({
            pathname: 'screen-2',
            params: { stationId },
        });
    }

    if (loading) {
        return (<View style={styles.load}><ActivityIndicator /></View>)
    }
    return (
        <GestureHandlerRootView>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.bg}>
                    <Image source={require('../../assets/images/icon.png')} style={styles.icon} />
                    <Text style={styles.sideHead}>{`Hi ${employeeData.name}`}</Text>
                    <Text style={styles.welcomeMsg}>
                        You are an {employeeData.role}
                    </Text>
                    <Text style={styles.welcomeMsg}>
                        smod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
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
                                <TouchableOpacity onPress={handleGoToTkt}  >
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
    load: {
        margin: 'auto',
    },
    schedule: {
        fontSize: 16,

    },
    activetxt: {
        fontSize: 16,

    },
    tkt: {
        fontSize: 12,

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
        justifyContent: 'space-around'

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
