import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';
import Private from './pages/Private';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Let's Connect
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        <Route path='users' element={<Private />}>
          <Route path='' element={<Users />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
