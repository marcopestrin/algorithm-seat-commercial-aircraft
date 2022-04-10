import Aircraft from './components/aircraft';
import Commands from './components/commands';
import Template from './components/template';
import Confirmation from './components/confirmation';

function App() {
  return (
    <Template>
      <Aircraft />
      <Commands />
      <Confirmation />
    </Template>
  );
}

export default App;
