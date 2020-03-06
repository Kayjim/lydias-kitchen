import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    transform: 'translateZ(0)'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: 'auto'
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();

  const product = props.product;

  return (
    <Card className={props.className}>
      <CardContent>
        <Typography className={classes.title} style={{textAlign: 'center'}} color="textSecondary" gutterBottom>
          {props.title}
        </Typography>
          <img style={{width: '100%', maxHeight: 325}} src={props.image}></img>
        <Typography className={classes.pos} style={{textAlign: 'center'}} color="textSecondary">
        {props.description}
        </Typography>
        <Typography variant="body2" style={{textAlign: 'center'}} component="p">
          {props.ingredients.toString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className={classes.button} size="small" onClick={() => props.addToCart(product)}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}