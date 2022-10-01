import { CssBaseline, Grid } from '@material-ui/core'
import { Fragment, useState, useEffect } from 'react';
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesData } from './api';

function App() {
  const [places, setPlaces] = useState();
  const [coords, setCoords] = useState({ lat: 40.40, lng: 49.86 });
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    })
  }, [])


  useEffect(() => {
    if (bounds) {
      let mounted = true;

      getPlacesData(bounds.sw, bounds.ne)
        .then((data) => {
          console.log(data)
          setPlaces(data)
        })

      return () => {
        mounted = false;
      }
    }
  }, [bounds])


  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>

        <Grid item xs={12} md={4}>
          <List places={places}/>
        </Grid>

        <Grid item xs={12} md={8}>
          <Map
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
          />
        </Grid>

      </Grid>
    </Fragment>
  );
}

export default App;
