import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';

type TicketCardProps = {
    ticketId: string;
    jobType: string;
    customerName: string;
    dateTime: string;
    vehicleType: string;
    deliveryType: string;
    vehicleNo?: string;
    vehicleStation?: string;
    actionIcons: number;
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
}) => {
    return (
        <View style={styles.ticketCard}>
            <View style={styles.ticketContent}>
                <View style={styles.topCard}>
                    <Text style={styles.ticketId}> Ticket ID #{ticketId}</Text>
                    <View style={styles.green}>
                        <Image style={styles.batteryIcon} source={require('../assets/images/Group.png')} />
                        <Text style={styles.batteryTypeText} > Battery</Text>
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
                    <View>
                        <Text style={styles.label}>Vehicle No</Text>
                        <Text style={styles.value}>{vehicleNo}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.label}>Pickup Date & Time</Text>
                        <Text style={styles.value}>{dateTime}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Vehicle Station</Text>
                        <Text style={styles.value}>{jobType}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.actionIcons}>
                <Image style={styles.Icons} source={require('../assets/images/video-play 1.png')} />
                <Image style={styles.Icons} source={require('../assets/images/call 1.png')} />
                <Image style={styles.Icons} source={require('../assets/images/adapter 1.png')} />
            </View>
        </View>
    );
};

type BatteryTicketsProps = {
    tickets: TicketCardProps[];
};

const BatteryTickets: React.FC<BatteryTicketsProps> = ({ tickets }) => {
    return (
        <View style={styles.container}>
            {tickets.map((ticket, index) => (
                <TicketCard key={index} {...ticket} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
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
        gap: 111

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
        width: 307

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
        lineHeight: 18.75
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
    batteryIcon: {
        width: 15.99,
        height: 9.45
    },
    ChargerIcon: {
        width: 20,
        height: 20
    },
    batteryTypeText: {
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
        width: 305
    },
    actionIcon: {
        width: 32,
        aspectRatio: 1,
    },
});


export default BatteryTickets;
