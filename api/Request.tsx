import axiosRequest from "./service";



const SEND_OTP = "api/app/sendOTP/";
const VERIFY_OTP = "api/app/verifyOtp";
const FETCH_ALL_COLLEGES = "api/college/fetchAllCollege";
const FETCH_CUSTOMER_DETAILS = "api/app/customerDetails/";
const FETCH_COMPLETED_TICKET_CARDS = "api/crm/fetchTicketByStatus/COMPLETED"
const FETCH_UPCOMING_TICKET_CARDS = "api/crm/fetchTicketByStatus/PENDING"





export { SEND_OTP, VERIFY_OTP, FETCH_CUSTOMER_DETAILS, FETCH_COMPLETED_TICKET_CARDS, FETCH_UPCOMING_TICKET_CARDS }
