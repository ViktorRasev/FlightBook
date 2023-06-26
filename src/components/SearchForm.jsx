import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPickedDestinations } from "../features/pickedDestinationsReducer";
import { Stack } from "@mui/material";

const SearchForm = () => {
  const isLoaded = useSelector((posts) => posts.flights.loading);
  const data = useSelector((posts) => posts.flights.flights);
  const dispatch = useDispatch();

  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  let cities = [];
  if (isLoaded) {
    cities = [...new Set(data.map((item) => item.from))]; // Filter duplicates
  }

  const handleFromSelectedOption = (event, value) => {
    setFromValue(value);
    setToValue("");
  };

  const filteredCities = () => {
    const destinations = data
      .filter((item) => item.from === fromValue)
      .map((item) => item.to);

    setFilteredDestinations([...new Set(destinations)]); // Filter duplicates
  };

  useEffect(() => {
    filteredCities();
  }, [fromValue]);

  const handleToSelectedOption = (event, value) => {
    setToValue(value);
  };

  useEffect(() => {
    if (fromValue && toValue) {
      const pickedDestinations = data.filter(
        (city) => city.from === fromValue && city.to === toValue
      );
      dispatch(setPickedDestinations(pickedDestinations));
    } else {
      dispatch(setPickedDestinations([]));
    }
  }, [fromValue, toValue, data]);

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ width: "300px", margin: "1rem auto" }}
    >
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={cities}
        onChange={handleFromSelectedOption}
        renderInput={(params) => <TextField {...params} label="From" />}
      />
      <Autocomplete
        disabled={!filteredDestinations.length}
        id="free-solo-demo"
        value={toValue}
        freeSolo
        options={filteredDestinations}
        onChange={handleToSelectedOption}
        renderInput={(params) => <TextField {...params} label="To" />}
      />
    </Stack>
  );
};

export default SearchForm;
