import Aircraft from './components/aircraft';
import Commands from './components/commands';
import Template from './components/template';
import Confirmation from './components/confirmation';
import { Grid } from '@mui/material';

function App() {
  return (
    <Template>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Aircraft />
        </Grid>
        <Grid item container spacing={2} xs={8}>
          <Grid item xs={12}>
            <Commands />
          </Grid>
          <Grid item xs={12}>
            <Confirmation />
          </Grid>
        </Grid>
      </Grid>
    </Template>
  );
}

export default App;
