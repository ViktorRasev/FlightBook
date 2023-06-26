import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ToggleButton } from "@mui/material";
import { useState, useEffect } from "react";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { useDispatch } from "react-redux";
import { setResultTicket } from "../features/resultTicketReducer.js";
import { useNavigate } from "react-router-dom";

const OrderModal = ({ isOpen, handleClose, flight }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pickedSeats, setPickedSeats] = useState(() => []);
  const [price, setPrice] = useState(0);

  const handlePickedSeats = (event, newSeats) => {
    setPickedSeats(newSeats);
  };

  useEffect(() => {
    if (pickedSeats.length) setPrice(pickedSeats.length * flight.price);
    else setPrice(0);
  }, [pickedSeats]);

  const handleOrder = () => {
    const resultSeats = flight.seats.filter((seat) =>
      pickedSeats.includes(seat.id)
    );
    const resultTicket = { ...flight, price: price, seats: resultSeats };
    dispatch(setResultTicket(resultTicket));

    navigate("/receipt");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Price : {price}
        </Typography>
        {flight && flight.seats ? (
          <ToggleButtonGroup
            value={pickedSeats}
            onChange={handlePickedSeats}
            aria-label="seats"
          >
            {flight.seats.map((seat) => (
              <ToggleButton
                aria-label={seat.id}
                key={seat.id}
                value={seat.id}
                disabled={!seat.available}
              >
                {seat.number}
                <EventSeatIcon />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        ) : (
          <Typography variant="body1">Loading seats...</Typography>
        )}
        <Button
          variant="contained"
          disabled={!pickedSeats.length}
          onClick={handleOrder}
        >
          Order
        </Button>
      </Box>
    </Modal>
  );
};

export default OrderModal;
