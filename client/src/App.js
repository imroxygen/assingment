import React from 'react';
import {BrowserRouter as Router,Route,Routes, Navigate} from 'react-router-dom'
import Login from './component/Login';
import Signup from './component/Signup';
import Dashboard from './component/Dashboard';
import './App.css'
import { useAuth } from './contexts/AuthContext';

function App() {
  const {isAuthenticated}=useAuth();
  return (
    <Router>
      <Routes>
        <Route path='/' element={ !isAuthenticated ? <Signup/> : < Navigate to ='/dashboard' />} />
        <Route path='/login' element={ !isAuthenticated ? <Login/> : <Navigate to='/dashboard' /> } />
        <Route path='/dashboard' element={ isAuthenticated ? <Dashboard/> : <Login/>} />
      </Routes>
    </Router>
  )
  
}

export default App;
