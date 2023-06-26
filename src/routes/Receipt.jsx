import { useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const Receipt = () => {
  const navigate = useNavigate();

  const ticket = useSelector((state) => state.resultTicket);

  const formattedDateAndTime = (value) => {
    return dayjs(value).format("DD.MM.YYYY HH:mm");
  };

  const cardStyle = {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 auto",
  };

  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography
          sx={{ fontSize: 20, mb: 3 }}
          color="text.secondary"
          gutterBottom
        >
          Your ticket
        </Typography>
        <Typography variant="h5" component="div">
          {ticket.from}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {formattedDateAndTime(ticket.departure)}
        </Typography>
        <Typography sx={{ m: 1.5 }}>
          <ArrowDownwardIcon />
        </Typography>
        <Typography variant="h5" component="div">
          {ticket.to}
        </Typography>
        <Typography
          sx={{ fontSize: 14, mb: 4 }}
          color="text.secondary"
          gutterBottom
        >
          {formattedDateAndTime(ticket.arrival)}
        </Typography>
        <Typography variant="h5" component="div">
          {ticket.seats.length > 1
            ? `Seats: ${ticket.seats.map((seat) => seat.number)}`
            : `Seat: ${ticket.seats.map((seat) => seat.number)}`}
        </Typography>
        <Typography variant="h5" component="div">
          Price: {ticket.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ margin: "0 auto" }}>
        <Button variant="contained" size="small" onClick={() => navigate("/")}>
          Back to home
        </Button>
      </CardActions>
    </Card>
  );
};

export default Receipt;
