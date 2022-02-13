import React from "react";
//MaterialUI
import { makeStyles } from "@mui/styles";
//GoogleMaps
import { GoogleMap, LoadScript } from '@react-google-maps/api';

function MapModal({onSelect}) {
  const classes = useStyles();
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: -31.5376519,
    lng: -68.5195459,
  };

  return (
    <div className={classes.root}>
      <LoadScript googleMapsApiKey="AIzaSyCRzjBS-ka0RSCdK3VvtvZEMoBBxg4AgD4">
        <GoogleMap
          onClick={(e) => {
            onSelect(e.latLng.toJSON())
          }}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.bgColor,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  img: { margin: 15 },
}));

export default MapModal;
