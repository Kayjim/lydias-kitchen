import React from "react";
import TextField from '@material-ui/core/TextField';

import './AddressFormCss.css'

export default function AddressForm() {

    return (
        <div className='checkout-review__ctr'>
            <form id='address-form'>
                <TextField id='fname' defaultValue='First Name' />
                <TextField id='lname' defaultValue='Last Name' />
                <TextField id='email' defaultValue='Email' />
                <TextField id='phone' defaultValue='Phone(optional)' />
                <TextField id='address1' defaultValue='Address Line 1' />
                <TextField id='address2' defaultValue='Address Line 2' />
                <TextField id='city' defaultValue='City' />
                <TextField id='state' defaultValue='State' />
                <TextField id='zip' defaultValue='Zip/Postal' />
            </form>
        </div>
    );
}
