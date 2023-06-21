import { configureStore } from "@reduxjs/toolkit"
import flightsReducer from "../features/flightReducer"

const store = configureStore({
    reducer: {
        flights: flightsReducer
    }
})

export default store