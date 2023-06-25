import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setError, setFlights, setLoading } from "./features/flightReducer";
import Home from "./routes/Home";
import Ticket from "./routes/OrderTicket";
import Receipt from "./routes/Receipt";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("flightsData.json");
        const data = await response.json();
        dispatch(setFlights(data));
        dispatch(setLoading(true));
      } catch (error) {
        console.error("Problem with fetching data: ", error);
        dispatch(setError(true));
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orderTicket" element={<Ticket />} />
        <Route path="/receipt" element={<Receipt />} />
      </Routes>
    </>
  );
}

export default App;
