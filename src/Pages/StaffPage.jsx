import React, { useEffect } from "react";
//MaterialUI
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
//React Router
import { useNavigate } from "react-router-dom";
//Services
import { getAuthStatus } from '../Services/authService';
import logo from '../Assets/logo.png';

function StaffPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    let status = getAuthStatus()
    if(!status) {
      navigate("../login", { replace: true });
    }
  })

  return (
    <div className={classes.root}>
      <img className={classes.img} width={150} height={150} src={logo} alt="Barking Logo" />
      <span className={classes.text}>Staff Page </span>
      <Button
        className={classes.btn}
        sx={{
          backgroundColor: "#f67531",
          margin:2,
          borderRadius:4
        }}
        onClick={()=>{navigate("../staffOrder", { replace: true })}}
        variant="contained"
      >
        Pedidos
      </Button>
      <Button
        className={classes.btn}
        sx={{
          backgroundColor: "#f67531",
          margin:2,
          borderRadius:4
        }}
        variant="contained"
        onClick={()=>{navigate("../config", { replace: true })}}
      >
        Configuracion
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
    position: "absolute",
    overflow: "hidden",
    width:'100%',
    height:'100%',
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 15,
    marginBottom: 15,
  },
  btn: {
    width:150,
    height:75,
  },
  img: {
    margin:15
  }
}));

export default StaffPage;
