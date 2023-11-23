import logo from './logo.svg';
import './App.css';
import Appbar from './components/Appbar'
import Franja from './components/Franja'
import Disponibilidad from './components/Disponibilidad'
import Programar from './components/Programar'
import Content_4 from './components/Content_4'
import Content_5 from './components/Programar'

function App() {
  return (
      <div className="App">
        <Appbar/>
        <Franja/>
        <Disponibilidad/>
        <Programar/>

      </div>
  );
}

export default App;
