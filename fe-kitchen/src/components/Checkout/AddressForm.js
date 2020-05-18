import React from "react";
import TextField from '@material-ui/core/TextField';

import './AddressFormCss.css'

export default function AddressForm() {

    return (
        <div className='checkout-review__ctr'>
            <form id='address-form'>
                <TextField id='fname' className='address-form__input' label='Required' required defaultValue='First Name' variant='outlined' />
                <TextField id='lname' className='address-form__input' label='Required' required defaultValue='Last Name' variant='outlined' />
                <TextField id='email' className='address-form__input' label='Required' required defaultValue='Email' variant='outlined' />
                <TextField id='phone' className='address-form__input' defaultValue='Phone(optional)' variant='outlined' />
                <TextField id='address1' className='address-form__input' label='Required' required defaultValue='Address Line 1' variant='outlined' />
                <TextField id='address2' className='address-form__input' label='Required' required defaultValue='Address Line 2' variant='outlined' />
                <TextField id='city' className='address-form__input' label='Required' required defaultValue='City' variant='outlined' />
                <TextField id='state' className='address-form__input' label='Required' required defaultValue='State' variant='outlined' />
                <TextField id='zip' className='address-form__input' label='Required' required defaultValue='Zip/Postal' variant='outlined' />
            </form>
        </div>
    );
}
