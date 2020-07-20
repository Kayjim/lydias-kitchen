import React from "react";
import TextField from '@material-ui/core/TextField';

export default function CurrentEventForm(props) {
    return (
        <div className='checkout-review__ctr'>
            <form id='address-form'>
                <TextField onChange={props.handleChange} id='fname' className='address-form__input' label='First name' required placeholder='First Name' variant='outlined' />
                <TextField onChange={props.handleChange} id='lname' className='address-form__input' label='Last name' required placeholder='Last Name' variant='outlined' />
                <TextField onChange={props.handleChange} id='email' className='address-form__input' label='Email' required placeholder='Email' variant='outlined' />
                <TextField onChange={props.handleChange} id='phone' className='address-form__input' placeholder='Phone(optional)' variant='outlined' />
                <TextField onChange={props.handleChange} id='address1' className='address-form__input' label='Address Line 1' required placeholder='Address Line 1' variant='outlined' />
                <TextField onChange={props.handleChange} id='address2' className='address-form__input' placeholder='Address Line 2' variant='outlined' />
                <TextField onChange={props.handleChange} id='city' className='address-form__input' label='City' required placeholder='City' variant='outlined' />
                <TextField onChange={props.handleChange} id='state' className='address-form__input' label='State' required placeholder='State' variant='outlined' />
                <TextField onChange={props.handleChange} id='zip' className='address-form__input' label='Zip/Postal' required placeholder='Zip/Postal' variant='outlined' />
            </form>
        </div>
    );
}
