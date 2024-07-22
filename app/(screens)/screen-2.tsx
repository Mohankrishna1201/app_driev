import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { getRequestPlusHeaders } from "../../api/final_api";
import { FETCH_UPCOMING_TICKET_CARDS } from "../../api/Request";
import { router } from "expo-router";
import TicketCard from "components/Bike";
import { TicketCardProps } from "constants/types";
import LoadingSpinner from "components/loader";
import { isLoading } from "expo-font";

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

const ScreenTwo: React.FC = () => {
  const [batteryTkt, setBatteryTkt] = useState<Ticket[]>([]);
  const [bikeTkt, setBikeTkt] = useState<Ticket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [chargerTkt, setChargerTkt] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const stationId =
    "S-15502,S-15535,S-17484,S-17920,S-19920,S-24396,S-26141,S-29506";

  const getUpcomingTickets = async () => {
    try {
      const response = await getRequestPlusHeaders(
        `${FETCH_UPCOMING_TICKET_CARDS}`,
        stationId
      );
      const handleScanning = () => {
        router.navigate("/qr-scanner");
      };
      if (response) {
        const mappedTickets: Ticket[] = response.map(
          (ticket: TicketResponse) => ({
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
            BatteryId1: "",
            BatteryId2: "",
            ChargerId: "",
            NosHelmet: 0,
            HelmetId1: "",
            HelmetId2: "",
            EmployeeAccept: "",
            selectedTicketId: null,
            handleCardClick: handleCardClick,
            handleBack: handleBack,
          })
        );
        setBikeTkt(mappedTickets);
        setLoading(false);
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
    router.navigate("screen-3");
  };

  const handleCardClick = (ticketId: string) => {
    setSelectedTicketId(ticketId);
  };

  const handleBack = () => {
    setSelectedTicketId(null);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    if (currentScrollY === 0) {
      // User has scrolled to the top
      router.replace("/screen-2");
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {!selectedTicketId && (
        <>
          <View style={styles.nav}>
            <Text style={styles.head}>Upcoming Tickets</Text>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/filter 1.png")}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.tabContainer}>
            <View style={styles.activeTab}>
              <TouchableOpacity onPress={handleUpcoming}>
                <Text style={styles.activeTabText}>Upcoming Tickets</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inactiveTab}>
              <TouchableOpacity onPress={handleCompleted}>
                <Text style={styles.inactiveTabText}>Completed Tickets</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {selectedTicketId && (
        <>
          <View style={styles.nav}>
            <Text style={styles.head}>Upcoming Tickets</Text>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/filter 1.png")}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
      <ScrollView
        // onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              getUpcomingTickets();
            }}
          />
        }
      >
        <BikeTickets
          tickets={bikeTkt}
          selectedTicketId={selectedTicketId}
          handleCardClick={handleCardClick}
          handleBack={handleBack}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenTwo;

const styles = StyleSheet.create({
  loader: {
    margin: "auto",
    height: 40,
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

type BikeTicketsProps = {
  tickets: TicketCardProps[];
  selectedTicketId: string | null;
  handleCardClick: (ticketId: string) => void;
  handleBack: () => void;
};

const BikeTickets: React.FC<BikeTicketsProps> = ({
  tickets,
  selectedTicketId,
  handleCardClick,
  handleBack,
}) => {
  return (
    <View>
      {selectedTicketId ? (
        <TicketCard
          {...tickets.find((ticket) => ticket.ticketId === selectedTicketId)!}
          selectedTicketId={selectedTicketId}
          handleCardClick={handleCardClick}
          handleBack={handleBack}
        />
      ) : (
        <ScrollView>
          {tickets.map((ticket, index) => (
            <TicketCard
              key={index}
              {...ticket}
              selectedTicketId={selectedTicketId}
              handleCardClick={handleCardClick}
              handleBack={handleBack}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};
