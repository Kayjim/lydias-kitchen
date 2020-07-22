import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './CurrentEventForm.css';
import { STATES } from "mongoose";

export default function CurrentEventForm(props) {

    const [event, setEvent] = useState({});
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);
    const [isSpecReq, setIsSpecReq] = useState(false);
    const [reqMsg, setReqMsg] = useState('');

    const EVENT = {
        title: 'Cupcake Orders From Lydia\'s Kitchen',
        description: 'Cupcakes abound: Here is what is in the box: (All cupcakes and frostings  are made from scratch - no mixes or boxes. Flavors made from real fruits and fruit zest). ',
        products: [
            {
                id:"1",
                title: 'Vanilla Bean Buttercream',
                description: 'Vanilla Bean Batter with Vanilla Bean Buttercream Frosting',
                price: 30
            },
            {
                id:"2",
                title: 'Chocolate Fudge ',
                description: ' Dark Chocolate cupcakes with a Dark Chocolate Buttercream Frosting',
                price: 10
            },
            {
                id:"4",
                title: 'German Chocolate Towers',
                description: 'Dark Chocolate cupcakes with a Coconut and Pecan Custard Topping  encased in  a Dark Chocolate Buttercream Frosting',
                price: 10
            },
            {
                id:"5",
                title: 'Strawberriest',
                description: 'Strawberry blended cupcakes with a Strawberry infused Buttercream Frosting',
                price: 10
            },
            {
                id:"7",
                title: 'Key Lime Zest',
                description: ' Key Lime Cupcakes with Cream Cheese Frosting infused with fresh lime zest.',
                price: 10
            },
            {
                id:"6",
                title: 'Early Gray',
                description: ' Earl Gray Infused Cupcake with a Blackberry Buttercream Frosting.',
                price: 10
            },
        ]
    }

    const handleCheckboxClick = e => {
        switch (e.target.name) {
            case ('check1'):
                setCheck1(e.target.checked);
                setCheck2(false);
                setCheck3(false);
                setCheck4(false);
                break;
            case ('check2'):
                setCheck2(e.target.checked);
                setCheck1(false);
                setCheck3(false);
                setCheck4(false);
                break;
            case ('check3'):
                setCheck3(e.target.checked);
                setCheck2(false);
                setCheck1(false);
                setCheck4(false);
                break;
            case ('check4'):
                setCheck4(e.target.checked);
                setCheck2(false);
                setCheck3(false);
                setCheck1(false);
                break;
        }
        props.handleChange(e);
    };

    const handleSpecialRequestClick = e => {
        setIsSpecReq(e.target.checked);
        props.handleChange(e);
        return isSpecReq;
    };



    const mapEventProducts = (event) => {
        
        return event.products.map(p => {
            return (
                <h5 key={p.id}>{p.title}</h5>
                // <FormControlLabel
                // //     control={ <Checkbox 
                // //     key={p.title} 
                // //     id={p.title}
                // //     color='primary'
                // //     onChange={handleCheckboxClick}
                // //     /> }
                // //     label={p.title}
                // //     value={p.id}
                //  />
            );
        });
    }

    return (
        <div className='checkout-review__ctr'>
            <form id='address-form'>
                <div className='current-event__ctr'>
                    <h3 className='event-title'>{ EVENT.title }</h3>
                    <p className='event-description'>{ EVENT.description }</p>
                    <FormGroup>
                        {mapEventProducts(EVENT)}
                    </FormGroup>
                    <p className='event-order__cta'>Please check how many boxes you would like to order blow.
                    <br /> 1 box = 6 cupcakes for $15
                    </p>
                </div>
                <div className='order-options__ctr'>
                    <FormControlLabel
                        control={ <Checkbox
                        id='oneBox'
                        className='ckbox'  
                        color='primary'
                        checked={check1}
                        value={1}
                        name='check1'
                        onChange={handleCheckboxClick}
                        /> }
                        label="1 box"
                        
                    />
                    <FormControlLabel
                        control={ <Checkbox 
                        id='twoBox'
                        className='ckbox' 
                        color='primary'
                        value={2}
                        name='check2'
                        checked={check2}
                        onChange={handleCheckboxClick}
                        /> }
                        label="2 boxes"
                    />
                    <FormControlLabel
                        control={ <Checkbox  
                        className='ckbox'
                        id='threeBox'
                        color='primary'
                        name='check3'
                        value={3}
                        checked={check3}
                        onChange={handleCheckboxClick}
                        /> }
                        label="3 boxes"
                    />
                    <FormControlLabel
                        control={ <Checkbox 
                        className='ckbox' 
                        id='fourBox'
                        color='primary'
                        name='check4'
                        value={4}
                        checked={check4}
                        onChange={handleCheckboxClick}
                        /> }
                        label="4 boxes"
                    />
                  </div>
                <div className='special-request__ctr'>
                <FormControlLabel
                        control={ <Checkbox 
                        id='hasSpecialRequest'
                        className='ckbox' 
                        color='primary'
                        name='hasSpecialRequest'
                        checked={isSpecReq}
                        onChange={handleSpecialRequestClick}
                        /> }
                        className='special-request__label'
                        label="*Limited Special Offer: Don't like all the options? Customize up to one box for your order! Type in your selections below."
                    />
                    <TextField 
                        id='specialRequest'
                        disabled={!isSpecReq}
                        multiline
                        placeholder='If you have a special request or comment about your order please leave it here.'
                        rows={5}
                        fullWidth
                        onChange={props.handleChange}
                        value={reqMsg}
                    /> 
                 </div>
            </form>
        </div>
    );
}
