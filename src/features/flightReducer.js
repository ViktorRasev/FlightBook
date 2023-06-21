import { createSlice } from "@reduxjs/toolkit"

export const flightsSlice = createSlice({
    name: "flights",
    initialState: {
        flights: [],
        loading: false,
        error: null
    },
    reducers: {
        setFlights: (state, action) => {
            state.flights = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setFlights, setLoading, setError } = flightsSlice.actions
export default flightsSlice.reducer