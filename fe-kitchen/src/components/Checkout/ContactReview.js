import React, { useState, useEffect } from "react";

export default function ContactReview(props) {
    return (
        <div className='contact-review__ctr'>
            <h4>Contact Details</h4>
            <h6>Email: </h6><p>{props.email}</p>
            <h6>Address: </h6>
            <div className='contact-address__ctr'>
                <p>{props.address.address1}</p>
                <p>{props.address.address2}</p>
                <p>{props.address.city}</p>
                <p>{props.address.state}</p>
                <p>{props.address.zip}</p>
            </div>
            <h6>Phone: </h6><p>{props.phone ? props.phone : 'NOT GIVEN'}</p>
            <h6>Preffered Method: </h6><p>{props.preferredContact}</p>
        </div>
    );
}
