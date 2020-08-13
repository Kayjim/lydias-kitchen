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
    transform: 'translateZ(0)',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    fontSize: 14,
    marginBottom: 12,
    '&:hover': {
      cursor: 'pointer',
    }
  },
  ingredients: {
    fontSize: 12,
    '&:hover': {
      cursor: 'pointer',
    }
  },
  button: {
    margin: 'auto',
    color: '#282726',
    '&:hover': {
      backgroundColor: '#6A8A82',
    }
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();

  const product = props.product;

  const showMore = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('MuiTypography-noWrap')){
      e.target.classList.remove('MuiTypography-noWrap')
    } 
    else {
      e.target.classList.add('MuiTypography-noWrap')
    }
    
  };

  return (
    <Card className={props.className}>
      <CardContent>
        <Typography 
          className={classes.title} 
          style={{textAlign: 'center'}} 
          gutterBottom>
          {props.title}
        </Typography>
          <img style={{width: '100%', maxWidth: 250, maxHeight: 325, height: 200}} src={props.image}></img>
        <Typography 
          id='description'
          className={classes.pos} 
          style={{textAlign: 'center'}}
          noWrap
          onClick={showMore}
          >
            {props.description}
        </Typography>
        <Typography 
          id='ingredients'
          className={classes.ingredients}
          variant="body2" 
          style={{textAlign: 'center'}} 
          component="p"
          noWrap
          onClick={showMore}
          >
            {props.ingredients.toString()}
        </Typography>
      </CardContent>
    </Card>
  );
}