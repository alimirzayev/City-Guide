import React from 'react'
import useStyles from './styles.js';

const PlaceDetails = ({name}) => {
  const classes = useStyles();
  return (
    <h1>{name}</h1>
  )
}

export default PlaceDetails