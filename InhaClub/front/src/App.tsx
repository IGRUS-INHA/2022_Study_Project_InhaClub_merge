import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Join from './join';
import './join.scss';
import './clubs.scss';
import Login from './login';
import Search from '../src/component/Search';
import Clubs from '../src/pages/clubs/clubs';
import Register from '../src/pages/clubs/register';
import Edit from '../src/pages/clubs/edit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search/>} />
          <Route path="/join" element={<Join/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/clubs" element={<Clubs/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/edit" element={<Edit/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;