import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";

const DateAndTimePicker = ({ getTicketID }) => {
  const destinations = useSelector((state) => state.pickedDestinations);

  const [departureDateAndTime, setDepartureDateAndTime] = useState([]);
  const [datePickerValue, setDatePickerValue] = useState(null);
  const [timePickerValue, setTimePickerValue] = useState(null);

  useEffect(() => {
    const availableDateAndTime = destinations.map(
      (dateTime) => dateTime.departure
    );
    setDepartureDateAndTime(availableDateAndTime);

    setDatePickerValue(null);
    setTimePickerValue(null);
  }, [destinations]);

  //Enable only departure date
  const shouldDisableDate = (date) => {
    // Disable dates that don't have a matching time from timePicker
    if (timePickerValue && !datePickerValue) {
      const formattedTime = dayjs(timePickerValue).format("HH:mm");
      const selectedDateTime = `${dayjs(date).format(
        "YYYY-MM-DD"
      )}-${formattedTime}`;

      return !departureDateAndTime.some(
        (enabledDateTime) =>
          selectedDateTime === dayjs(enabledDateTime).format("YYYY-MM-DD-HH:mm")
      );
    }
    // Disable all dates if there are no flights available
    if (departureDateAndTime.length > 0) {
      return !departureDateAndTime.some(
        (enabledDateTime) =>
          dayjs(date).format("YYYY-MM-DD") ===
          dayjs(enabledDateTime).format("YYYY-MM-DD")
      );
    }

    return true;
  };

  const shouldDisableTime = (time, clockType) => {
    if (clockType === "hours") {
      // Disable times that don't have a matching time from datePicker
      if (datePickerValue && !timePickerValue) {
        const disabledHours = departureDateAndTime
          .filter(
            (enabledDateTime) =>
              dayjs(enabledDateTime).format("YYYY-MM-DD") === datePickerValue
          )
          .map((enabledDateTime) => dayjs(enabledDateTime).hour());

        return !disabledHours.includes(dayjs(time).hour());
      }
    } else if (clockType === "minutes") {
      // Disable specific minutes based on the enabled datetimes
      if (datePickerValue) {
        const selectedDate = dayjs(datePickerValue).format("YYYY-MM-DD");
        const selectedTime = dayjs(time).format("HH:mm");
        const isTimeEnabled = departureDateAndTime.some(
          (enabledDateTime) =>
            dayjs(enabledDateTime).format("YYYY-MM-DD HH:mm") ===
            `${selectedDate} ${selectedTime}`
        );
        return !isTimeEnabled;
      }
    }

    // Disable all times if there are no flights available
    if (departureDateAndTime.length > 0) {
      return !departureDateAndTime.some(
        (enabledDateTime) =>
          dayjs(time).format("HH:mm") === dayjs(enabledDateTime).format("HH:mm")
      );
    }
    return true;
  };

  const handleDateChange = (value) => {
    const selectedDate = dayjs(value).format("YYYY-MM-DD");
    setDatePickerValue(selectedDate);
  };

  useEffect(() => {
    const selectedTime = dayjs(timePickerValue).format("HH:mm:ss");
    const selectedDateAndTime = `${datePickerValue}T${selectedTime}`;

    const selectedDestination = destinations.find(
      (destination) => destination.departure === selectedDateAndTime
    );

    const resultTicketID = selectedDestination
      ? String(selectedDestination.id)
      : "";
    if (resultTicketID) {
      getTicketID(resultTicketID);
    }
  }, [timePickerValue, datePickerValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction="column"
        spacing={2}
        sx={{ width: "300px", margin: "1rem auto" }}
      >
        <DatePicker
          disabled={!departureDateAndTime.length}
          label="Date"
          format={"DD.MM.YYYY"}
          value={datePickerValue}
          onChange={handleDateChange}
          shouldDisableDate={shouldDisableDate}
        />
        <TimePicker
          disabled={!departureDateAndTime.length}
          label="Time"
          value={timePickerValue}
          format={"HH:mm"}
          onChange={(newValue) => setTimePickerValue(newValue)}
          shouldDisableTime={shouldDisableTime}
          ampm={false}
          views={["hours", "minutes"]}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DateAndTimePicker;
