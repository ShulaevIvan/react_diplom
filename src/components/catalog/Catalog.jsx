import React from "react";
import TopSales from "../topSales/TopSales";
import demo from '../../img/products/superhero_sneakers.jpg'

const Catalog = () => {
   
    return (
        <React.Fragment>
           <TopSales></TopSales>
           <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <div class="preloader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
            </div>
            <form className="catalog-search-form form-inline">
              <input className="form-control" placeholder="Поиск" />
            </form>
            <ul className="catalog-categories nav justify-content-center">
              <li className="nav-item">
                <a className="nav-link active" href="#">Все</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Женская обувь</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Мужская обувь</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Обувь унисекс</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Детская обувь</a>
              </li>
            </ul>
            <div className="row">
              <div className="col-4">
                <div className="card catalog-item-card">
                  <img src={demo}
                    className="card-img-top img-fluid" alt="Босоножки 'MYER'" />
                  <div className="card-body">
                    <p className="card-text">Босоножки 'MYER'</p>
                    <p className="card-text">34 000 руб.</p>
                    <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card catalog-item-card">
                  <img src={demo}
                    className="card-img-top img-fluid" alt="Босоножки 'Keira'" />
                  <div className="card-body">
                    <p className="card-text">Босоножки 'Keira'</p>
                    <p className="card-text">7 600 руб.</p>
                    <a href="/products/1.html" class="btn btn-outline-primary">Заказать</a>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card catalog-item-card">
                  <img src={demo}
                    className="card-img-top img-fluid" alt="Супергеройские кеды" />
                  <div className="card-body">
                    <p className="card-text">Супергеройские кеды</p>
                    <p className="card-text">1 400 руб.</p>
                    <a href="/products/1.html" class="btn btn-outline-primary">Заказать</a>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card catalog-item-card">
                  <img src={demo}
                    className="card-img-top img-fluid" alt="Босоножки 'MYER'" />
                  <div className="card-body">
                    <p className="card-text">Босоножки 'MYER'</p>
                    <p className="card-text">34 000 руб.</p>
                    <a href="/products/1.html" class="btn btn-outline-primary">Заказать</a>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card catalog-item-card">
                   <img src={demo}
                    className="card-img-top img-fluid" alt="Босоножки 'Keira'" />
                  <div className="card-body">
                    <p className="card-text">Босоножки 'Keira'</p>
                    <p className="card-text">7 600 руб.</p>
                    <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card catalog-item-card">
                  <img src={demo}
                    className="card-img-top img-fluid" alt="Супергеройские кеды" />
                  <div className="card-body">
                    <p className="card-text">Супергеройские кеды</p>
                    <p className="card-text">1 400 руб.</p>
                    <a href="/products/1.html" class="btn btn-outline-primary">Заказать</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button class="btn btn-outline-primary">Загрузить ещё</button>
            </div>
        </section>
        </React.Fragment>
        
    );
};

export default Catalog;