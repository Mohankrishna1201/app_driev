import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Button,
  Platform,
} from "react-native";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";

import { OngoingTicketCardProps, TicketCardProps } from "constants/types";
import DetailedBikeTickets from "./CompletedBike";

import * as ImagePicker from "expo-image-picker";

import { router } from "expo-router";
const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  return `${formattedDate} ${formattedTime}`;
};

const OngoingTicketCard: React.FC<OngoingTicketCardProps> = ({
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
  handleConfirmation,
}) => {
  const isSelected = selectedTicketId === ticketId;
  const [clicked, setClicked] = useState<boolean>(false);

  const [showBatteryPictures, setShowBatteryPictures] =
    useState<boolean>(false);
  const [showHelmetPictures, setShowHelmetPictures] = useState<boolean>(false);
  const [showConnectorPictures, setShowConnectorPictures] =
    useState<boolean>(false);
  const [showChargerPictures, setShowChargerPictures] =
    useState<boolean>(false);
  const [showScratchesPictures, setShowScratchesPictures] =
    useState<boolean>(false);

  const handleBatteryButtonClicked = () => {
    setShowBatteryPictures(true);
  };

  const handleHelmetButtonClicked = () => {
    setShowHelmetPictures(true);
  };
  const handleConnectorButtonClicked = () => {
    setShowConnectorPictures(true);
  };
  const handleChargerButtonClicked = () => {
    setShowChargerPictures(true);
  };
  const handleScratchesButtonClicked = () => {
    setShowScratchesPictures(true);
  };

  if (isSelected) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.nav}>
          <TouchableOpacity onPress={handleBack}>
            <Image
              style={styles.backButton}
              source={require("../assets/images/reply.png")}
            />
          </TouchableOpacity>
          <Text style={styles.ticketId}> Ticket ID #{ticketId}</Text>
        </View>
        <View style={styles.ticketCard1}>
          <ScrollView contentContainerStyle={styles.container1}>
            <View style={styles.ticketContent}>
              <View style={styles.topCard}>
                <Text style={styles.ticketId}> Ticket ID #{ticketId}</Text>
                <View style={styles.green}>
                  <Image
                    style={styles.vehicleIcon}
                    source={require("../assets/images/Ather.png")}
                  />
                  <Text style={styles.vehicleTypeText}> Bike</Text>
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
              <Text style={styles.picHeading}>Bike Pictures</Text>
              <View style={styles.row1}>
                <ImagePickerExample direction="TOP" />
                <ImagePickerExample direction="LEFT" />
                <ImagePickerExample direction="RIGHT" />
              </View>
              <View style={styles.row1}>
                <ImagePickerExample direction="FRONT" />
                <ImagePickerExample direction="BACK" />
              </View>
              <TouchableOpacity
                onPress={handleBatteryButtonClicked}
                style={styles.button}
              >
                <Text style={styles.btnText}>Now Click Battery Pictures</Text>
              </TouchableOpacity>

              {showBatteryPictures && (
                <>
                  <Text style={styles.picHeading}>Battery Pictures</Text>
                  <View style={styles.row1}>
                    <ImagePickerExample direction="Battery1" />
                    <ImagePickerExample direction="Battery2" />
                  </View>

                  <TouchableOpacity
                    onPress={handleHelmetButtonClicked}
                    style={styles.button}
                  >
                    <Text style={styles.btnText}>
                      Now Click Helmet Pictures
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              {showHelmetPictures && (
                <>
                  <Text style={styles.picHeading}>Helmet Pictures</Text>
                  <View style={styles.row1}>
                    <ImagePickerExample direction="Helmet1" />
                    <ImagePickerExample direction="Helmet2" />
                  </View>
                  <TouchableOpacity
                    onPress={handleConnectorButtonClicked}
                    style={styles.button}
                  >
                    <Text style={styles.btnText}>
                      Now Click Connector Pictures
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              {showConnectorPictures && (
                <>
                  <Text style={styles.picHeading}>Connector Pictures</Text>
                  <View style={styles.row1}>
                    <ImagePickerExample direction="Connector1" />
                    <ImagePickerExample direction="Connector2" />
                  </View>
                  <TouchableOpacity
                    onPress={handleChargerButtonClicked}
                    style={styles.button}
                  >
                    <Text style={styles.btnText}>
                      Now Click Charger Pictures
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              {showChargerPictures && (
                <>
                  <Text style={styles.picHeading}>Charger Pictures</Text>
                  <View style={styles.row1}>
                    <ImagePickerExample direction="Charger1" />
                  </View>
                  <TouchableOpacity
                    onPress={handleScratchesButtonClicked}
                    style={styles.button}
                  >
                    <Text style={styles.btnText}>Now Click Scratches</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button1}>
                    <Text style={styles.btnText1}>Now Proceed</Text>
                  </TouchableOpacity>
                </>
              )}
              {showScratchesPictures && (
                <>
                  <Text style={styles.picHeading}>Scratches Pictures</Text>
                  <View style={styles.row1}>
                    <ImagePickerExample direction="Scratch 1" />
                    <ImagePickerExample direction="Scratch 2" />
                    <ImagePickerExample direction="Scratch 3" />
                  </View>
                  <View style={styles.row1}>
                    <ImagePickerExample direction="Scratch 4" />
                    <ImagePickerExample direction="Scratch 5" />
                    <ImagePickerExample direction="Scratch 6" />
                  </View>
                </>
              )}
            </View>
          </ScrollView>
          <View style={styles.actionIcons1}>
            <Image
              style={styles.Icons}
              source={require("../assets/images/call 1.png")}
            />
            <Image
              style={styles.Icons}
              source={require("../assets/images/comment 1.png")}
            />
            <Image
              style={styles.Icons}
              source={require("../assets/images/location (2) 2.png")}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView>
      <View style={styles.ticketCard}>
        <View style={styles.ticketContent}>
          <View style={styles.topCard}>
            <Text style={styles.ticketId}> Ticket ID #{ticketId}</Text>
            <View style={styles.green}>
              <Image
                style={styles.vehicleIcon}
                source={require("../assets/images/Ather.png")}
              />
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
        <TouchableOpacity onPress={handleCardClick} style={styles.button1}>
          <Text style={styles.btnText1}>See More</Text>
        </TouchableOpacity>
        <View style={styles.actionIcons}>
          <Image
            style={styles.Icons}
            source={require("../assets/images/call 1.png")}
          />
          <Image
            style={styles.Icons}
            source={require("../assets/images/comment 1.png")}
          />
          <Image
            style={styles.Icons}
            source={require("../assets/images/location (2) 2.png")}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  picHeading: {
    fontFamily: "Roboto-Bold",
    fontSize: 14,
    paddingTop: 5,
  },
  button: {
    backgroundColor: "#3DB54A",
    borderRadius: 4,
    width: 275,
    height: 31,
    borderColor: "#3DB54A",
    borderWidth: 1,
    padding: 4,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button1: {
    borderColor: "#3DB54A",
    borderRadius: 4,
    width: 275,
    height: 31,
    borderWidth: 2,
    padding: 4,
    marginTop: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
  btnText: {
    alignSelf: "center",
    fontWeight: "400",
    color: "#ffffff",
    fontSize: 14,
  },
  btnText1: {
    alignSelf: "center",
    color: "#3DB54A",
    fontSize: 14,
    fontFamily: "Roboto-Bold",
  },
  finalImage: {
    width: 264,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  backButton: {
    width: 24,
    height: 24,
  },
  damage1: {
    marginRight: 40,
  },
  damage2: {
    marginRight: 10,
  },
  Icons: {
    height: 32,
    width: 32,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    textAlign: "left",
  },
  row1: {
    flexDirection: "row",
    marginTop: 15,
    gap: 15,
  },
  ticketContent: {
    fontFamily: "Roboto-Regular",
    paddingLeft: 10,
    paddingRight: 10,
  },
  topCard: {
    flexDirection: "row",
    gap: 30,
  },
  container: {
    backgroundColor: "#FFF",
    padding: 28,
    paddingTop: 36,
    alignSelf: "center",
  },
  container1: {
    backgroundColor: "#FFF",
    alignSelf: "center",
  },
  headerIcon: {
    width: 22,
    aspectRatio: 1,
  },
  ticketCard: {
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 1)",
    borderWidth: 1,
    backgroundColor: "#FFF",
    marginBottom: 12,
    width: 307,
    alignSelf: "center",
    flex: 1,
    height: "auto",
  },
  ticketCard1: {
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 1)",
    borderWidth: 1,
    backgroundColor: "#FFF",
    marginBottom: 12,
    width: 307,
    alignSelf: "center",
    flex: 1,
    maxHeight: 627, // Adjust to fit within screen
  },
  ticketId: {
    fontSize: 12,
    fontFamily: "Roboto-Bold",
    paddingTop: 5,
  },
  label: {
    fontSize: 14,
    marginTop: 12,
    lineHeight: 16.41,
  },
  value: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 18.75,
    fontFamily: "Roboto-Medium",
  },
  green: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3DB54A",
    justifyContent: "center",
    width: 94,
    height: 23,
    borderTopRightRadius: 9,
    borderBottomLeftRadius: 6,
  },
  vehicleIcon: {
    width: 30,
    height: 19.24,
    marginBottom: 4,
  },
  BatteryIcon: {
    width: 15.99,
    height: 9.45,
  },
  ChargerIcon: {
    width: 20,
    height: 20,
  },
  vehicleTypeText: {
    color: "#FFF",
    marginLeft: 2,
    fontSize: 14,
    marginBottom: 4,
  },
  actionIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#D9D9D9",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 13,
    marginTop: 15,
    height: 61,
    width: 305,
    alignSelf: "center",
  },
  actionIcons1: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#D9D9D9",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 13,
    marginTop: 15,
    height: 61,
    width: 305,
    alignSelf: "center",
  },
  actionIcon: {
    width: 32,
    aspectRatio: 1,
  },
  imagePick: {
    width: 84,
    height: 80,
    backgroundColor: "#000000",
    color: "white",
  },
  imageText: {
    color: "white",
    margin: "auto",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  capturedImage: {
    width: 84,
    height: 84,
    objectFit: "cover",
  },
});

export default OngoingTicketCard;

interface ImagePickerExampleProps {
  direction: string;
}

const ImagePickerExample: React.FC<ImagePickerExampleProps> = ({
  direction,
}) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    };
    requestPermissions();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      {!image && (
        <TouchableOpacity onPress={pickImage} style={styles.imagePick}>
          <Text style={styles.imageText}>{direction}</Text>
        </TouchableOpacity>
      )}
      {image && <Image source={{ uri: image }} style={styles.capturedImage} />}
    </View>
  );
};
