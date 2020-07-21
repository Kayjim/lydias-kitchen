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
    const [isChecked, setIsChecked] = useState(false);

    const EVENT = {
        title: 'test title',
        description: 'test description',
        products: [
            {
                title: 'cake',
                description: 'testcake',
                price: 30
            },
            {
                title: 'cookie',
                description: 'testcookie',
                price: 10
            },
            {
                title: 'cookie',
                description: 'testcookie',
                price: 10
            },
            {
                title: 'cookie',
                description: 'testcookie',
                price: 10
            },
            {
                title: 'cookie',
                description: 'testcookie',
                price: 10
            },
            {
                title: 'cookie',
                description: 'testcookie',
                price: 10
            },
            {
                title: 'cookie',
                description: 'testcookie',
                price: 10
            },
            {
                title: 'cookie',
                description: 'testcookie',
                price: 10
            },
            {
                title: 'cookie',
                description: 'testcookie',
                price: 10
            }
        ]
    }

    const mapEventProducts = (event) => {
        
        return event.products.map(p => {
            return (
                <FormControlLabel
                    control={ <Checkbox 
                    key={p.title} 
                    id={p.title}
                    color='primary'
                    label={p.title}
                    /> }
                    label={p.title}
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
