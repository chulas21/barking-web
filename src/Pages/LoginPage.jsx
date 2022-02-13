import React from "react";
//MaterialUI
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
//React Router
import { useNavigate } from "react-router-dom";
//Services
import { googleAuth } from '../Services/authService.js';

import logo from '../Assets/logo.png';

function LoginPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <img width={150} height={150} src={logo} alt="Barking Logo" />
      <span className={classes.text}>Staff login </span>
      <Button
        className={classes.btn}
        sx={{
          backgroundColor: "#f67531",
        }}
        variant="contained"
        onClick={() => {
          googleAuth(() => {
            navigate("../staff", { replace: true });
          });
        }}
      >
        Iniciar sesion
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
  btn:{
    marginTop:15
  },
  text:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:25,
    marginTop: 15,
    marginBottom:15,
  },
}));

export default LoginPage;
