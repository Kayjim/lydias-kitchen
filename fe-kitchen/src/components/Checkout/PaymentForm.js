import React,{ useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import './PaymentForm.css'

export default function PaymentForm() {

    const [payment, setPayment] = React.useState('');

    const handlePaymentClick = e => {
        setPayment(e.target.value);
    };

    return (
        <div className='checkout-review__ctr'>
            <form id='billing-details__form'>
                <div className='payment-options__ctr'>
                    <h4>Preferred Payment Method</h4>
                    <RadioGroup className='payment-options' name='paymentOptions' value={payment} onChange={handlePaymentClick}>
                        <FormControlLabel
                                control={ <Radio 
                                className='radio' 
                                color='primary'
                                name='zelleRadio'
                                value='zelle'
                                /> }
                            className='zelle-label'
                            label='Zelle'
                        />
                        <FormControlLabel
                                control={ <Radio 
                                className='radio' 
                                color='primary'
                                name='venmoRadio'
                                value='venmo'
                                /> }
                            className='venmo-label'
                            label='Venmo'
                        />
                        <FormControlLabel
                                control={ <Radio 
                                className='radio' 
                                color='primary'
                                name='paypalRadio'
                                value='paypal'
                                /> }
                            className='paypal-label'
                            label='Paypal Friend'
                        />
                        <FormControlLabel
                                control={ <Radio 
                                className='radio' 
                                color='primary'
                                name='codRadio'
                                value='cod'
                                /> }
                            className='cod-label'
                            label='Cash on Delivery'
                        />
                    </RadioGroup>
                    <h4>The account chosen above can be found using the below account name or email:</h4>
                    <TextField 
                        id='acctInfo'
                        placeholder='AccountName or Email'
                    /> 
                </div>
            </form>
        </div>
    );
}
