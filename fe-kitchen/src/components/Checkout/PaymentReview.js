import React, { useState, useEffect } from "react";

export default function PaymentReview(props){
    return (
        <div className='payment-review__ctr'>
            <h4>Payment Details</h4>
            <h6>Preferred Payment: </h6><p>{props.preferredPayment}</p>
        </div>
    );
}
