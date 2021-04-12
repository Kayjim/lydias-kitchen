import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import OrderTypeForm from './OrderTypeForm';
import DeliveryDetailsForm from './DeliveryDetailsForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { toast } from 'react-toastify';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import validateForms from '../helpers/FormValidation';
import turnOffOtherOptions from '../helpers/EventCheckBoxes';
import clearData from '../helpers/ClearExtraData';

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
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexWrap: 'wrap',
    }
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
  const [hasAnswered, setHasAnswered] = useState(false);
  const [backFromDelivery, setBackFromDelivery] = useState(false);

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
      toast.error(validationResp.msg, {
        position: toast.POSITION.TOP_CENTER
      });
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
  }

  const steps = ['Basic Information', 'Order Type', 'Delivery Details', 'Payment details', 'Review your order'];

  function getStepContent(step, cart) {
    switch (step) {
      case 0:
        return <AddressForm data={data} handleChange={handleChange} />;
      case 1:
        return <OrderTypeForm data={data} backFromDelivery={backFromDelivery} data={data} handleChange={handleChange} handleCTA={handleCTA} />;
      case 2:
        return <DeliveryDetailsForm data={data} handleChange={handleChange} />;
      case 3:
        return <PaymentForm data={data} handleChange={handleChange} />;
      case 4:
        return <Review data={data} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const sendOrder = e => {
    //axios.post('https://lydias-kitchen.herokuapp.com/3/sendOrder', {
    try {
      axios.post('https://lydias-kitchen.herokuapp.com/3/sendOrder', {

        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }).then(res => {
        if (!res.status === 200) {
          toast.error(res.status + ' : ' + res.statusText, {
            position: toast.POSITION.TOP_CENTER
          });
          return;
        }
        return res;
      }).then(data => {
        toast.success('Thanks for your order! You will receive a confirmation email shortly.', {
          position: toast.POSITION.TOP_CENTER
        });
        return data;
      }).catch(err => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      });
    } catch (err) {
      console.log(err)
    }
  };
  /*must check for null & length > 0 cause if we create a cart in session 
  and then remove all items from cart, the session variable is still existing
  therefor, cart !== null will be true, and if we don't check length then we will
  not get correct validation
  */
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            5 Steps to Complete Your Order
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
      </main>
    </React.Fragment>
  );
}

export default Checkout;