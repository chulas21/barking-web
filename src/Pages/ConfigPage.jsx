import React, { useEffect } from "react";
//MaterialUI
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//React Router
import { useNavigate } from "react-router-dom";
//Services
import { getAuthStatus } from "../Services/authService.js";
import logo from "../Assets/logo.png";

function ConfigPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    let status = getAuthStatus();
    if (!status) {
      navigate("../login", { replace: true });
    }
  });
  return (
    <div className={classes.root}>
      <img
        className={classes.img}
        width={150}
        height={150}
        src={logo}
        alt="Barking Logo"
      />
      <span className={classes.text}>Configuración General</span>
      <Button
        className={classes.btn}
        sx={{
          backgroundColor: "#f67531",
          margin: 2,
          borderRadius: 4,
        }}
        variant="contained"
      >
        Horarios
      </Button>
      <Button
        className={classes.btn}
        sx={{
          backgroundColor: "#f67531",
          margin: 2,
          borderRadius: 4,
        }}
        variant="contained"
      >
        Productos
      </Button>
      <Button
        className={classes.btnBack}
        sx={{
          backgroundColor: "#f67531",
          margin: 2,
          borderRadius: 4,
        }}
        variant="contained"
        onClick={()=>{ navigate("../staff", { replace: true }); }}
      >
        <div className={classes.btnInside}>
          <ArrowBackIcon />
          Volver
        </div>
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
  btnBack: {
    width:150,
    height:40,
  },
  btnInside: {
    width:'100%',
    display:'flex',
    justifyContent:'space-evenly'
  },
  img: {
    margin:15
  }
}));

export default ConfigPage;
