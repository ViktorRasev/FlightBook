import { createSlice } from "@reduxjs/toolkit"

export const pickedDestinationsSlice = createSlice({
    name: "pickedDestinations",
    initialState: [],
    reducers: {
        setPickedDestinations: (state, action) => {
            return action.payload
        }
    }
})


export const {setPickedDestinations} = pickedDestinationsSlice.actions
export default pickedDestinationsSlice.reducer