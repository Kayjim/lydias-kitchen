import React from "react";
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

export default function Review(props) {

  const cart = props.cart;

  return (
      <Paper className='checkout-review__ctr'>
          <List>
            <ListSubheader className='review-cart__title' component="div" id="nested-list-subheader">
              All Items
            </ListSubheader>
            {cart.map(p => {
              return (
                <ListItem key={cart.indexOf(p)}>
                  <img style={{width: 50, height: 50}} src={p.images[0]}></img>
                  <ListItemText primary={p.title} secondary={'$'+p.price}></ListItemText>
                </ListItem>)
            })}
            <ListItem key='total'>
              <ListItemText primary='TOTAL' secondary={'$'+props.cartTotal}></ListItemText>
            </ListItem>
          </List>
      </Paper>
  );
}
