import Aircraft from './components/aircraft';
import Commands from './components/commands';

import narrowBody from './matrix';

function App() {
  return (
    <div className="App">
      <Aircraft narrowBody={narrowBody} />
      <Commands />
    </div>
  );
}

export default App;
