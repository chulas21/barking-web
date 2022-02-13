import React, { useState, useEffect } from "react";
//MaterialUI
import {makeStyles} from "@mui/styles";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
//Services
import { getClientInfo, newClient } from '../Services/clientsDataService.js';
import { getProducts } from '../Services/productsDataService.js';
import { sendOrder, getTimes, checkTime } from '../Services/orderDataService.js';
//Toast
import toast from 'react-hot-toast';
//Navigation
import { useNavigate } from "react-router-dom";
//Modal
import Modal from 'react-modal';
import MapModal from '../Components/MapModal.jsx';

function OrderPage() {
  //====================  STATE VARIABLEs  =====================//
  const classes = useStyles();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [order, setOrder] = useState({ products: [], total: 0 });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [delivery, setDelivery] = useState(false);
  const [location, setLocation] = useState({lat: '', lon: ''})
  const [modal, setModal] = useState(false);
  const [times, setTimes] = useState([]);
  const [selectedTime,setSelectedTime] = useState("");
  const [clientInfo, setClientInfo] = useState({ name: "", phone: "" });
  const [burgerSize, setBurgerSize] = useState("simple");
  //====================  TEXT INPUT ONCHANGE  =====================//
  const handleInputChange = (e) => {
    let val = e.target.value;
    let newValues = { ...clientInfo };
    switch (e.target.id) {
      case "nameField":
        newValues.name = val;
        break;
      case "phoneField":
        newValues.phone = val;
        break;
      default:
        break;
    }
    setClientInfo(newValues);
  };
  //====================  SEARCH USER  =====================//
  const searchUser = () => {
    let phone = clientInfo.phone;
    getClientInfo(phone, (c) => {
      setClientInfo(c);
    });
  };
  //====================  HANDLE SELECTOR CHANGE  =====================//
  const handleSelectorChange = (e) => {
    switch (e.target.name) {
      case "product":
        setSelectedProduct(e.target.value);
        break;
      case "time":
        setSelectedTime(e.target.value);
        break;
      default:
        break;
    }
  };
  //====================  HANDLE PRODUCT ADDING  =====================//
  const handleProductAdding = () => {
    if (selectedProduct !== 0) {
      let newOrder = { ...order };
      let oldTotal = newOrder.total;

      switch (burgerSize) {
        case "simple":
          selectedProduct.price = selectedProduct.simplePrice;
          selectedProduct.size = "simple";
          break;
        case "double":
          selectedProduct.price = selectedProduct.doublePrice;
          selectedProduct.size = "doble";
          break;
        case "triple":
          selectedProduct.price = 570;
          selectedProduct.size = "triple";
          break;
        default:
          break;
      }

      let newTotal = oldTotal + selectedProduct.price;
      newOrder.products.push(selectedProduct);
      newOrder.total = newTotal;
      setOrder(newOrder);
      setSelectedProduct(0);
      setBurgerSize('simple');
      toast.success("Producto cargado!", { position: "bottom-center" });
    } else toast.error("Producto invalido!", { position: "bottom-center" });
  };
  //====================  HANDLE PRODUCT CHECK  =====================//
  const handleProductCheck = (e, index, prod) => {
    let checked = e.target.checked;
    let newOrder = order;
    let oldTotal = newOrder.total;
    if (checked) {
      newOrder.products.splice(index, 0, prod);
      newOrder.total = oldTotal + prod.price;
    } else {
      newOrder.products.splice(index, 1);
      newOrder.total = oldTotal - prod.price;
    }
  };
  //====================  HANDLE SIZE CHECK  =====================//
  const handleSizeCheck = (e, size) => {
    let checked = e.target.checked;
    if (checked) {
      setBurgerSize(size);
    } else setBurgerSize("simple");
  };
  //====================  HANDLE DELIVER CHANGE  =====================//
  const handleDeliveryChange = (e) => {

    if (e.target.id === "0") {
      setDelivery(false)
    } else setDelivery(true);
  };
  //====================  VALIDATE CLIENT INFO  =====================//
  const validateClientInfo = () => {
    let validations = {
      name: true,
      phone: true,
    };
    if (!(clientInfo.phone.toString().length >= 7)) {
      validations.phone = false;
    }

    if (validations.name && validations.phone) {
      return true;
    } else return false;
  };
  //====================  FORM STEPS  =====================//
  const steps = [
    {
      label: "Informacion personal",
      description: (
        <div className={classes.firstStep}>
          <div className={classes.dniContainer}>
            <TextField
              required
              id="phoneField"
              onChange={(event) => {
                handleInputChange(event);
              }}
              InputProps={{
                sx: {
                  color: "white",
                },
              }}
              InputLabelProps={{ sx: { color: "#A9A9A9" } }}
              value={clientInfo.phone}
              type="number"
              sx={{ marginBottom: 2 }}
              label="Telefono"
            />
            <Button onClick={searchUser} sx={{ mt: 1, mr: 1 }}>
              Buscar
            </Button>
          </div>
          <TextField
            required
            id="nameField"
            onChange={(event) => {
              handleInputChange(event);
            }}
            value={clientInfo.name}
            InputProps={{ sx: { color: "white" } }}
            InputLabelProps={{ sx: { color: "#A9A9A9" } }}
            sx={{ marginBottom: 2 }}
            label="Nombre y Apellido"
          />
        </div>
      ),
    },
    {
      label: "Agregar productos",
      description: (
        <div className={classes.secondSetp}>
          <FormControl className={classes.select}>
            <InputLabel required id="productLabel">
              Producto
            </InputLabel>
            <Select
              label="Producto"
              name="product"
              id="demo-simple-select"
              value={selectedProduct}
              onChange={handleSelectorChange}
            >
              <MenuItem key={0} value={0}>
                Seleccione producto
              </MenuItem>

              {products.length &&
                products.map((p) => (
                  <MenuItem key={p.key} value={p}>
                    {p.name} - ${p.simplePrice} / ${p.doublePrice}
                  </MenuItem>
                ))}
            </Select>
            {selectedProduct ? (
              <div>
                <div
                  key={selectedProduct.simplePrice}
                  className={classes.productItem}
                >
                  <Checkbox
                    onChange={(e) => {
                      handleSizeCheck(e, "simple");
                    }}
                    checked={burgerSize === "simple"}
                  />
                  <span>{`Simple - $${selectedProduct.simplePrice}`}</span>
                </div>
                <div
                  key={selectedProduct.doublePrice}
                  className={classes.productItem}
                >
                  <Checkbox
                    onChange={(e) => {
                      handleSizeCheck(e, "double");
                    }}
                    checked={burgerSize === "double"}
                  />
                  <span>{`Doble - $${selectedProduct.doublePrice}`}</span>
                </div>
                <div key={570} className={classes.productItem}>
                  <Checkbox
                    onChange={(e) => {
                      handleSizeCheck(e, "triple");
                    }}
                    checked={burgerSize === "triple"}
                  />
                  <span>Triple - $570</span>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <Button
              variant="outlined"
              onClick={handleProductAdding}
              sx={{ mt: 1, mr: 1 }}
            >
              Agregar
            </Button>
          </FormControl>
          <span className={classes.totalText}>Total: ${order.total}</span>
        </div>
      ),
    },
    {
      label: "Confirmar pedido",
      description: (
        <div className={classes.thirdStep}>
          {order.products.length &&
            order.products.map((prod, i) => (
              <div key={i} className={classes.productItem}>
                <Checkbox
                  onChange={(e) => {
                    handleProductCheck(e, i, prod);
                  }}
                  defaultChecked
                />
                <span>{`${prod.name} ${prod.size}- $${prod.price}`}</span>
              </div>
            ))}

          <span className={classes.totalText}>Total: ${order.total}</span>
        </div>
      ),
    },
    {
      label: "Horario",
      description: (
        <div className={classes.fourthStep}>
          <FormControl className={classes.select}>
            <InputLabel required id="timeLabel">
              Horario
            </InputLabel>
            <Select
              label="Horario"
              name="time"
              id="demo-simple-select"
              value={selectedTime}
              onChange={handleSelectorChange}
            >
              <MenuItem key={0} value={""}>
                Seleccione horario
              </MenuItem>
              {times.length &&
                times.map((t) => {
                  if (checkTime(t)) {
                    return (
                      <MenuItem key={t.time} value={t}>
                        {t.time}
                      </MenuItem>
                    );
                  }
                  else return <div></div>
                })}
            </Select>
          </FormControl>
        </div>
      ),
    },
    {
      label: "Finalizar pedido",
      //MAP MARKER URL -> https://www.google.com/maps/search/?api=1&query=36.26577,-92.54324

      description: (
        <div className={classes.lastStep}>
          <Modal
            isOpen={modal}
            onRequestClose={() => {
              setModal(false);
            }}
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
              },
            }}
          >
            <MapModal
              onSelect={(e) => {
                setLocation(e);
                setModal(false);
              }}
            />
          </Modal>
          <div className={classes.productItem}>
            <Checkbox
              onChange={handleDeliveryChange}
              id="0"
              label={"Retiro"}
              checked={!delivery}
            />

            <span>Retiro en sucursal</span>
          </div>
          <div className={classes.productItem}>
            <Checkbox
              onChange={handleDeliveryChange}
              id="1"
              label={"Delivery"}
              checked={delivery}
            />
            <span>Delivery</span>
          </div>
          <TextField
            onClick={() => {
              if (delivery) {
                setModal(true);
              }
            }}
            required
            value={`Lat: ${location.lat} Lon: ${location.lon}`}
            disabled={true}
            id="addressField"
            sx={{ marginBottom: 2 }}
            label="Ubicacion"
          />
        </div>
      ),
    },
  ];
  //====================  FORM NEXT  =====================//
  const handleNext = () => {
    switch (activeStep) {
      case 0:
        if (validateClientInfo()) {
          newClient(clientInfo)
          setActiveStep(1);
        } else toast.error("Revise los datos!", { position: "bottom-center" });
        break;
      case 1:
        if (order.total === 0) {
          toast.error("Debe seleccionar al menos un producto!", {
            position: "bottom-center",
          });
        } else setActiveStep(2);
        break;
      case 2:
        if (order.total === 0) {
          toast.error("Debe seleccionar al menos un producto!", {
            position: "bottom-center",
          });
        } else setActiveStep(3);
        break;
      case 3:
        if (selectedTime === "") {
          toast.error("Debe seleccionar un horario!", {
            position: "bottom-center",
          });
        } else setActiveStep(4);
        break;
      case 4:
        let newOrder = order
        newOrder.client = clientInfo;
        newOrder.delivery = delivery;
        newOrder.time = {time: selectedTime.time, key: selectedTime.key};
        if(delivery) {
          newOrder.location = location
        }
        sendOrder(newOrder, selectedTime, (key) => {
          navigate(`status/${key}`,{replace:true});
        });
        setOrder({ products: [], total: 0 });
        setActiveStep(0);
        break;
      default:
        break;
    }
  };
  //====================  FORM BACK  =====================//
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  //====================  FORM RESET  =====================//
  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    getTimes((data) => {
      setTimes(data)
    })
    getProducts((p) => {
      setProducts(p);
    });
  }, []);

  //====================  MAIN RENDER METHOD  =====================//
  return (
    <div className={classes.root}>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 4 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                <span className={classes.stepLabel}>{step.label}</span>
              </StepLabel>
              <StepContent>
                <Typography component={"span"}>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Enviar" : "Siguiente"}
                    </Button>
                    {index !== 0 && (
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Volver
                      </Button>
                    )}
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width:'100%',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    overflow: 'hidden',
  },
  stepLabel:{
    color:'white'
  },
  input:{
    color:'white'
  },
  select:{
    width:'100%',
  },
  selectItem: {
    backgroundColor:'white'
  },
  secondSetp:{
    display:'flex',
    flexDirection:'column'
  },
  totalText:{
    marginTop:10,
    alignSelf:'center',
    fontSize: 25,
    color:'#A9A9A9'
  }
}));

export default OrderPage;
