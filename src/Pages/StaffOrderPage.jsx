import React, { useEffect, useState } from "react";
//MaterialUI
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//React Router
import { useNavigate } from "react-router-dom";
//Services
import { getAuthStatus } from '../Services/authService';
import { getOrders } from '../Services/orderDataService';
//Components
import OrderCard from '../Components/OrderCard';

function StaffOrderPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([])
   
  const compare = (a,b) => {
    if(a.time.key < b.time.key) {
      return -1
    }
    if(a.time.key > b.time.key) {
      return 1
    }
    return 0
  }

  useEffect(() => {
    getOrders((data) => {
      setOrders(data.sort(compare));
      console.log(data);
    });

    let status = getAuthStatus();
    if (!status) {
      navigate("../login", { replace: true });
    }
  },[navigate]);

  return (
    <div className={classes.root}>
      <span className={classes.text}>Staff Order Page </span>
      <div className={classes.ordersContainer}>
        {orders.map((o) => {
          return <OrderCard key={o.key} order={o} />;
        })}
      </div>
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
    position: "absolute",
    left:0,
    width:'100%',
  },
  ordersContainer: {
    display: "flex",
    height:'80%',
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 15,
    marginBottom: 15,
  },
  btnBack: {
    width: 200,
    height: 40,
  },
  btnInside: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

export default StaffOrderPage;
