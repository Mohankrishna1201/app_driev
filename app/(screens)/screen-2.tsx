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
  Modal,
  Button,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { getRequest, getRequestPlusHeaders } from "../../api/final_api";
import { FETCH_UPCOMING_TICKET_CARDS, GET_SERVICE_TYPES, LAST_ACTIVE_TKT } from "../../api/Request";
import { router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import TicketCard from "components/Bike";
import { TicketCardProps } from "constants/types";
import LoadingSpinner from "components/loader";
import { isLoading } from "expo-font";
import { Picker } from '@react-native-picker/picker';



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
type ServiceType = {
  name: string;
  description: string;
};
type ServiceTypeResponse = {
  name: string;
  description: string;
};
const ScreenTwo: React.FC = () => {
  const [batteryTkt, setBatteryTkt] = useState<Ticket[]>([]);
  const [bikeTkt, setBikeTkt] = useState<Ticket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [chargerTkt, setChargerTkt] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [items, setItems] = useState<ServiceType[]>([]);
  const [item, setItem] = useState<String>('');
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);


  const togglePickerVisibility = () => {
    setIsPickerVisible(!isPickerVisible);
  };
  // const stationId =

  //   "S-15502,S-15535,S-17484,S-17920,S-19920,S-24396,S-26141,S-29506";
  const { stationId } = useGlobalSearchParams();
  console.log(stationId);
  const getServiceTypes = async () => {
    try {
      const response = await getRequest(`${GET_SERVICE_TYPES}`);
      if (response) {
        const mappedServices: ServiceType[] = response.map(
          (service: ServiceTypeResponse) => ({
            name: service.name,
            description: service.description
          })
        )
        setItems(mappedServices)
        console.log(`service, ${response}`)
      }

    } catch (error) {

    }
  }
  const getUpcomingTickets = async () => {
    try {
      const response = await getRequestPlusHeaders(
        `${LAST_ACTIVE_TKT}`,
        stationId
      );
      const handleScanning = (ticketId: string) => {
        router.replace({
          pathname: 'qr-scanner',
          params: { selectedTicketId: ticketId, stationId: stationId },
        });

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
    getServiceTypes();
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
  console.log(selectedTicketId);
  const handleBack = () => {
    setSelectedTicketId(null);
  };
  const handleOutsideClick = () => {
    if (isPickerVisible) {
      setIsPickerVisible(false);
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

            <TouchableOpacity onPress={togglePickerVisibility}>
              <Image
                source={require("../../assets/images/filter 1.png")}
                style={styles.image}
              />
            </TouchableOpacity>

            {isPickerVisible && (
              <>
                <TouchableWithoutFeedback onPress={handleOutsideClick}>
                  <View style={styles.overlay} />
                </TouchableWithoutFeedback>
                <View style={styles.dropdown}>

                  <FlatList
                    data={items}
                    keyExtractor={(item) => item.description}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => {
                          setItem(item.name);
                          togglePickerVisibility();
                        }}
                      >
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </>
            )}
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

          </View>
        </>
      )}
      <ScrollView

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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 900, // Ensure it covers other elements
  },
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
  container1: {
    flex: 1,
    padding: 16,
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
  dropdown: {
    position: 'absolute',
    top: 50, // Adjust based on the image size and positioning
    right: 50,
    width: 200,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 15,
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
