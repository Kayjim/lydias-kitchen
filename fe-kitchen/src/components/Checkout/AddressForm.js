import React from "react";
import TextField from '@material-ui/core/TextField';

import './AddressFormCss.css'

export default function AddressForm(props) {
    return (
        <div className='checkout-review__ctr'>
            <form id='address-form'>
                <TextField onChange={props.handleChange} id='fname' className='address-form__input' label='Required' required defaultValue='First Name' variant='outlined' />
                <TextField onChange={props.handleChange} id='lname' className='address-form__input' label='Required' required defaultValue='Last Name' variant='outlined' />
                <TextField onChange={props.handleChange} id='email' className='address-form__input' label='Required' required defaultValue='Email' variant='outlined' />
                <TextField onChange={props.handleChange} id='phone' className='address-form__input' defaultValue='Phone(optional)' variant='outlined' />
                <TextField onChange={props.handleChange} id='address1' className='address-form__input' label='Required' required defaultValue='Address Line 1' variant='outlined' />
                <TextField onChange={props.handleChange} id='address2' className='address-form__input' label='Required' required defaultValue='Address Line 2' variant='outlined' />
                <TextField onChange={props.handleChange} id='city' className='address-form__input' label='Required' required defaultValue='City' variant='outlined' />
                <TextField onChange={props.handleChange} id='state' className='address-form__input' label='Required' required defaultValue='State' variant='outlined' />
                <TextField onChange={props.handleChange} id='zip' className='address-form__input' label='Required' required defaultValue='Zip/Postal' variant='outlined' />
            </form>
        </div>
    );
}
