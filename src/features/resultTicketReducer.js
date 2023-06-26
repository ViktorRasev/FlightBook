import { createSlice } from "@reduxjs/toolkit"



export const resultTicketSlice = createSlice({
    name: "resultTicket",
    initialState: {},
    reducers: {
        setResultTicket:(state, action) => {
            return action.payload
        }
    }

})


export const {setResultTicket} = resultTicketSlice.actions
export default resultTicketSlice.reducer
