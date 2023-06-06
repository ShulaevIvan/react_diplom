import React, { useState } from "react";
import CatalogFilter from "../catalogFilter/CatalogFilter";
import { Context } from "../../Context";
import { useContext } from "react";
import { useEffect } from "react";
import Preloader from "../preloader/Preloader";

const Catalog = () => {
  const context = useContext(Context);
  const [loadData, setLoadData] = useState({data: undefined});

  const loadMoreHandler = async () => {
    await fetch(`http://localhost:7070/api/items?categoryId=${context.state.activeCategory.category}&offset=${context.state.activeCategory.page}`)
    .then((response) => response.json())
    .then((data) => {
      setLoadData(prevState => ({data: prevState.data = data}));
      console.log(data)
      // const clearData = data.filter(({ id: dataId, title: dataTitle }) => 
      // !context.state.goodsCategories.some(({ id: curretnId, title: currentTitle }) => curretnId === dataId && currentTitle === dataTitle));
      // const clearData = prevState.goodsCategories.filter(({ id: dataId }) => data.state.goodsCategories.some(({ id: curretnId }) => curretnId === dataId));
      context.setState(prevState => ({
        ...prevState,
        activeCategory: prevState.activeCategory = {...prevState.activeCategory, page: context.state.activeCategory.page  += 3},
        goodsCategories: prevState.goodsCategories = [...prevState.goodsCategories, ...data]
          // .reduce((result, item) => {
          //   return result.includes(item) ? result : [...result, item];
          // }, []),
      }));
      console.log(context.state.activeCategory.page)
      
    })
  };

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
            {/* {loading ? <Preloader /> : null} */}
          </div>
        </section>
      </React.Fragment>     
  );
};

export default Catalog;