import Aircraft from './components/aircraft';
import Commands from './components/commands';
import Template from './components/template';

function App() {
  return (
    <Template>
      <div className='side'>
        <Aircraft />
      </div>
      <div className='side'>
        <Commands />
      </div>
    </Template>
  );
}

export default App;
