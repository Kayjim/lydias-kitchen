import React,{useState, useEffect} from "react";
import TextField from '@material-ui/core/TextField';


export default function SpecialRequestForm(props) {

    const [reqMsg, setReqMsg] = useState('');
    
    useEffect(() => {
        if(props.data.specialRequest)
        setReqMsg(props.data.specialRequest);
    }, []);

    const handleSpecialRequestMessage = e => {
        setReqMsg(e.target.value);
        props.handleChange(e);
    };

    return (
        <div className='checkout-review__ctr'>
            <div className='special-event__container'>
                <h3>
                    Lydia's Kitchen holds the right to not fulfill special request orders. However, in the case of special events i.e.(Birthday, Anniversary, Graduation, etc) or other requests outside of the current advertised event, Lydia's Kitchen will accept your request and respond accordingly. Please feel free to browse All Products at <a href='/home' target='_blank'>Lydia's Kitchen</a> and leave a message containing your request and desired products.
                </h3>
                <form id='address-form'>
                    <TextField 
                    onChange={handleSpecialRequestMessage} 
                    id='specialRequest' 
                    className='spclReq-form__input' 
                    label='Special Request' 
                    multiline
                    rows={5}
                    rowsMax={5}
                    required 
                    placeholder='Enter your request here...' 
                    variant='outlined'
                    value={reqMsg} />
                </form>
            </div>
        </div>
    );
}
