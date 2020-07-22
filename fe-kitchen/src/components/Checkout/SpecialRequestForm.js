import React from "react";
import TextField from '@material-ui/core/TextField';


export default function SpecialRequestForm(props) {
    return (
        <div className='checkout-review__ctr'>
            <div classname='special-event__container'>
                <h3>
                    Lydia's Kitchen holds the right to not fulfill special request orders. However, in the case of special events i.e.(Birthday, Anniversary, Graduation, etc)
                    or other requests outside of the current advertised event, Lydia's Kitchen will accept your request and respond accordingly. Please feel free to browse 
                     <a href='/home' target='_blank'>all products</a> and leave a message containing your request and desired products.
                </h3>
                <form id='address-form'>
                    <TextField 
                    onChange={props.handleChange} 
                    id='specialRequest' 
                    className='spclReq-form__input' 
                    label='Special Request' 
                    multiline
                    rows={5}
                    rowsMax={5}
                    required 
                    placeholder='Enter your request here...' 
                    variant='outlined' />
                </form>
            </div>
        </div>
    );
}
