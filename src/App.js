// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Routes/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' Component={Home}/>
      </Routes>
    </>
  );
}

export default App;
