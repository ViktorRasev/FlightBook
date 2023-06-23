import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


const Calendar = () => {
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
    // Disable dates that don't have a matching time
    if (timePickerValue && !datePickerValue) {
      const selectedDateTime = `${dayjs(date).format(
        "YYYY-MM-DD"
      )}-${timePickerValue}`;

      return !departureDateAndTime.some(
        (enabledDateTime) =>
          selectedDateTime === dayjs(enabledDateTime).format("YYYY-MM-DD-HH-mm")
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

  const shouldDisableTime = (time) => {
    // Disable times that don't have a matching date
    if (datePickerValue && !timePickerValue) {
      const selectedDateTime = `${datePickerValue}-${dayjs(time).format(
        "HH-mm"
      )}`;

      return !departureDateAndTime.some(
        (enabledDateTime) =>
          selectedDateTime === dayjs(enabledDateTime).format("YYYY-MM-DD-HH-mm")
      );
    }
    // Disable all times if there are no flights available
    if (departureDateAndTime.length > 0) {
      return !departureDateAndTime.some(
        (enabledDateTime) =>
          dayjs(time).format("HH-mm") === dayjs(enabledDateTime).format("HH-mm")
      );
    }

    return true;
  };

  const handleDateChange = (value) => {
    const selectedDate = dayjs(value).format("YYYY-MM-DD");
    setDatePickerValue(selectedDate);
  };

  const handleTimeChange = (value) => {
    setTimePickerValue(dayjs(value).format("HH-mm"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Basic date picker"
        format={"DD.MM.YYYY"}
        value={datePickerValue}
        onChange={handleDateChange}
        shouldDisableDate={shouldDisableDate}
      />
      <TimePicker
        label="Basic time picker"
        value={timePickerValue}
        format={"HH:mm"}
        onChange={handleTimeChange}
        shouldDisableTime={shouldDisableTime}
        ampm={false}
        minutesStep={15}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
