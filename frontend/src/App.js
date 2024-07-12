
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Stats from './Components/Stats';
import Chartbar from './Components/Chartbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div >
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route exact path="/stats" element={<Stats/>}/>
          <Route exact path="/charts" element={<Chartbar/>}/>
        </Routes>
      </div>
     
    </BrowserRouter>
  );
}

export default App;
