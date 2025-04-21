export const useBookingStore = (set, get) => ({
  bookingDetails: {
    farmhouseCode: "",
    checkinDatetime: "",
    checkoutDatetime: "",
    numberOfDays: 0,
    totalNumberofGuest: 0,
    numberofAdults: 0,
    numberofChildrens: 0,
    numberofInfants: 0,
    numberofPets: 0,
    totalBookingPrice: 0,
    taxAmount: 0,
    name: "",
    mobileNumber: "",
    emailID: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    remarks: "",
    task: "INS",
  },
  checkInOutDates: [],

  setBookingDetails: (updates) =>
    set((state) => ({
      bookingDetails: { ...state.bookingDetails, ...updates },
    })),

  resetBookingDetails: () =>
    set({
      bookingDetails: {
        farmhouseCode: "",
        checkinDatetime: "",
        checkoutDatetime: "",
        numberOfDays: 0,
        totalNumberofGuest: 0,
        numberofAdults: 0,
        numberofChildrens: 0,
        numberofInfants: 0,
        numberofPets: 0,
        totalBookingPrice: 0,
        taxAmount: 0,
        name: "",
        mobileNumber: "",
        emailID: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        remarks: "",
        task: "INS",
      },
    }),

  setCheckInOutDates: (dates) =>
    set(() => ({
      checkInOutDates: dates,
    })),
});

// {
//   "farmhouseCode": "string",
//   "checkinDatetime": "2025-04-18T07:50:08.760Z",
//   "checkoutDatetime": "2025-04-18T07:50:08.760Z",
//   "numberOfDays": "string",
//   "tittle": "string",
//   "name": "string",
//   "mobileNumber": "string",
//   "emailID": "string",
//   "address": "string",
//   "city": "string",
//   "state": "string",
//   "pincode": "string",
//   "remarks": "string",
//   "task": "string"
// }
