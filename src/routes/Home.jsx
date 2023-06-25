import SearchForm from "../components/SearchForm";
import DateAndTimePicker from "../components/DateAndTimePicker.jsx";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Home = () => {
  const navigate = useNavigate();
  const [resultTicketID, setResultTicketID] = useState(null);
  const [allSeatsUnavailable, setAllSeatsUnavailable] = useState(false);
  const allFlights = useSelector((posts) => posts.flights.flights);

  const getTicketID = (ticketID) => {
    setResultTicketID(ticketID);
  };

  const navigateToOrderTicket = () => {
    navigate(`/orderTicket?flightID=${resultTicketID}`);
  };

  useEffect(() => {
    if (resultTicketID) {
      const flightByID = allFlights.find(
        (flight) => flight.id === parseInt(resultTicketID)
      );
      const unavailableSeats = flightByID.seats.every(
        (seat) => !seat.available
      );
      setAllSeatsUnavailable(unavailableSeats);
    }
  }, [resultTicketID]);

  return (
    <>
      <SearchForm />
      <DateAndTimePicker getTicketID={getTicketID} />
      <div style={{ width: "100%" }}>
        <Button
          sx={{ display: "block", width: "200px", margin: "0 auto" }}
          variant="contained"
          disabled={!resultTicketID || allSeatsUnavailable}
          onClick={navigateToOrderTicket}
        >
          Order Ticket
        </Button>
      </div>
    </>
  );
};

export default Home;
