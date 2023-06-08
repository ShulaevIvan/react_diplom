import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Context } from './Context';
import { useState } from 'react';
import { useRef } from 'react'
import Header from './components/header/Header';
import HomePage from './components/homepage/Homepage';
import Catalog from './components/catalog/Catalog';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Contacts from './components/contacts/Contacts';
import Page404 from './components/page404/Page404';
import Product from './components/product/Product/Product';

function App() {
  const initialState = {
    goods: [],
    topSalesGoods: [],
    categories: [],
    goodsCategories: [],
    activeCategory: {category: null, page: 1},
    showMoreGoodsBtn: true,
    allCategories: [],
    searchHeader: {
      searchCatalog: [],
      searchPanelShow: false,
      searchStr: undefined, 
      searchIcon: useRef(null), 
      searchPanel: useRef(null), 
      searchPanelCatalog: useRef(null),
    },
    catalogFilter: {
      linkRefs: useRef([]),
      isActive: 0,
    },
    cardView: {cardId: undefined, cardData: undefined},
    userCart: {},
  }
  const [appState, setAppState] = useState(initialState);

  return (
    <Context.Provider value={{state: appState, setState: setAppState}}>
      <div className="App">
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route  element={<HomePage />}>
              <Route path='/' />
                <Route path='catalog' element={<Catalog />} />
                <Route path='catalog/:id' element={<Product />} />
                <Route path='about' element={<About />}/>
                <Route path='contacts' element={<Contacts />}/>
                <Route path='*' element={<Page404 />} />
            </Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
    </div>
    </Context.Provider>
  );
}

export default App;
