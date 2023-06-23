import { configureStore } from "@reduxjs/toolkit"
import flightsReducer from "../features/flightReducer"
import pickedDestinationsReducer from "../features/pickedDestinationsReducer";

const store = configureStore({
    reducer: {
        flights: flightsReducer,
        pickedDestinations: pickedDestinationsReducer
    }
})

export default store