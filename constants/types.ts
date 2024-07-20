export type TicketCardProps = {
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

};

