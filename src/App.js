import './App.css';
import MapWithMarkers from "./MapWithMarkers"
import { BrowserRouter } from 'react-router-dom';  // Імпортуємо BrowserRouter

function App() {
  return (
    <div className="App">
      <BrowserRouter> {/* Обгортаємо ваш додаток у BrowserRouter */}
        <MapWithMarkers/>
      </BrowserRouter>,
    </div>
  );
}

export default App;
