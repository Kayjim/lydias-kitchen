import React, { useState, useEffect } from 'react';
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
      color: '#6A8A82',
      textDecoration: 'underline'
    }
  },
  ingredients: {
    fontSize: 12,
    '&:hover': {
      cursor: 'pointer',
      color: '#6A8A82',
      textDecoration: 'underline'
    }
  },
  button: {
    margin: 'auto',
    color: '#282726',
    '&:hover': {
      backgroundColor: '#6A8A82',
    }
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();

  const product = props.product;
  const ingredients = props.ingredients;


  const [ingredientString, setIngredientString] = useState('');

  useEffect(() => {
    let ingrdStr = '';

    ingredients.forEach(i => {
      ingrdStr += i.name + ' ';
    })
    setIngredientString(ingrdStr);
  }, []);

  const showMore = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('MuiTypography-noWrap')) {
      e.target.classList.remove('MuiTypography-noWrap')
    }
    else {
      e.target.classList.add('MuiTypography-noWrap')
    }

  };

  return (
    <Card className={props.className}>
      <CardContent className={classes.content}>
        <Typography
          className={classes.title}
          style={{ textAlign: 'center' }}
          gutterBottom>
          {props.title}
        </Typography>
        <img style={{ width: '100%', maxWidth: 250, maxHeight: 325, height: 200 }} src={`https://lydias-kitchen.herokuapp.com/${props.title.replace(/\s/g, "")}-A.jpg`}></img>
        <Typography
          id='description'
          className={classes.pos}
          style={{ textAlign: 'center', width: '100%' }}
          noWrap
          onClick={showMore}
        >
          {props.description}
        </Typography>
        <Typography
          id='ingredients'
          className={classes.ingredients}
          variant="body2"
          style={{ textAlign: 'center', width: '100%' }}
          component="p"
          noWrap
          onClick={showMore}
        >
          {ingredientString}
        </Typography>
      </CardContent>
    </Card>
  );
}