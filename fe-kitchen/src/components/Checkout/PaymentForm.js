import React,{ useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import './PaymentForm.css'

export default function PaymentForm(props) {

    const [payment, setPayment] = useState('');


    useEffect(() => {
        if(props.data.zelle)
            setPayment('zelle');
        if(props.data.venmo)
            setPayment('venmo');
        if(props.data.paypal)
            setPayment('paypal');
        if(props.data.cod)
            setPayment('cod');
            
    }, []);

    const handlePaymentClick = e => {
        setPayment(e.target.value);
        props.handleChange(e);
    };

    return (
        <div className='checkout-review__ctr'>
            <form id='billing-details__form'>
                <div className='payment-options__ctr'>
                    <h4>Preferred Payment Method</h4>
                    <RadioGroup className='payment-options' name='paymentOptions' value={payment} onChange={handlePaymentClick}>
                        <FormControlLabel
                                control={ <Radio 
                                id='zelle'
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
                                id='venmo'
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
                                id='paypal'
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
                                id='cod'
                                className='radio' 
                                color='primary'
                                name='codRadio'
                                value='cod'
                                /> }
                            className='cod-label'
                            label='Cash on Delivery'
                        />
                    </RadioGroup>
                    <h4><i>*By clicking submit on the following page you are agreeing to receiving an automated email with order details and contact information from Lydia's Kitchen.</i></h4>
                </div>
            </form>
        </div>
    );
}
