import { configureStore, getDefaultMiddleware  } from "@reduxjs/toolkit"
import flightsReducer from "../features/flightReducer"
import pickedDestinationsReducer from "../features/pickedDestinationsReducer";
import resultTicketReducer from "../features/resultTicketReducer";
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist"
import {combineReducers} from "@reduxjs/toolkit"

const persistConfig = {
    key: "root",
    version: 1,
    storage
}


const reducer = combineReducers({
    flights: flightsReducer,
    pickedDestinations: pickedDestinationsReducer,
    resultTicket: resultTicketReducer

})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export default store