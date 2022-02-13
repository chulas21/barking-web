import React, { useEffect, useState } from "react";
//MaterialUI
import { makeStyles } from "@mui/styles";
import WhatsappOutlinedIcon from '@mui/icons-material/WhatsappOutlined';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import MapIcon from '@mui/icons-material/Map';
import Button from '@mui/material/Button';
//Services
import { updateStatus } from '../Services/orderDataService.js';
//Modal
import Modal from 'react-modal';

function OrderCard({ order }) {
  const classes = useStyles();
  const [mapURL, setMapURL] = useState('')
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (order.delivery) {
      setMapURL(`http://maps.google.com/maps?q=loc:${order.location.lat},${order.location.lng}`)
    }
    //eslint-disable-next-line
  },[]);


  return (
    <div className={classes.root}>
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
          <span className={classes.modalHeader}>Productos </span>
          {order.products.map((p) => {
            return (
              <span className={classes.modalText} key={Math.random()}>
                {p.name} - {p.size}
              </span>
            );
          })}
        </div>
      </Modal>
      <div className={classes.clientInfo}>
        <span className={classes.clientText}>{order.client.name}</span>
        <WhatsappOutlinedIcon
          onClick={() => {
            window.open(
              `https://api.whatsapp.com/send?phone=+54${order.client.phone}`
            );
          }}
        />
      </div>
      <div className={classes.orderInfo}>
        <Button
          className={classes.btn}
          sx={{
            color: "#333333",
            fontWeight: "bold",
          }}
          variant="text"
          onClick={() => {
            setModal(true);
          }}
        >
          Ver productos
        </Button>
      </div>
      <div className={classes.deliveryInfo}>
        {order.delivery ? (
          <div className={classes.deliveryInfo}>
            <span className={classes.deliverySpan}>Delivery</span>
            <div>
              <MapIcon
                className={classes.locationIcon}
                onClick={() => {
                  window.open(mapURL);
                }}
              />
              <SendToMobileIcon
                className={classes.locationIcon}
                onClick={() => {
                  window.open(
                    `https://api.whatsapp.com/send?text=Cliente:%20${order.client.name}%0aTelefono:%20${order.client.phone}%0aTotal%20a%20cobrar:%20$${order.total}%0aUbicacion:%20${mapURL}`
                  );
                }}
              />
            </div>
          </div>
        ) : (
          <span className={classes.deliverySpan}>Retiro en sucursal</span>
        )}
      </div>
      <div className={classes.actions}>
        <span className={classes.timeSpan}>{order.time.time}</span>
        <Button
          className={classes.btn}
          sx={{
            backgroundColor: "#333333",
            color: "#f67531",
            margin: 2,
          }}
          variant="contained"
          onClick={() => {
            updateStatus(order, () => {
              window.location.reload();
            });
          }}
        >
          {order.status === "unconfirmed"
            ? "Confirmar"
            : order.status === "confirmed"
            ? "Listo"
            : "Entregado"}
        </Button>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.accent,
    padding: 15,
    margin: 5,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  clientInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  clientText: {
    marginRight: 10,
    fontSize: 20,
    fontWeight: "500",
  },
  deliveryInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    display:"flex",
    flexDirection:'column',
    alignItems: "center",
    justifyContent: "center",
  },
  locationIcon: {
    marginInline: 5,
  },
  btn: {
    width: 150,
    height: 50,
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
  modalText:{
    color:'white',
    fontSize:25,
    fontWeight:'500'
  },
  timeSpan: {
    fontWeight:'500',
    fontSize:25,
    marginTop:10,
  },
  deliverySpan: {
    fontWeight:'500',
    fontSize:20,
    marginBottom:5,
  },
}));

export default OrderCard;
