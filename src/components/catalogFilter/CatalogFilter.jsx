import React from "react";
import { Context } from "../../Context";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Preloader from "../preloader/Preloader";

const CatalogFilter = () => {
    const context = useContext(Context);
    const [loading, setLoading] = useState(null);

    const filterHandler = (categoryId, index) => {
        if (context.state.searchHeader.searchCatalog !== []) {
            context.setState(prevState => ({
                ...prevState,
                activeCategory: prevState.activeCategory = {category: categoryId, page: 0},
                showMoreGoodsBtn: prevState.showMoreGoodsBtn = true,
                searchHeader: {...prevState.searchHeader, searchCatalog: prevState.searchHeader.searchCatalog = [] }
            }));
        }
        else {
            context.setState(prevState => ({
                ...prevState,
                activeCategory: prevState.activeCategory = {category: categoryId, page: 0},
                showMoreGoodsBtn: prevState.showMoreGoodsBtn = true,
            }));
        }
        
        context.setState(prevState => ({
            ...prevState,
            catalogFilter: prevState.CatalogFilter = {...prevState.catalogFilter, isActive: prevState.isActive = index}
        }));
    };

    useEffect(() => {
        context.setState(prevState => ({
            ...prevState,
            activeCategory: {
                ...prevState.activeCategory,
                category: prevState.activeCategory.category = 0,
            }
        }));
    // eslint-disable-next-line
    }, []);


    useEffect(() => {
        let url = `http://localhost:7070/api/items?categoryId=${context.state.activeCategory.category}`
            setLoading(true);
            const fetchFunc = async () => {
                await fetch(`${url}`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    context.setState(prevState => ({
                        ...prevState,
                        activeCategory: prevState.activeCategory = {...prevState.activeCategory, page: data.length},
                        goodsCategories: prevState.activeCategory.category === 0 ? 
                            prevState.goodsCategories = [...data].sort(() => Math.random() - 0.5): prevState.goodsCategories = [...data],
                    }));
                    setLoading(false);
                });
            }
            fetchFunc();
    // eslint-disable-next-line
    }, [context.state.activeCategory.category])

    useEffect(() => {
        setLoading(true)
        const fetchFunc = async () => {
          await fetch('http://localhost:7070/api/categories', {
              method: 'GET',
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
          })
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              context.setState(prevState => ({
                ...prevState,
                categories: context.state.categories = data,
              }))

              setLoading(false);
            }
          });
        }
        fetchFunc();
    // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
        <ul className="catalog-categories nav justify-content-center">
            {!loading ? context.state.categories.map((item, i) => {
                return (
                    <li className="nav-item" key={item.id}>
                        <Link 
                            ref={(item) => (context.state.catalogFilter.linkRefs.current[i] = item)}  
                            className={`nav-link ${context.state.catalogFilter.isActive === i ? 'active' : null}`} 
                            to = {'#'} onClick={() => filterHandler(item.id, i)}>{item.title}
                        </Link>
                    </li>
                );
            }) : null}
        </ul>
        {loading ? <Preloader /> : null}
        </React.Fragment>
    );
};

export default CatalogFilter;