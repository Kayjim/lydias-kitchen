import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import OrderTypeForm from './OrderTypeForm';
import DeliveryDetailsForm from './DeliveryDetailsForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import validateForms from '../helpers/FormValidation';
import turnOffOtherOptions from '../helpers/EventCheckBoxes';
import clearData from '../helpers/ClearExtraData';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Lydia's Kitchen
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  activeStep: {
    color: '#6A8A82',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: '#A7414A',
    '&:hover': {
      backgroundColor: '#6A8A82',
    },
  },
}));

const Checkout = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const cart = JSON.parse(sessionStorage.getItem('cart'));
  const [data, setData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [backFromDelivery, setBackFromDelivery] = useState(false);

  let cartTotal = 0;

  if (cart !== null && typeof (cart) !== 'undefined' && cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      cartTotal += cart[i].price;
    }
  }

  useEffect(() => {
    switch (alertType) {
      case 'error':
        toast.error(alertMessage,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressbar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          }
        );
        break;
      case 'success':
        toast.success(alertMessage,
          {
            position: "top-center",
            autoClose: 4000,
            hideProgressbar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          }
        );
        break;
    }
    setAlertType('');
  }, [alertType]);

  const handleCTA = (e) => {
    let currentData = data;
    if (e.currentTarget.id === 'yes') {
      currentData['isCurrentEvent'] = true;
    } else {
      currentData['isCurrentEvent'] = false;
    }
    setData(currentData);
    setHasAnswered(true);
  }

  const handleNext = () => {
    setAlertType('');
    let validationResp = validateForms(activeStep, data);
    if (validationResp.success === true) {
      switch (activeStep) {
        case (0):
          setActiveStep(activeStep + 1);
          break;
        case (4):
          sendOrder();
          break;
        default:
          setActiveStep(activeStep + 1);
          break;
      }
    }
    else {
      setAlertMessage(validationResp.msg);
      setAlertType(validationResp.alertType);
    }
  };

  const handleBack = () => {
    let currentData = data;
    switch (activeStep) {
      case (0):
        break;
      case (1):
        setBackFromDelivery(false);
        break;
      case (2):
        setBackFromDelivery(true);
        break;
      case (3):
        break;
      case (4):
        break;
    }
    setActiveStep(activeStep - 1);
    setData(currentData);
  };

  const handleChange = (e) => {
    const key = e.target.id;
    let value = '';
    switch (e.currentTarget.type) {
      case ('checkbox'):
        value = e.currentTarget.checked;
        setData(turnOffOtherOptions(e.currentTarget.id, data));
        break;
      case ('text'):
        value = e.currentTarget.value;
        break;
      case ('textarea'):
        value = e.currentTarget.value;
        break;
      case ('radio'):
        value = e.currentTarget.value;
        setData(clearData(e.currentTarget.id, data));
        break;
    }
    let currentData = data;
    currentData[key] = value;
    setData(currentData);
    console.log(currentData);
  }

  const steps = ['Basic Information', 'Order Type', 'Delivery Details', 'Payment details', 'Review your order'];

  function getStepContent(step, cart) {
    switch (step) {
      case 0:
        return <AddressForm data={data} handleChange={handleChange} />;
      case 1:
        return <OrderTypeForm data={data} backFromDelivery={backFromDelivery} data={data} handleChange={handleChange} removeFromCart={props.removeFromCart} addToCart={props.addToCart} handleCTA={handleCTA} />;
      case 2:
        return <DeliveryDetailsForm data={data} handleChange={handleChange} />;
      case 3:
        return <PaymentForm data={data} handleChange={handleChange} />;
      case 4:
        return <Review data={data} cartTotal={cartTotal} cart={cart} />;
      default:
        throw new Error('Unknown step');
    }
  }

  // const validateForms = (formId) => {

  //   switch(formId){
  //     case('address-form'):
  //       validateContactInfo();
  //   }

  // }

  //   const validateContactInfo = () => {
  //     let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //     setAlertType('');
  //     if (firstName === "" || lastName === "" || email === "" || address1 === "" || city === "" || state === "" || zip === "") {
  //       setAlertMessage('Fill out all required fields and try again.');
  //       setAlertType('error');
  //       return false;
  //     }
  //     else if(!emailReg.test(email)) {
  //       setAlertType('error');
  //       setAlertMessage('Please provide a valid email format.');
  //       return false;
  //     }
  //      else {
  //       return true;
  //     }
  //   }

  const sendOrder = e => {
    axios.post('https://lydias-kitchen.herokuapp.com/3/sendOrder', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      firstName: data.fname,
      lastName: data.lname,
      email: data.email,
      phone: data.phone,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      state: data.state,
      zip: data.zip,
      cart: cart,
      total: cartTotal
    }).then(res => {
      if (!res.status === 200) {
        setAlertType('error');
        setAlertMessage(res.status + ' : ' + res.statusText);
        return;
      }
      return res;
    }).then(data => {
      setAlertType('success');
      setAlertMessage('Thanks for your order! You will receive a confirmation email shortly.');
      return data;
    }).catch(err => {
      setAlertType('error');
      setAlertMessage(err);
      return;
    });

  };
  /*must check for null & length > 0 cause if we create a cart in session 
  and then remove all items from cart, the session variable is still existing
  therefor, cart !== null will be true, and if we don't check length then we will
  not get correct validation
  */
  return (cart !== null && cart.length > 0 ?
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel StepIconProps={{ classes: { active: classes.activeStep } }}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  {getStepContent(activeStep, cart)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    {(activeStep === 1 && hasAnswered === false) ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                      </Button>
                    ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                        </Button>
                      )
                    }
                  </div>
                </React.Fragment>
              )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
    : <Redirect to='/noCart' />
  );
}

export default Checkout;