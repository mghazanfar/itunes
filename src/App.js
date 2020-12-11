import "./App.css";
import { Box, Typography, IconButton } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import SelectArtist from "./components/searchArtists";
import Favorites from "./components/favourites";
import { useState } from "react";

function App() {
  const [favorites, setFavorites] = useState([]);
  return (
    <div className="App">
      <Box padding={24} pt={2}>
        <Typography variant="h1" component="h2" gutterBottom>
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

export default App;
