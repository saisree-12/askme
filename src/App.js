import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Components/Login';
import Askme from './Components/Askme';
import Register from './Components/Register';
import Landing from './Components/Landing';
import History from './Components/History';

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Landing />}/>
      <Route path='/signup' element={<Register />}/>
      <Route path='/askme' element={<Askme />} /> 
      <Route path='/chat/history' element={<History />} /> 

    </Routes>
    </BrowserRouter>
  )
} 

export default App;
