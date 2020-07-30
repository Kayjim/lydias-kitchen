import React, { useState, useEffect } from "react";

export default function DeliveryReview (props){
    return (
        <div className='delivery-review__ctr'>
            <h4>Delivery Details</h4>
            <h6>Address: </h6>
            <div className='delivery-address__ctr'>
                <p>{props.address.address1}</p>
                <p>{props.address.address2}</p>
                <p>{props.address.city}</p>
                <p>{props.address.state}</p>
                <p>{props.address.zip}</p>
            </div>
        </div>
    );
}
