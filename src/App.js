import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Context } from './Context';
import { useState } from 'react';
import Header from './components/header/Header';
import HomePage from './components/homepage/Homepage';
import Catalog from './components/catalog/Catalog';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Contacts from './components/contacts/Contacts';

function App() {
  return (
    <Context.Provider>
      <div className="App">
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route  element={<HomePage />}>
              <Route path='/' />
              <Route path='catalog' element={<Catalog />}/>
              <Route path='about' element={<About />}/>
              <Route path='contacts' element={<Contacts />}/>
            </Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
    </div>
    </Context.Provider>
  );
}

export default App;
