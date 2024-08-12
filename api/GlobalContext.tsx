import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MapEmployee } from "./final_api";
import { FIND_EMPLOYEE } from "./Request";

interface GlobalContextProps {
    employeeData: any;
    setEmployeeData: React.Dispatch<React.SetStateAction<any>>;
    fetchEmployeeData: (contact: any) => void;
}

interface GlobalProviderProps {
    children: ReactNode;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

const STORAGE_KEY = 'employeeData';
const TIMESTAMP_KEY = 'employeeDataTimestamp';
const EXPIRATION_TIME = 60 * 60 * 1000;

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [employeeData, setEmployeeData] = useState<any>(null);

    useEffect(() => {
        const fetchDataFromStorage = async () => {
            const storedData = await AsyncStorage.getItem(STORAGE_KEY);
            const storedTimestamp = await AsyncStorage.getItem(TIMESTAMP_KEY);
            const currentTime = new Date().getTime();

            if (storedData && storedTimestamp && currentTime - parseInt(storedTimestamp) <= EXPIRATION_TIME) {
                setEmployeeData(JSON.parse(storedData));
            } else {
                await AsyncStorage.removeItem(STORAGE_KEY);
                await AsyncStorage.removeItem(TIMESTAMP_KEY);
            }
        };

        fetchDataFromStorage();
    }, []);

    const fetchEmployeeData = async (contact: any) => {
        try {
            const data = await MapEmployee(FIND_EMPLOYEE, contact); // Adjust the route accordingly
            setEmployeeData(data);
            const currentTime = new Date().getTime();
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            await AsyncStorage.setItem(TIMESTAMP_KEY, currentTime.toString());
        } catch (error) {
            console.error("Failed to fetch employee data:", error);
        }
    };

    return (
        <GlobalContext.Provider value={{ employeeData, setEmployeeData, fetchEmployeeData }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};
