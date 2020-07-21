import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './CurrentEventForm.css';

export default function CurrentEventForm(props) {

    const [event, setEvent] = useState({});

    const EVENT = {
        title: 'test title',
        description: 'test description',
        products: [
            {
                id:"2345524323452541",
                title: 'cake',
                description: 'testcake',
                price: 30
            },
            {
                id:"2345524323452542",
                title: 'cookie',
                description: 'testcookie',
                price: 10
            },
            {
                id:"2345524323452544",
                title: 'cookie',
                description: 'testcookie',
                price: 10
            },
            {
                id:"2345524323452545",
                title: 'cookie',
                description: 'testcookie',
                price: 10
            },
            {
                id:"2345524323452546",
                title: 'cookie',
                description: 'testcookie',
                price: 10
            },
            {
                id:"2345524323452547",
                title: 'cookie',
                description: 'testcookie',
                price: 10
            },
            {
                id:"2345524323452548",
                title: 'cookie',
                description: 'testcookie',
                price: 10
            },
            {
                id:"2345524323452549",
                title: 'cookie',
                description: 'testcookie',
                price: 10
            },
            {
                id:"2345524323452540",
                title: 'cookie',
                description: 'testcookie',
                price: 10
            }
        ]
    }

    const addToCart = props.addToCart;
    const removeFromCart = props.removeFromCart;

    const handleCheckboxClick = e => {

        let product = {};

        switch(document.getElementById(e.target.id).checked){
            case(true):
                product= EVENT.products.find(p => p.id === document.getElementById(e.target.id).value);
                props.addToCart(product);
                break;
            case(false):
                product = EVENT.products.find(p => p.id === document.getElementById(e.target.id).value);
                props.removeFromCart(product);
                break;
        }


    };


    const mapEventProducts = (event) => {
        
        return event.products.map(p => {
            return (
                <FormControlLabel
                    control={ <Checkbox 
                    key={p.title} 
                    id={p.title}
                    color='primary'
                    onChange={handleCheckboxClick}
                    /> }
                    label={p.title}
                    value={p.id}
                />
            );
        });
    }

    return (
        <div className='checkout-review__ctr'>
            <form id='address-form'>
                <div className='current-event__ctr'>
                    <h3 className='event-title'>{ EVENT.title }</h3>
                    <p className='event-description'>{ EVENT.description }</p>
                    <p className='event-order__cta'>Please check which products from the event you would like from below.</p>
                </div>
                <FormGroup>
                {mapEventProducts(EVENT)}
                </FormGroup>
            </form>
        </div>
    );
}
