import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRequest, postRequest } from "../../api/final_api";
import { SEND_OTP, VERIFY_OTP } from "../../api/Request";
import { router } from "expo-router";
import { useGlobalContext } from "api/GlobalContext";

const SignUp: React.FC = () => {
  const [contact, setContact] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [contactCheck, setContactCheck] = useState<boolean>(false);
  const [wrongOtp, setWrongOtp] = useState<boolean>(false);
  const [isLoginChecked, setIsLoginChecked] = useState<boolean>(false);
  const otpRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];
  const { fetchEmployeeData } = useGlobalContext()
  const { employeeData } = useGlobalContext();
  useEffect(() => {
    const checkLoginStatus = async () => {
      const timestamp = await AsyncStorage.getItem("loginTimestamp");
      const contact = await AsyncStorage.getItem("contact");
      if (timestamp) {
        const currentTime = new Date().getTime();
        if (currentTime - parseInt(timestamp) <= 60 * 60 * 1000 && contact && employeeData) {
          router.replace({
            pathname: '/welcome',
            params: { contact },
          });
        } else {
          await AsyncStorage.removeItem("loginTimestamp");
          await AsyncStorage.removeItem("contact");
        }
      }
      setIsLoginChecked(true);
    };
    checkLoginStatus();
  }, []);

  const getOTP = async () => {
    try {
      const response = await getRequest(`${SEND_OTP}/${contact}`);
      if (response) {
        console.log("success");
        console.log(response);
        setContactCheck(true);
        setWrongOtp(false); // Reset wrongOtp to false when resending OTP
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOTP = async () => {
    try {
      const data: any = {
        mobileNos: contact,
        otp: otp.join(""),
        source: "website",
      };
      const response = await postRequest(VERIFY_OTP, data);
      if (response) {
        console.log("success");
        console.log(response);
        if (response.type === 'success') {
          const currentTime = new Date().getTime();
          await AsyncStorage.setItem("loginTimestamp", currentTime.toString());
          await AsyncStorage.setItem("contact", contact);
          await fetchEmployeeData(contact)
          router.replace({
            pathname: '/welcome',
            params: { contact },
          });

        } else if (response.type === 'error') {
          setWrongOtp(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (text: string) => {
    setContact(text);
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if a digit is entered
    if (text && index < otpRefs.length - 1) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleSubmit = async () => {
    try {
      await verifyOTP();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoginChecked) {
    return null; // Render nothing until login status is checked
  }

  if (wrongOtp && contactCheck) {
    return (
      <GestureHandlerRootView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.bg}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.icon}
            />
            <Text style={styles.sideHead}>Please check your OTP and try again</Text>
            <View style={styles.inputArea}>
              <TouchableOpacity onPress={getOTP} style={styles.button}>
                <Text style={styles.btnText}>Resend OTP</Text>
              </TouchableOpacity>
              <Text style={styles.terms}>
                By continuing, you have read and agreed to the{" "}
                <Text style={styles.blue}>terms and conditions.</Text>
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    )
  }

  if (contactCheck) {
    return (
      <GestureHandlerRootView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.bg}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.icon}
            />
            <Text style={styles.sideHead}>Login</Text>
            <Text
              style={styles.terms}
            >{`We sent an OTP to ${contact}, please enter it here!`}</Text>
            <View style={styles.inputArea}>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={otpRefs[index]}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    value={digit}
                  />
                ))}
              </View>
              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
              <Text style={styles.terms}>
                By continuing, you have read and agreed to the{" "}
                <Text style={styles.blue}>terms and conditions.</Text>
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.bg}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.icon}
          />
          <Text style={styles.sideHead}>Login</Text>
          <View style={styles.inputArea}>
            <TextInput
              onChangeText={handleInput}
              placeholder="+91     Enter your Mobile Number"
              value={contact}
              style={styles.input}
              keyboardType="phone-pad"
            />
            <TouchableOpacity onPress={getOTP} style={styles.button}>
              <Text style={styles.btnText}>Send OTP</Text>
            </TouchableOpacity>
            <Text style={styles.terms}>
              By continuing, you have read and agreed to the{" "}
              <Text style={styles.blue}>terms and conditions.</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  terms: {
    alignSelf: "center",
    marginTop: 30,
    textAlign: "center",
    width: 296,
  },
  blue: {
    color: "#0084fd",
  },
  sideHead: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 80,
  },
  inputArea: {
    marginTop: 30,
  },
  icon: {
    width: 96,
    height: 96,
    flexShrink: 0,
    alignSelf: "center",
    position: "absolute",
    bottom: 535,
  },
  bg: {
    backgroundColor: "#f6f6f6ff",
    width: "100%",
    height: 584,
    flexShrink: 0,
    marginTop: 600,
    borderRadius: 26,
  },
  txt: {
    color: "black",
    fontSize: 30,
    margin: "auto",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    fontSize: 15,
  },
  input: {
    borderColor: "#D6D6D6",
    borderWidth: 1,
    width: 313,
    height: 44,
    borderRadius: 20,
    padding: 5,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "white",
    paddingLeft: 10,
    marginBottom: 0,
  },
  button: {
    backgroundColor: "#3DB54A",
    borderRadius: 20,
    width: 313,
    height: 44,
    borderColor: "#3DB54A",
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
  },
  label: {
    marginLeft: "10%",
    marginBottom: 10,
  },
  logo: {
    height: 120,
    width: 150,
    alignSelf: "center",
    marginBottom: 50,
  },
  btnText: {
    alignSelf: "center",
    fontWeight: "600",
    color: "#ffffff",
    alignItems: "center",
    alignContent: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 296,
    alignSelf: "center",
  },
  otpInput: {
    borderColor: "#D6D6D6",
    borderWidth: 1,
    width: 44,
    height: 44,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "white",
  },
});
