import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    NativeSyntheticEvent,
    NativeScrollEvent,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import BatteryTickets from "components/Battery";
import ChargerTickets from "components/Charger";
import { getRequest, getRequestPlusHeaders } from "../../api/final_api";
import {
    FETCH_COMPLETED_TICKET_CARDS,
    FETCH_UPCOMING_TICKET_CARDS,
} from "../../api/Request";
import { router, useGlobalSearchParams } from "expo-router";
import TicketCard from "components/Bike";
import { TicketCardProps } from "constants/types";
import CompletedTicketCard from "components/CompletedBike";
import OngoingTicketCard from "components/OngoingTicket";
import { useGlobalContext } from "api/GlobalContext";

interface Ticket {
    ticketId: string;
    jobType: string;
    customerName: string;
    dateTime: string;
    vehicleType: string;
    deliveryType: string;
    vehicleNo: string;
    vehicleStation: string;
    actionIcons: number;
    handleScan: any;
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


const Transportation = () => {
    const [batteryTkt, setBatteryTkt] = useState<Ticket[]>([]);
    const [bikeTkt, setBikeTkt] = useState<TicketCardProps[]>([]);
    const [chargerTkt, setChargerTkt] = useState<Ticket[]>([]);

    const { selectedTicketId } = useGlobalSearchParams();


    const { employeeData } = useGlobalContext();


    const handleBack = () => {
        router.replace({
            pathname: 'ongoing-tkt',
            params: { selectedTicketId: selectedTicketId },
        });
    };


    return (
        <SafeAreaView style={styles.container}>

            {selectedTicketId && (
                <>
                    <View style={styles.nav}>
                        <Text style={styles.head}>Ongoing Tickets</Text>
                        <Text>{employeeData.name}</Text>
                        
                    </View>
                </>
            )}


        </SafeAreaView>
    );
};

export default Transportation;

const styles = StyleSheet.create({
    loader: {
        margin: "auto",
        height: 20,
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#D9D9D9",
        borderRadius: 90,
        marginBottom: 18,
        width: 306,
        height: 41,
        margin: "auto",
        marginTop: 10,
    },
    activeTab: {
        backgroundColor: "#3DB54A",
        borderRadius: 20,
        width: 153,
    },
    activeTabText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
        padding: 10,
    },
    inactiveTab: {
        width: 153,
    },
    inactiveTabText: {
        color: "#000",
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
        padding: 10,
    },
    box: {
        borderColor: "#D6D6D6",
        borderWidth: 1,
        width: 307,
        height: 281,
        borderRadius: 10,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "white",
        paddingLeft: 15,
        marginBottom: 0,
        paddingTop: 29,
        marginTop: 20,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    nav: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 25,
        paddingHorizontal: 40,
    },
    image: {
        width: 22,
        height: 21,
    },
    head: {
        fontFamily: "Roboto-Bold",
        fontSize: 18,
    },
});
