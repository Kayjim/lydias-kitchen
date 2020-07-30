import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios'

import './CurrentEventForm.css';

export default function CurrentEventForm(props) {

    const [event, setEvent] = useState({});
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);
    const [isSpecReq, setIsSpecReq] = useState(false);
    const [reqMsg, setReqMsg] = useState('');

    useEffect(() => {
        axios.
            get("http://localhost:4000/current-event").
            then(res => {
                setEvent(res.data.event);
            }).
            catch(e => { console.log(e) });
        if (props.data.oneBox)
            setCheck1(true);
        if (props.data.twoBox)
            setCheck2(true);
        if (props.data.threeBox)
            setCheck3(true);
        if (props.data.fourBox)
            setCheck4(true);
        if (props.data.hasSpecialRequest)
            setIsSpecReq(true);
        if (props.data.specialRequest)
            setReqMsg(props.data.specialRequest);


    }, []);

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

    const handleSpecialRequestMessage = e => {
        setReqMsg(e.target.value);
        props.handleChange(e);
    };



    const mapEventProducts = (event) => {
        if(event.products){
            return event.products.map(p => {
                return (
                    <p className='product' key={p._id}>{p.title}</p>
                );
            });
        }
    }

    return (
        <div className='checkout-review__ctr'>
            <form id='address-form'>
                <div className='current-event__ctr'>
                    <h3 className='event-title'>{event.title}</h3>
                    <p className='event-description'>{event.description}</p>
                    <img style={{width: '100%', maxHeight: 325, height: 200}} src={event ? event.images ? event.images[0] : null : null}></img>
                    <h4 className='row1'>What's in the box?</h4>
                    <div className='announcement-ctr'>
                        <p className='announcement'><i>*{event.announcement}</i></p>
                    </div>
                    <FormGroup >
                        {mapEventProducts(event)}
                    </FormGroup>
                    <p className='event-order__cta'>Please check how many boxes you would like to order blow.
                    <br /> 1 box = 6 cupcakes for $15
                    </p>
                </div>
                <div className='order-options__ctr'>
                    <FormControlLabel
                        control={<Checkbox
                            id='oneBox'
                            className='ckbox'
                            color='primary'
                            checked={check1}
                            value={1}
                            name='check1'
                            onChange={handleCheckboxClick}
                        />}
                        label="1 box"

                    />
                    <FormControlLabel
                        control={<Checkbox
                            id='twoBox'
                            className='ckbox'
                            color='primary'
                            value={2}
                            name='check2'
                            checked={check2}
                            onChange={handleCheckboxClick}
                        />}
                        label="2 boxes"
                    />
                    <FormControlLabel
                        control={<Checkbox
                            className='ckbox'
                            id='threeBox'
                            color='primary'
                            name='check3'
                            value={3}
                            checked={check3}
                            onChange={handleCheckboxClick}
                        />}
                        label="3 boxes"
                    />
                    <FormControlLabel
                        control={<Checkbox
                            className='ckbox'
                            id='fourBox'
                            color='primary'
                            name='check4'
                            value={4}
                            checked={check4}
                            onChange={handleCheckboxClick}
                        />}
                        label="4 boxes"
                    />
                </div>
                <div className='special-request__ctr'>
                    <FormControlLabel
                        control={<Checkbox
                            id='hasSpecialRequest'
                            className='ckbox'
                            color='primary'
                            name='hasSpecialRequest'
                            checked={isSpecReq}
                            onChange={handleSpecialRequestClick}
                        />}
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
                        onChange={handleSpecialRequestMessage}
                        value={reqMsg}
                    />
                </div>
            </form>
        </div>
    );
}
