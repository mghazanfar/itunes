import "./App.css";
import { Box, Typography, IconButton, withWidth } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import SelectArtist from "./components/searchArtists";
import Favorites from "./components/favourites";
import { useState } from "react";

function App({ width }) {
  const [favorites, setFavorites] = useState([]);
  const isLarge = width === "lg" || width === "xl";
  return (
    <div className="App">
      <Box padding={isLarge ? 24 : 8} pt={isLarge && 2}>
        <Typography
          variant={isLarge ? "h1" : ""}
          component={isLarge && "h2"}
          gutterBottom
        >
          iTunes Search App
        </Typography>
        <Favorites
          data={favorites}
          handleDelete={(id) => {
            let items = [...favorites].filter(
              (item) => item.collectionId !== id
            );
            setFavorites(items);
          }}
        />

        <SelectArtist
          handleFavourite={(item) => {
            let items = [...favorites, item];
            items = [...new Set(items)];
            setFavorites(items);
          }}
          favorites={favorites}
        />
      </Box>
    </div>
  );
}

export default withWidth()(App);
