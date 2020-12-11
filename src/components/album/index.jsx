import React from "react";
import {
  Typography,
  Box,
  ListItemAvatar,
  Avatar,
  ListItem,
  ListItemText,
  Divider,
  Link,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Favorite, Delete } from "@material-ui/icons";

export const Album = ({ data, handleFavourite, favorites, handleDelete }) => {
  const {
    collectionName,
    artworkUrl100,
    primaryGenreName,
    country,
    currency,
    artistName,
    trackViewUrl,
    trackId,
    collectionId,
  } = data;
  return (
    <Link href={trackViewUrl} target="_blank">
      <ListItem alignItems="flex-start" button>
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src={artworkUrl100}
            style={{ width: 100, height: 100, marginRight: 16 }}
            variant="rounded"
          />
        </ListItemAvatar>
        <ListItemText
          primary={collectionName}
          secondary={
            <Box>
              <Typography component="span" variant="body2" color="textPrimary">
                Genre: {primaryGenreName}
              </Typography>
              <Box>Artist: {artistName}</Box>
              <Box>Currency: {currency}</Box>
              <Box>Country: {country}</Box>
            </Box>
          }
        />
        {handleFavourite && (
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(e) => {
                e.preventDefault();
                handleFavourite(data);
              }}
              color={
                favorites.length > 0 &&
                favorites.filter((item) => item.collectionId === collectionId)
                  .length > 0
                  ? "secondary"
                  : "default"
              }
            >
              <Favorite />
            </IconButton>
          </ListItemSecondaryAction>
        )}
        {handleDelete && (
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              onClick={(e) => {
                e.preventDefault();
                handleDelete(data.collectionId);
              }}
            >
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <Divider />
    </Link>
  );
};
