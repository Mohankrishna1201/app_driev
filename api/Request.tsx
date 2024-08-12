



const SEND_OTP = "api/app/sendOTP/";
const VERIFY_OTP = "api/app/verifyOtp";
const FETCH_ALL_COLLEGES = "api/college/fetchAllCollege";
const FETCH_CUSTOMER_DETAILS = "api/app/customerDetails/";
const FETCH_COMPLETED_TICKET_CARDS = "api/crm/fetchTicketByStatus/COMPLETED"
const FETCH_UPCOMING_TICKET_CARDS = "api/crm/fetchTicketByStatus/PENDING"
const GET_SERVICE_TYPES = "api/crm/getTicketServiceTypes"
const TICKET_SUMMARY = "api/crm/ticketSummary"
const LAST_ACTIVE_TKT = "api/crm/fetchTicketByStatus/PROCESSING"
const FIND_EMPLOYEE = "api/crm/getEmployees"
const UPDATE_REQUEST = "api/crm/updateTicket"
const UPLOAD_DOC = "api/crm/uploadFile"






export {
    SEND_OTP, VERIFY_OTP, FETCH_CUSTOMER_DETAILS, FETCH_COMPLETED_TICKET_CARDS,
    FETCH_UPCOMING_TICKET_CARDS, GET_SERVICE_TYPES,
    TICKET_SUMMARY, LAST_ACTIVE_TKT, FIND_EMPLOYEE, UPDATE_REQUEST, UPLOAD_DOC
}
