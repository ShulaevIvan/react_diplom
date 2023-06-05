import React, { useEffect } from "react";
import CatalogFilter from "../catalogFilter/CatalogFilter";
import { Context } from "../../Context";
import { useContext } from "react";
import Preloader from "../preloader/Preloader";

const Catalog = () => {
  const context = useContext(Context);

  const loadMoreHandler = async () => {
    await fetch(`http://localhost:7070/api/items?categoryId=${context.state.activeCategory}&offset=6`)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              context.setState(prevState => ({
                ...prevState,
                goodsCategories: prevState.goodsCategories = [...prevState.goodsCategories, ...data].filter(item => data.includes(item)),
                showMoreGoodsBtn: data.length < 6 ? prevState.showMoreGoodsBtn = false : prevState.showMoreGoodsBtn = true,
              }));
              return;
            }
          });
  }

  return (
      <React.Fragment>
        <section className="catalog">
          <h2 className="text-center">Каталог</h2>
          <form className="catalog-search-form form-inline">
            <input className="form-control" placeholder="Поиск" />
          </form>
          <CatalogFilter />
          <div className="row">
            {context.state.goodsCategories.map((good) => {
              return (
                <div className="col-4" key={Math.random()}>
                  <div className="card catalog-item-card">
                      <img src={good.images[0] ? good.images[0] : good.images[1]} className="card-img-top img-fluid" alt={good.title} />
                      <div className="card-body">
                        <p className="card-text">{good.title}</p>
                        <p className="card-text">{good.price}</p>
                        <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>
          <div className="text-center">
            {context.state.showMoreGoodsBtn ? <button className="btn btn-outline-primary" onClick={loadMoreHandler}>Загрузить ещё</button> : null}
            {/* <button className="btn btn-outline-primary" onClick={loadMoreHandler}>Загрузить ещё</button> */}
            
          </div>
        </section>
      </React.Fragment>     
  );
};

export default Catalog;