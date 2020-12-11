import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Album } from "../album";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton, TextField, List, Typography } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";

export default function Favorites({ data, handleDelete }) {
  const [open, setOpen] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography>
        {data.length === 0
          ? `Choose your favorites from below`
          : "See your populated list of favorites by clicking here"}
      </Typography>
      <IconButton
        ant="outlined"
        color="primary"
        onClick={handleClickOpen}
        disabled={data.length === 0}
      >
        <Favorite />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Your favorite tracks"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Filter your favorites"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              let filtered =
                data.length > 0
                  ? data.filter((item) =>
                      item.artistName
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    )
                  : [];
              setFilteredData(filtered);
              setSearchValue(e.target.value);
            }}
          />
          <List>
            {searchValue.length > 0 &&
              filteredData.length > 0 &&
              filteredData.map((item) => (
                <Album
                  data={item}
                  handleDelete={searchValue.length === 0 && handleDelete}
                />
              ))}
            {searchValue.length > 0 && filteredData.length === 0 && (
              <Typography>No results found for this search.</Typography>
            )}
            {searchValue.length === 0 &&
              data.length > 0 &&
              data.map((item) => (
                <Album data={item} handleDelete={handleDelete} />
              ))}{" "}
            {searchValue.length === 0 && data.length === 0 && (
              <Typography>No data found for this list.</Typography>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
