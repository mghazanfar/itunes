import React, { useEffect } from "react";
import Axios from "axios";
import { useDebounce } from "use-debounce";
import { TextField, Box, CircularProgress, List } from "@material-ui/core";
import { Album } from "../album";

export default function SelectArtist({ handleFavourite, favorites }) {
  const [value, setValue] = React.useState("");
  const [textToSearch] = useDebounce(value, 1000);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (textToSearch.length > 0) {
      setLoading(true);
      setOptions([]);

      Axios.get(
        `https://itunes.apple.com/search?term=${textToSearch}&media=audiobook`
      )
        .then((res) => {
          setLoading(false);
          let options = res.data.results;
          debugger;
          setOptions(options);
        })
        .catch((err) => setLoading(false));
    }
  }, [textToSearch]);

  return (
    <Box>
      <TextField
        label={"Search for an artist"}
        margin="normal"
        color="secondary"
        variant="outlined"
        fullWidth
        autoFocus
        onChange={(e) => setValue(e.target.value)}
      />
      {loading && (
        <CircularProgress color="primary" size={"80px"} thickness={5} />
      )}
      <List>
        {options.length > 0 &&
          options.map((item, i) => (
            <Album
              data={item}
              index={i}
              handleFavourite={handleFavourite}
              favorites={favorites}
            />
          ))}
      </List>
    </Box>
  );
}
