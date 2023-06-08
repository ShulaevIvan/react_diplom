import React, { useEffect, useState } from "react";
import CatalogFilter from "../catalogFilter/CatalogFilter";
import { Context } from "../../Context";
import { useContext } from "react";
import { useLocation } from 'react-router-dom'
import Preloader from "../preloader/Preloader";

const Catalog = () => {
  const context = useContext(Context);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const loadMoreHandler = async () => {
    setLoading(true)
    await fetch(`http://localhost:7070/api/items?categoryId=${context.state.activeCategory.category}&offset=${context.state.activeCategory.page}`)
    .then((response) => response.json())
    .then((data) => {
      context.setState(prevState => ({
        ...prevState,
        showMoreGoodsBtn: data.length < 6 ? prevState.showMoreGoodsBtn = false : prevState.showMoreGoodsBtn = true,
        activeCategory: prevState.activeCategory = {...prevState.activeCategory, page: Number(prevState.activeCategory.page + data.length)},
        goodsCategories: prevState.goodsCategories = [...prevState.goodsCategories, ...data]
          .reduce((result, item) => {
            return result.includes(item) ? result : [...result, item]
          }, []),
      }));
      setLoading(false);
    })
  };

  useEffect(() => {
    if (context.state.searchHeader.searchStr){
      context.state.searchHeader.searchPanelCatalog.current.value = context.state.searchHeader.searchStr;
      const fetchFunc = async () => {
        await fetch(` http://localhost:7070/api/items?q=${context.state.searchHeader.searchPanelCatalog.current.value}`)
          .then(response => response.json())
          .then((data) => {
            context.setState(prevState => ({
              ...prevState,
              searchHeader: {...prevState.searchHeader, searchCatalog: prevState.searchHeader.searchCatalog = data }
            }));
            console.log(context.state.searchHeader.searchCatalog)
          })
      }
      fetchFunc();
    } 
  }, [context.state.searchHeader.searchStr]);

  return (
      <React.Fragment>
        <section className="catalog">
          <h2 className="text-center">Каталог</h2>
          <form className={location.pathname === '/catalog' ? 'catalog-search-form form-inline': 'catalog-search-form form-inline search-hidden'}>
            <input ref={context.state.searchHeader.searchPanelCatalog} className="form-control" placeholder="Поиск"  />
          </form>
          <CatalogFilter />
          <div className="row">
            {context.state.goodsCategories.map((good) => {
              return (
                <div className="col-4" key={Math.random() + good.id}>
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
            {loading ? <Preloader /> : null}
          </div>
        </section>
      </React.Fragment>     
  );
};

export default Catalog;