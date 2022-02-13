import React from "react";
//MaterialUI
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
//React Router
import { useNavigate } from "react-router-dom";
import logo from '../Assets/logo.png';

function HomePage() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <img className={classes.img} width={150} height={150} src={logo} alt="Barking Logo" />
      <Button
        className={classes.btn}
        sx={{
          backgroundColor: "#f67531",
        }}
        variant="contained"
        onClick={()=>{navigate('order')}}
      >
        Realizar pedido
      </Button>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    position: "absolute",
    left: 0,
    width: "100%",
    overflow: "hidden",
  },
  img: { margin: 15 },
}));

export default HomePage;
