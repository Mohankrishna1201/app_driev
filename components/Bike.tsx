import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

import { TicketCardProps } from 'constants/types';
import DetailedBikeTickets from './CompletedBike';

const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
};


const TicketCard: React.FC<TicketCardProps> = ({
    ticketId,
    jobType,
    customerName,
    dateTime,
    vehicleType,
    deliveryType,
    vehicleNo,
    vehicleStation,
    actionIcons,
    handleScan,
    NosBattery,
    BatteryId1,
    BatteryId2,
    ChargerId,
    NosHelmet,
    HelmetId1,
    HelmetId2,
    EmployeeAccept,
    selectedTicketId,
    handleCardClick,
    handleBack,
}) => {
    const isSelected = selectedTicketId === ticketId;

    if (isSelected) {
        return (
            <GestureHandlerRootView>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={handleBack}>
                        <Image style={styles.backButton} source={require('../assets/images/reply.png')} />
                    </TouchableOpacity>
                    <Text style={styles.ticketId}> Ticket ID #{ticketId}</Text>
                </View>
                <View style={styles.ticketCard}>

                    <View style={styles.ticketContent}>
                        <View style={styles.topCard}>
                            <Text style={styles.ticketId}> Ticket ID #{ticketId}</Text>
                            <View style={styles.green}>
                                <Image style={styles.vehicleIcon} source={require('../assets/images/Ather.png')} />
                                <Text style={styles.vehicleTypeText} > Bike</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>Type of Job</Text>
                                <Text style={styles.value}>{jobType}</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>Type of Delivery</Text>
                                <Text style={styles.value}>{deliveryType}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>Customer Name</Text>
                                <Text style={styles.value}>{customerName}</Text>
                            </View>
                            <View style={styles.damage1}>
                                <Text style={styles.label} >Vehicle No</Text>
                                <Text style={styles.value}>{vehicleNo}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>Pickup Date & Time</Text>
                                <Text style={styles.value}>{formatDateTime(dateTime)}</Text>
                            </View>
                            <View style={styles.damage2}>
                                <Text style={styles.label}>Vehicle Station</Text>
                                <Text style={styles.value}>{vehicleStation}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>No Of Battery</Text>
                                <Text style={styles.value}>{NosBattery}</Text>
                            </View>
                            <View style={styles.damage2}>
                                <Text style={styles.label}>Battery ID #1</Text>
                                <Text style={styles.value}>{BatteryId1}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>Battery ID #2</Text>
                                <Text style={styles.value}>{BatteryId2}</Text>
                            </View>
                            <View style={styles.damage2}>
                                <Text style={styles.label}>Charger ID</Text>
                                <Text style={styles.value}>{ChargerId}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>No of Helmets</Text>
                                <Text style={styles.value}>{NosHelmet}</Text>
                            </View>
                            <View style={styles.damage2}>
                                <Text style={styles.label}>Helmet ID #1</Text>
                                <Text style={styles.value}>{HelmetId1}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>Helmet ID #2</Text>
                                <Text style={styles.value}>{HelmetId2}</Text>
                            </View>
                        </View>
                        <View style={styles.actionIcons}>
                            <TouchableOpacity onPress={() => handleScan(ticketId)}><Image style={styles.Icons} source={require('../assets/images/video-play 1.png')} /></TouchableOpacity>
                            <Image style={styles.Icons} source={require('../assets/images/call 1.png')} />
                            <Image style={styles.Icons} source={require('../assets/images/comment 1.png')} />
                            <Image style={styles.Icons} source={require('../assets/images/location (2) 2.png')} />
                        </View>
                    </View>

                </View>

            </GestureHandlerRootView>

        );
    }

    return (
        <GestureHandlerRootView>

            <View style={styles.ticketCard}>
                <TouchableOpacity onPress={() => handleCardClick(ticketId)}>
                    <View style={styles.ticketContent}>
                        <View style={styles.topCard}>
                            <Text style={styles.ticketId}> Ticket ID #{ticketId}</Text>
                            <View style={styles.green}>
                                <Image style={styles.vehicleIcon} source={require('../assets/images/Ather.png')} />
                                <Text style={styles.vehicleTypeText}>Bike</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>Type of Job</Text>
                                <Text style={styles.value}>{jobType}</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>Type of Delivery</Text>
                                <Text style={styles.value}>{deliveryType}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>Customer Name</Text>
                                <Text style={styles.value}>{customerName}</Text>
                            </View>
                            <View style={styles.damage1}>
                                <Text style={styles.label}>Vehicle No</Text>
                                <Text style={styles.value}>{vehicleNo}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>Pickup Date & Time</Text>
                                <Text style={styles.value}>{formatDateTime(dateTime)}</Text>
                            </View>
                            <View style={styles.damage2}>
                                <Text style={styles.label}>Vehicle Station</Text>
                                <Text style={styles.value}>{vehicleStation}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.actionIcons}>
                    <TouchableOpacity ><Image style={styles.Icons} source={require('../assets/images/video-play 1.png')} /></TouchableOpacity>
                    <Image style={styles.Icons} source={require('../assets/images/call 1.png')} />
                    <Image style={styles.Icons} source={require('../assets/images/comment 1.png')} />
                    <Image style={styles.Icons} source={require('../assets/images/location (2) 2.png')} />
                </View>
            </View>

        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 40,
    },
    backButton: {
        width: 24,
        height: 24,

    },
    damage1: {
        marginRight: 40
    },
    damage2: {
        marginRight: 10
    },
    Icons: {
        height: 32,
        width: 32
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between', // Ensures items are evenly spaced
        marginTop: 10,
        textAlign: 'left'
    },
    ticketContent: {
        fontFamily: 'Roboto-Regular',
        paddingLeft: 10,
        paddingRight: 10,

    },
    topCard: {
        flex: 1,
        flexDirection: 'row',
        gap: 30

    },
    container: {
        backgroundColor: '#FFF',
        padding: 28,
        paddingTop: 36,
        alignSelf: 'center'
    },

    headerIcon: {
        width: 22,
        aspectRatio: 1,
    },

    ticketCard: {
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
        backgroundColor: '#FFF',
        marginBottom: 12,
        width: 307,
        alignSelf: 'center'
    },

    ticketId: {
        fontSize: 12,
        fontFamily: 'Roboto-Bold',
        paddingTop: 5
    },

    label: {
        fontSize: 14,
        marginTop: 12,
        lineHeight: 16.41
    },
    value: {
        fontSize: 16,
        marginTop: 8,
        lineHeight: 18.75,
        fontFamily: 'Roboto-Medium'
    },
    green: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3DB54A',
        justifyContent: 'center',
        width: 94,
        height: 23,
        borderTopRightRadius: 9,
        borderBottomLeftRadius: 6,

    },
    vehicleIcon: {
        width: 30,
        height: 19.24,
        marginBottom: 4
    },
    BatteryIcon: {
        width: 15.99,
        height: 9.45
    },
    ChargerIcon: {
        width: 20,
        height: 20
    },
    vehicleTypeText: {
        color: '#FFF',
        marginLeft: 2,
        fontSize: 14,
        marginBottom: 4

    },
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
        alignSelf: 'center'
    },
    actionIcon: {
        width: 32,
        aspectRatio: 1,
    },
});

export default TicketCard;
