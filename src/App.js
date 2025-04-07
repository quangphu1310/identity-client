import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
// import Test from './components/Test';
import React from 'react';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  // return (
  //   <div className="App">
  //     <LoginForm />
  //     <Test />
  //   </div>
  // );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
