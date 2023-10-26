import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login'; // Assuming Login component is in a file named Login.js
import Home from './Home'; // Assuming Home component is in a file named Home.
import Signup from './Signup';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Signup' element={<Signup/>}></Route>
        <Route path='/Home' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
