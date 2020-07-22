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
      backgroundColor:'#6A8A82',
    },
  },
}));

const Checkout = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const cart = JSON.parse(sessionStorage.getItem('cart'));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);

  let cartTotal = 0;

  if(cart !== null && typeof(cart) !== 'undefined' && cart.length > 0){
    for(let i = 0; i<cart.length; i++){
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

  const handleCTA = () => {
    setHasAnswered(true);
  }

  const handleNext = () => {
    switch (activeStep) {
      case (0):
        if (validateContactInfo()) {
          setActiveStep(activeStep + 1);
        }
        break;
      case (4):
        sendOrder();
        break;
      default:
        setActiveStep(activeStep + 1);
        break;
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case ('fname'):
        setFirstName(e.target.value);
        break;
      case ('lname'):
        setLastName(e.target.value);
        break;
      case ('email'):
        setEmail(e.target.value);
        break;
      case ('phone'):
        setPhone(e.target.value);
        break;
      case ('address1'):
        setAddress1(e.target.value);
        break;
      case ('address2'):
        setAddress2(e.target.value);
        break;
      case ('city'):
        setCity(e.target.value);
        break;
      case ('state'):
        setState(e.target.value);
        break;
      case ('zip'):
        setZip(e.target.value);
        break;
    }
  }

  const steps = ['Basic Information', 'Order Type','Delivery Details', 'Payment details', 'Review your order'];

  function getStepContent(step, cart) {
    switch (step) {
      case 0:
        return <AddressForm handleChange={handleChange} />;
      case 1:
        return <OrderTypeForm removeFromCart={props.removeFromCart} addToCart={props.addToCart} handleCTA={handleCTA} />;
      case 2:
        return <DeliveryDetailsForm />;
      case 3:
        return <PaymentForm />;
      case 4:
        return <Review cartTotal={cartTotal} cart={cart} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const validateContactInfo = () => {
    let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setAlertType('');
    if (firstName === "" || lastName === "" || email === "" || address1 === "" || city === "" || state === "" || zip === "") {
      setAlertMessage('Fill out all required fields and try again.');
      setAlertType('error');
      return false;
    }
    else if(!emailReg.test(email)) {
      setAlertType('error');
      setAlertMessage('Please provide a valid email format.');
      return false;
    }
     else {
      return true;
    }
  }

  const sendOrder = e => {
    axios.post('https://lydias-kitchen.herokuapp.com/3/sendOrder', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zip: zip,
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
                  <StepLabel StepIconProps={{classes: { active: classes.activeStep }}}>{label}</StepLabel>
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