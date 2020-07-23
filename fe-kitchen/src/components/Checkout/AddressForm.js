import React, {useState, useEffect} from "react";
import TextField from '@material-ui/core/TextField';

import './AddressFormCss.css'

export default function AddressForm(props) {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [addy1, setAddy1] = useState('');
    const [addy2, setAddy2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');


    useEffect(() => {
        if(props.data.fname)
            setFname(props.data.fname);
        if(props.data.lname)
            setLname(props.data.lname);
        if(props.data.email)
            setEmail(props.data.email);
        if(props.data.phone)
            setPhone(props.data.phone);
        if(props.data.address1)
            setAddy1(props.data.address1);
        if(props.data.address2)
            setAddy2(props.data.address2);
        if(props.data.state)
            setState(props.data.state);
        if(props.data.city)
            setCity(props.data.city);
        if(props.data.zip)
            setZip(props.data.zip);
    });

    const handleTextboxChanges = e => {
        switch(e.target.id){
            case('fname'):
                setFname(e.target.value);
                break;
            case('lname'):
                setLname(e.target.value);
                break;
            case('email'):
                setEmail(e.target.value);
                break;
            case('phone'):
                setPhone(e.target.value);
                break;
            case('address1'):
                setAddy1(e.target.value);
                break;
            case('address2'):
                setAddy2(e.target.value);
                break;
            case('city'):
                setCity(e.target.value);
                break;
            case('state'):
                setState(e.target.value);
                break;
            case('zip'):
                setZip(e.target.value);
                break;
        }
        props.handleChange(e);
    }
    return (
        <div className='checkout-review__ctr'>
            <form id='address-form'>
                <TextField onChange={handleTextboxChanges} value={fname} id='fname' className='address-form__input' label='First name' required placeholder='First Name' variant='outlined' />
                <TextField onChange={handleTextboxChanges} value={lname} id='lname' className='address-form__input' label='Last name' required placeholder='Last Name' variant='outlined' />
                <TextField onChange={handleTextboxChanges} value={email} id='email' className='address-form__input' label='Email' required placeholder='Email' variant='outlined' />
                <TextField onChange={handleTextboxChanges} value={phone} id='phone' className='address-form__input' placeholder='Phone(optional)' variant='outlined' />
                <TextField onChange={handleTextboxChanges} value={addy1} id='address1' className='address-form__input' label='Address Line 1' required placeholder='Address Line 1' variant='outlined' />
                <TextField onChange={handleTextboxChanges} value={addy2} id='address2' className='address-form__input' placeholder='Address Line 2' variant='outlined' />
                <TextField onChange={handleTextboxChanges} value={city} id='city' className='address-form__input' label='City' required placeholder='City' variant='outlined' />
                <TextField onChange={handleTextboxChanges} value={state} id='state' className='address-form__input' label='State' required placeholder='State' variant='outlined' />
                <TextField onChange={handleTextboxChanges} value={zip} id='zip' className='address-form__input' label='Zip/Postal' required placeholder='Zip/Postal' variant='outlined' />
            </form>
        </div>
    );
}
