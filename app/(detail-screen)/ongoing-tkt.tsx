import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getRequestPlusHeaders } from '../../api/final_api';
import { FETCH_UPCOMING_TICKET_CARDS } from '../../api/Request';
import { router } from 'expo-router';
import TicketCard from 'components/Bike';
import { OngoingTicketCardProps, TicketCardProps } from 'constants/types';
import OngoingTicketCard from 'components/OngoingTicket';

interface Ticket {
    ticketId: string;
    jobType: string;
    customerName: string;
    dateTime: string;
    vehicleType: string;
    deliveryType: string;
    vehicleNo?: string;
    vehicleStation?: string;
    actionIcons: number;
    handleScan: any;
    NosBattery: number;
    BatteryId1: string;
    BatteryId2: string;
    ChargerId: string;
    NosHelmet: number;
    HelmetId1: string;
    HelmetId2: string;
    EmployeeAccept: string;
    selectedTicketId: string | null;
    handleCardClick: (ticketId: string) => void;
    handleBack: () => void;
    handleConfirmation: () => void
}

interface TicketResponse {
    ticketId: string;
    jobType: string;
    name: string;
    createdDate: string;
    vehicleModel: string;
    serviceType: string;
    vehicleNo: string;
    area: string;
    actionIcons: number;

}

const ScreenTwo = () => {
    const [batteryTkt, setBatteryTkt] = useState<Ticket[]>([]);
    const [bikeTkt, setBikeTkt] = useState<Ticket[]>([]);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [chargerTkt, setChargerTkt] = useState<Ticket[]>([]);
    const stationId = 'S-15502,S-15535,S-17484,S-17920,S-19920,S-24396,S-26141,S-29506';

    const getUpcomingTickets = async () => {
        try {
            const response = await getRequestPlusHeaders(`${FETCH_UPCOMING_TICKET_CARDS}`, stationId);
            const handleScanning = () => {
                router.navigate('/qr-scanner');
            };
            if (response) {
                const mappedTickets: Ticket[] = response.map((ticket: TicketResponse) => ({
                    ticketId: ticket.ticketId,
                    jobType: ticket.serviceType,
                    customerName: ticket.name,
                    dateTime: ticket.createdDate,
                    vehicleType: ticket.vehicleModel,
                    deliveryType: ticket.serviceType,
                    vehicleNo: ticket.vehicleNo,
                    vehicleStation: ticket.area,
                    actionIcons: 3,
                    handleScan: handleScanning,
                    NosBattery: 0,
                    BatteryId1: 0,
                    BatteryId2: 0,
                    ChargerId: 0,
                    NosHelmet: 0,
                    HelmetId1: 0,
                    HelmetId2: 0,
                    handleConfirmation: handleConfirmation

                }));
                setBikeTkt(mappedTickets);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUpcomingTickets();
    }, []);

    const handleUpcoming = () => {
        getUpcomingTickets();
    };

    const handleCompleted = () => {
        router.navigate('screen-3');
    };

    const handleCardClick = (ticketId: string) => {
        setSelectedTicketId(ticketId);
    };

    const handleBack = () => {
        setSelectedTicketId(null);
    };

    const handleConfirmation = () => {
        router.navigate('confirmation.tsx')
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.head}>Upcoming Tickets</Text>
                <TouchableOpacity>
                    <Image source={require('../../assets/images/filter 1.png')} style={styles.image} />
                </TouchableOpacity>
            </View>
            <ScrollView scrollEnabled={false}>
                <View>
                    <BikeTickets
                        tickets={bikeTkt}
                        selectedTicketId={selectedTicketId}
                        handleCardClick={handleCardClick}
                        handleBack={handleBack}
                        handleConfirmation={handleConfirmation}

                    />
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

export default ScreenTwo;

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#D9D9D9',
        borderRadius: 90,
        marginBottom: 18,
        width: 306,
        height: 41,
        margin: 'auto',
        marginTop: 10,
    },
    activeTab: {
        backgroundColor: '#3DB54A',
        borderRadius: 20,
        width: 153,
    },
    activeTabText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        padding: 10,
    },
    inactiveTab: {
        width: 153,
    },
    inactiveTabText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 25,
        paddingHorizontal: 40,
    },
    image: {
        width: 22,
        height: 21,
    },
    head: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
    },
});

type BikeTicketsProps = {
    tickets: OngoingTicketCardProps[];
    selectedTicketId: string | null;
    handleCardClick: (ticketId: string) => void;
    handleBack: () => void;
    handleConfirmation: () => void
};

const BikeTickets: React.FC<BikeTicketsProps> = ({ tickets, selectedTicketId, handleCardClick, handleBack }) => {
    return (
        <View>

            <OngoingTicketCard
                {...tickets.find(ticket => ticket.ticketId === selectedTicketId)!}
                selectedTicketId={selectedTicketId}
                handleCardClick={handleCardClick}
                handleBack={handleBack}
                handleConfirmation={handleConfirmation}
            />

        </View>
    );
};







