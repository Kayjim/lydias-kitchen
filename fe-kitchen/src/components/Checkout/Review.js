import React from "react";


export default function Review(props) {

  return (
      <div className='checkout-review__ctr'>
          {JSON.stringify(props.cart)}
      </div>
  );
}
