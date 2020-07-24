import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import CurrentEventForm from './CurrentEventForm';
import SpecialRequestForm from './SpecialRequestForm';

import './OrderType.css';

export default function OrderTypeForm(props) {

    const [currentEvent, setCurrentEvent] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        if(props.backFromDelivery){
            setIsFirstRender(false);
            if(props.data['isCurrentEvent']){
                setCurrentEvent(true);
            }
            else {
                setCurrentEvent(false);
            }
        }
    }, []); 

    const useStyles = makeStyles(theme => ({
        button: {
          marginTop: theme.spacing(3),
          marginLeft: theme.spacing(1),
          backgroundColor: '#A7414A',
          '&:hover': {
            backgroundColor:'#6A8A82',
          },
        },
      }));

    const handleYesClick = (e) => {
        setCurrentEvent(true);
        setIsFirstRender(false);
        props.handleCTA(e);
    };

    const handleNoClick = (e) => {
        setCurrentEvent(false);
        setIsFirstRender(false);
        props.handleCTA(e);
    };

    const classes = useStyles();

    return (
        <div className='checkout-review__ctr'>
            {
            isFirstRender === true ? 
            (
            <div className='cta-container'>
                <div className='cta-dialogue__container'>
                    <h3>Is this order related to the current Lydia's Kitchen Event?</h3>
                </div>
                <div className='cta-btns__container'>
                    <Button id='yes' onClick={handleYesClick} label="Yes" className={classes.button}>
                        Yes
                    </Button>
                    <Button id='no' onClick={handleNoClick} className={classes.button}>
                        No
                    </Button>
                </div>
            </div>
            ) : 
            (
                currentEvent === true ? 
                <CurrentEventForm data={props.data} handleChange={props.handleChange} /> : 
                <SpecialRequestForm data={props.data} handleChange={props.handleChange} />
            )
            }
        </div>
    );
}
