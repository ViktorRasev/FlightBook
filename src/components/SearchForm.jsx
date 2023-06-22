import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const SearchForm = () => {
  const isLoaded = useSelector((posts) => posts.flights.loading);
  const data = useSelector((posts) => posts.flights.flights);

  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  let cities = [];
  if (isLoaded) {
    cities = [ ...new Set(data.map((item) => item.from))]; // Filter duplicates
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

  return (
    <div>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={cities}
        onChange={handleFromSelectedOption}
        renderInput={(params) => <TextField {...params} label="From" />}
      />
      {filteredDestinations.length ? (
        <Autocomplete
          id="free-solo-demo"
          value={toValue}
          freeSolo
          options={filteredDestinations}
          onChange={handleToSelectedOption}
          renderInput={(params) => <TextField {...params} label="To" />}
        />
      ) : null}

      {/*<div>{cities.map(city => <span>{city}</span>)}</div>*/}
    </div>
  );
};

export default SearchForm;
