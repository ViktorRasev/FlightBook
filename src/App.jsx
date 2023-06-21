import {useEffect} from "react";
import { useDispatch } from 'react-redux'
import {setError, setFlights, setLoading} from "./features/flightReducer.js";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("flightsData.json");
                const data = await response.json();
                dispatch(setFlights(data));
                dispatch(setLoading(false));
            } catch (error) {
                console.error("Problem with fetching data: ", error);
                dispatch(setError(true));
            }
        };

        fetchData();

    }, []);


return (
    <>
        <h1>Hello</h1>

    </>

)
}

export default App
