import Add from './components/Add';
import Home from './components/Home';
import './styles.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/add-product' element={<Add />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
