import React, { useEffect, useState } from "react";
import CatalogFilter from "../catalogFilter/CatalogFilter";
import { Context } from "../../Context";
import { useContext } from "react";
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Preloader from "../preloader/Preloader";

const Catalog = () => {
  const context = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const catEqual = arr => arr.every( v => v === arr[0]);

  const cardViewHandler = (id) => {
    context.setState(prevState => ({
      ...prevState,
      cardView: prevState.cardView = {...prevState.cardView, cardId: id},
    }));
    navigate(`/catalog/${id}`)
  }

  const searchInputHandler = () => {
    context.setState(prevState => ({
      ...prevState,
      searchHeader: {
        ...prevState.searchHeader,
        searchStr: prevState.searchStr = prevState.searchHeader.searchPanelCatalog.current.value,
      }
    }));
  }

  const searchInputClear = () => {
    context.setState(prevState => ({
      ...prevState,
      searchHeader: {
        ...prevState.searchHeader,
        searchHeader: {
          ...prevState.searchHeader,
          searchPanelCatalog: prevState.searchHeader.searchPanelCatalog.current.value = '',
        },
      },
    }));
  }

  const loadMoreHandler = async () => {
    setLoading(true)
    await fetch(`http://localhost:7070/api/items?categoryId=${context.state.activeCategory.category}&offset=${context.state.activeCategory.page}`)
    .then((response) => response.json())
    .then((data) => {
      context.setState(prevState => ({
        ...prevState,
        showMoreGoodsBtn: data.length < 6 ? prevState.showMoreGoodsBtn = false : prevState.showMoreGoodsBtn = true,
        activeCategory: prevState.activeCategory = {...prevState.activeCategory, page: Number(prevState.activeCategory.page + data.length)},
        goodsCategories: prevState.goodsCategories.length === [] ?
         prevState.goodsCategories = [...prevState.goodsCategories, ...data] :
            prevState.goodsCategories = [...prevState.goodsCategories, ...data]
              .reduce((repArr, i) => !repArr.some(j => JSON.stringify(i) === JSON.stringify(j)) ? [...repArr, i] : repArr, []),
      }));
      setLoading(false);
    })
  };

  useEffect(() => {
    if (context.state.searchHeader.searchStr && context.state.searchHeader.searchStr !== ''){
      context.state.searchHeader.searchPanelCatalog.current.value = context.state.searchHeader.searchStr;
      const fetchFunc = async () => {
        await fetch(` http://localhost:7070/api/items?q=${context.state.searchHeader.searchPanelCatalog.current.value}`)
          .then(response => response.json())
          .then((data) => {
            let catIndex = undefined;
            let catId = undefined;
            const resultCat = [];

            data.forEach((item) => {
              resultCat.push(item.category)
              catId = item.category;
            });
            const testEqual = catEqual(resultCat);

            if (testEqual) {
              const targetCat = context.state.categories.find(x => x.id === resultCat[0]);
              catIndex = context.state.categories.indexOf(targetCat);
            }
            context.setState(prevState => ({
              ...prevState,
              searchHeader: {
                ...prevState.searchHeader,
                showMoreGoodsBtn: prevState.showMoreGoodsBtn = true,
                catalogFilter: testEqual ? 
                  prevState.catalogFilter = {...prevState.catalogFilter, isActive: catIndex} : 
                    prevState.catalogFilter = {...prevState.catalogFilter, isActive: 0},
                activeCategory: testEqual ? 
                  prevState.activeCategory = {category: catId, page: 0} : 
                    prevState.activeCategory = {category: 0, page: 0},
                goodsCategories: prevState.goodsCategories = [...data],
              },
            }));
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
            <input 
            ref={context.state.searchHeader.searchPanelCatalog} 
            className="form-control" 
            placeholder="Поиск" 
            onChange={searchInputHandler}
            onClick={searchInputClear} 
            />
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
                        <a className="btn btn-outline-primary" onClick={() => cardViewHandler(good.id)}>Заказать</a>
                        {/* <a href={`/catalog/${good.id}`} className="btn btn-outline-primary" onClick={() => cardViewHandler(good.id)}>Заказать</a> */}
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