import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
//MaterialUI
import { makeStyles } from "@mui/styles";
//Services
import {getOrder} from '../Services/orderDataService.js';
//Lottie
import Lottie from 'react-lottie';
import confirmation from '../Assets/confirmation.json';
import burger from '../Assets/burger.json';
import delivery from  '../Assets/delivery.json';
import ready from '../Assets/ready.json';

function OrderStatusPage() {
  const classes = useStyles();
  const { orderID } = useParams();
  const [order,setOrder] = useState({});

  useEffect(()=>{
    getOrder(orderID,(o)=>{
      setOrder(o);
    })
  },[orderID])

  return (
    <div className={classes.root}>
      {order.status === "unconfirmed" ? (
        <div className={classes.statusContainer}>
          <div className={classes.header}>Tu pedido fue enviado!</div>
          <div className={classes.hint}>Guarda este link para seguir el estado de tu pedido!</div>
          <Lottie
            options={{
              loop: false,
              autoplay: true,
              animationData: confirmation,
            }}
            height={200}
            width={200}
          />
        </div>
      ) : order.status === "confirmed" ? (
        <div className={classes.statusContainer}>
          <span className={classes.header}>
            Tu pedido esta siendo preparado!
          </span>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: burger,
            }}
            height={200}
            width={200}
          />
        </div>
      ) : order.status === "ready" ? (
        order.delivery === true ? (
          <div className={classes.statusContainer}>
            <span className={classes.header}>Tu pedido esta en camino!</span>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: delivery,
              }}
              height={200}
              width={200}
            />
          </div>
        ) : (
          <div className={classes.statusContainer}>
            <span className={classes.header}>
              Tu pedido esta listo para retirar!
            </span>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: ready,
              }}
              height={200}
              width={200}
            />
          </div>
        )
      ) : (
        <span className={classes.header}>Tu pedido fue entregado</span>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',
    position: 'absolute',
    overflow: 'hidden',
    width:'100%',
    height:'100%',
  },
  header:{
    fontSize:35,
    fontWeight:'bold',
    marginBottom:10,
    color: theme.palette.accent
  },
  hint:{
    fontSize:15,
    fontWeight:'400',
    marginBottom:2,
    paddingInline:5,
    color: theme.palette.accent,
  },
  statusContainer:{
    paddingInline:10,
    textAlign:'center'
  }
}));


export default OrderStatusPage
