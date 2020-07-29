import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';


import './EventImagesCss.css'

const EventImages = (props) => {
    const images = props.images;
    return (
        <div className='event-images-ctr'>
            <h5>Images: </h5>
            {images.map(i => {
                return (
                    <TextField key={i} value={i} className='event-form__input' placeholder='Images' variant='outlined' />
                        );
            })}
        </div>
    );
};

export default EventImages;