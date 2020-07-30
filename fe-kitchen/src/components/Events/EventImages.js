import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import './EventImagesCss.css'

const EventImages = (props) => {

    const [images, setImages] = useState(props.images);

    useEffect(() => {
        setImages(props.images);
        debugger;
    }, [props.images]);

    const addNew = () => {
        const values = [...images];
        values.push('');
        setImages(values);
    };

    const remove = (i) => {
        const values = [...images];
        values.splice(i, 1);
        setImages(values);
    };

    const handleChange = (i, e) => {
        const imgs = [...images];
        if(e.target.id == 'img-' + i){
            imgs[i] = e.target.value;
        }
        setImages(imgs);
        props.handleImageChange(imgs);
    }

    return (
        <div className='event-images-ctr'>
            <h5>Images: </h5>
            <Button variant='outlined' color='primary' onClick={addNew}><AddIcon /></Button>
            {images.map((i, idx) => {
                return (
                    <React.Fragment key={`img-${idx}`}>
                        <TextField  id={`img-${idx}`} value={i} onChange={(e) => handleChange(idx, e)} className='event-form__input' placeholder='Images' variant='outlined' />
                        <Button  variant='outlined' color='secondary' onClick={() => remove(idx)}><RemoveIcon /></Button>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default EventImages;