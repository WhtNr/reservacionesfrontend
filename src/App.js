import logo from './logo.svg';
import './App.css';
import Appbar from './components/Appbar'
import Franja from './components/Franja'
import Disponibilidad from './components/Disponibilidad'
import Programar from './components/Programar'
import Cancelar from './components/Cancelar'
import Reprogramar from './components/Reprogramar';

function App() {
  return (
      <div className="App">
        <Appbar/>
        <Franja/>
        <Disponibilidad/>
        <Programar/>
        <Cancelar/>
        <Reprogramar/>

      </div>
  );
}

export default App;
