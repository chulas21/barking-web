import React, { useEffect, useState } from "react";
//MaterialUI
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//React Router
import { useNavigate } from "react-router-dom";
//Services
import { getAuthStatus } from "../Services/authService.js";
import logo from "../Assets/logo.png";
//Modal
import Modal from 'react-modal';
//Services
import {getTimes,updateTimeStatus,resetCount} from "../Services/orderDataService.js";

function ConfigPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    getTimes((data) => {
      setTimes(data);
    });
  }, []);

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
        onClick={() => {
          setModal(true);
        }}
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
        onClick={() => {
          navigate("../staff", { replace: true });
        }}
      >
        <div className={classes.btnInside}>
          <ArrowBackIcon />
          Volver
        </div>
      </Button>
      <Modal
        isOpen={modal}
        onRequestClose={() => {
          setModal(false);
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(51,51,51,0.9)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f67531",
          },
        }}
      >
        <div className={classes.modalRoot}>
          <span className={classes.modalHeader}>Horarios</span>
          {times.map((t) => {
            return (
              <div>
                <Switch
                  checked={t.active}
                  color="default"
                  onClick={() => {
                    updateTimeStatus(t);
                  }}
                />
                <span>{t.time}</span>
              </div>
            );
          })}
          <Button
            className={classes.btnBack}
            sx={{
              padding: 5,
              backgroundColor: "#333",
              margin: 2,
              color: "white",
              borderRadius: 4,
            }}
            onClick={() => {
              resetCount();
            }}
            variant="contained"
          >
            Reiniciar horarios
          </Button>
        </div>
      </Modal>
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
    width: 150,
    height: 75,
  },
  btnBack: {
    width: 150,
    height: 40,
  },
  btnInside: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
  },
  img: {
    margin: 15,
  },
  modalRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    color: "#333333",
    fontWeight: "700",
    fontSize: 30,
    marginBottom: 20,
  },
}));

export default ConfigPage;
