import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import OrderModal from "../components/OrderModal.jsx";

const OrderTicket = () => {
  const allFlights = useSelector((posts) => posts.flights.flights);
  let [searchParams] = useSearchParams();
  let flightID = searchParams.get("flightID");

  const [flight, setFlight] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedTime = (time) => {
    return dayjs(time).format("HH:mm");
  };

  useEffect(() => {
    setFlight(allFlights.find((flight) => flight.id === parseInt(flightID)));
  }, [allFlights]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <h2 style={{ marginTop: "2rem" }}>
        {dayjs(flight.departure).format("DD.MM.YYYY")}
      </h2>
      <Card
        sx={{
          minWidth: 275,
          maxWidth: 700,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <CardContent>
          <Typography variant="h4" component="div">
            {flight.from}
          </Typography>
          <Typography variant="h6" component="div">
            {formattedTime(flight.departure)}
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <EastIcon />
          <Typography>{flight.duration}</Typography>
        </CardContent>
        <CardContent>
          <Typography variant="h4" component="div">
            {flight.to}
          </Typography>
          <Typography variant="h6" component="div">
            {formattedTime(flight.arrival)}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" variant="contained" onClick={handleOpenModal}>
            Choose Seats
          </Button>
        </CardActions>
      </Card>
      <OrderModal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        flight={flight}
      />
    </Box>
  );
};
export default OrderTicket;
