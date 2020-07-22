import React,{ useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

export default function DeliveryDetailsForm() {

    const [delivery, setDelivery] = React.useState('');
    const [isDiffAddy, setIsDiffAddy] = React.useState(false);

    const handleDeliveryClick = e => {
        setDelivery(e.target.value);
        if(e.target.value === 'pickup'){
            setIsDiffAddy(false);
        }
    };
    const handleDiffAddyClick = e => {
        setIsDiffAddy(e.target.checked);
    };

    return (
        <div className='checkout-review__ctr'>
            <form id='billing-details__form'>
                <div className='delivery-options__ctr'>
                    <h4>Delivery Options - Please note that a $1 fee will be added for deliveries</h4>
                    {/* 
                     */}
                    <RadioGroup name='deliveryOptions' value={delivery} onChange={handleDeliveryClick}>
                        <FormControlLabel
                                control={ <Radio 
                                className='radio' 
                                color='primary'
                                name='deliveryRadio'
                                value='delivery'
                                /> }
                            className='delivery-label'
                            label='Please deliver to my home - someone will be there to receive the cookies Friday between 3:00 and 4:00 PM.'
                        />
                        <FormControlLabel
                                control={ <Radio 
                                className='radio' 
                                color='primary'
                                name='pickupRadio'
                                value='pickup'
                                /> }
                            className='pickup-label'
                            label='I will pick up my order Friday afternoon between 5:00 - 7:00 PM'
                        />
                    </RadioGroup>
                </div>
                {(delivery === 'delivery') &&
                <FormControlLabel
                        control={ <Checkbox 
                        className='ckbox' 
                        color='primary'
                        name='diffAddy'
                        checked={isDiffAddy}
                        onChange={handleDiffAddyClick}
                        /> }
                        className='diff-addy__label'
                        label='My delivery address is different from my contact address provided earlier.'
                    />
                }
                {(delivery === 'delivery') && isDiffAddy &&
                <div classname='delivery-address__ctr'>
                    <TextField id='address1' className='address-form__input' label='Address Line 1' required placeholder='Address Line 1' variant='outlined' />
                    <TextField id='address2' className='address-form__input' placeholder='Address Line 2' variant='outlined' />
                    <TextField id='city' className='address-form__input' label='City' required placeholder='City' variant='outlined' />
                    <TextField id='state' className='address-form__input' label='State' required placeholder='State' variant='outlined' />
                    <TextField id='zip' className='address-form__input' label='Zip/Postal' required placeholder='Zip/Postal' variant='outlined' />
                </div>
                }
            </form>
        </div>
    );
}
