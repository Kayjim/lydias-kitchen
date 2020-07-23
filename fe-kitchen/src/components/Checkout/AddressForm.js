import React, {} from "react";
import TextField from '@material-ui/core/TextField';

import './AddressFormCss.css'

export default function AddressForm(props) {
    return (
        <div className='checkout-review__ctr'>
            <form id='address-form'>
                <TextField onChange={props.handleChange} value={props.data.fname} id='fname' className='address-form__input' label='First name' required placeholder='First Name' variant='outlined' />
                <TextField onChange={props.handleChange} value={props.data.lname} id='lname' className='address-form__input' label='Last name' required placeholder='Last Name' variant='outlined' />
                <TextField onChange={props.handleChange} value={props.data.email} id='email' className='address-form__input' label='Email' required placeholder='Email' variant='outlined' />
                <TextField onChange={props.handleChange} value={props.data.phone} id='phone' className='address-form__input' placeholder='Phone(optional)' variant='outlined' />
                <TextField onChange={props.handleChange} value={props.data.address1} id='address1' className='address-form__input' label='Address Line 1' required placeholder='Address Line 1' variant='outlined' />
                <TextField onChange={props.handleChange} value={props.data.address2} id='address2' className='address-form__input' placeholder='Address Line 2' variant='outlined' />
                <TextField onChange={props.handleChange} value={props.data.city} id='city' className='address-form__input' label='City' required placeholder='City' variant='outlined' />
                <TextField onChange={props.handleChange} value={props.data.state} id='state' className='address-form__input' label='State' required placeholder='State' variant='outlined' />
                <TextField onChange={props.handleChange} value={props.data.zip} id='zip' className='address-form__input' label='Zip/Postal' required placeholder='Zip/Postal' variant='outlined' />
            </form>
        </div>
    );
}
