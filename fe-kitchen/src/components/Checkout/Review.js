import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ContactReview from './ContactReview';
import DeliveryReview from './DeliveryReview';
import PaymentReview from './PaymentReview';

import axios from 'axios';

export default function Review(props) {

  const data = props.data;

  const [total, setTotal] = useState('');
  const [event, setEvent] = useState({});
  const [payment, setPayment] = useState('');

  useEffect(() => {

    axios.
      get("http://localhost:4000/current-event").
      then(res => {
        setEvent(res.data.event);
        let holder = 0;
        if (data.oneBox) {
          holder = res.data.event.products[0].price * 1;
          setTotal(`$${holder}`);
        }
        if (data.twoBox) {
          holder = res.data.event.products[0].price * 2;
          setTotal(`$${holder}`);
        }
        if (data.threeBox) {
          holder = res.data.event.products[0].price * 3;
          setTotal(`$${holder}`);
        }
        if (data.fourBox) {
          holder = res.data.eventvent.products[0].price * 4;
          setTotal(`$${holder}`);
        }
        if (data.zelle)
          setPayment('Zelle');
        if (data.venmo)
          setPayment('Venmo');
        if (data.paypal)
          setPayment('Paypal Friend');
        if (data.cod)
          setPayment('Cash on Delivery');

      }).
      catch(e => { console.log(e) });
  }, []);

  /*
  * TODO: create helper methods to map order to receipt. Need to think about 
  *       how the order can be dynamic catch all input and also display accordingly
  */

  const addressBuilder = (isDiffAddy) => {
    if (isDiffAddy)
      return {
        address1: data.diffAddress1,
        address2: data.diffAddress2,
        city: data.diffCity,
        state: data.diffState,
        zip: data.diffZip
      }
    return {
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      state: data.state,
      zip: data.zip
    };
  }

  return (
    <Paper className='checkout-review__ctr'>
      {Object.keys(event).length === 0 ? <h4>Loading...</h4> :
        <List>
          <ListSubheader className='review-cart__title' component="div" id="nested-list-subheader">
            Your Order
        </ListSubheader>
          <ListItem>
            <ContactReview
              email={data.email}
              address={addressBuilder(false)}
              phone={data.phone ? data.phone : false}
              preferredContact={data.preferredContact}
            />
          </ListItem>
          <ListItem >
            {data.isCurrentEvent &&
              <img style={{ width: 50, height: 50 }} src={event.images[0]}></img>}
            <ListItemText
              primary={data.oneBox ?
                ('1 box of ' + event.title) :
                data.twoBox ?
                  ('2 boxes of ' + event.title) :
                  data.threeBox ?
                    ('3 boxes of ' + event.title) :
                    ('4 boxes of ' + event.title)
              }
              secondary={'$' + event.products[0].price}></ListItemText>
          </ListItem>
          {data.diffAddy &&
            <ListItem>
              <DeliveryReview address={addressBuilder(true)} />
            </ListItem>
          }
          <ListItem>
            <PaymentReview preferredPayment={payment} />
          </ListItem>
          <ListItem key='total'>
            <ListItemText primary='TOTAL' secondary={total}></ListItemText>
          </ListItem>
        </List>
      }
    </Paper>
  );
}
