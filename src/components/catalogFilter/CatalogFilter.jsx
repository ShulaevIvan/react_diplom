import React, { useRef } from "react";
import { Context } from "../../Context";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Preloader from "../preloader/Preloader";

const CatalogFilter = () => {
    const context = useContext(Context);
    const [loading, setLoading] = useState(null);
    const [activeLink, setActiveLink] = useState({
        linkRefs: useRef([]),
        isActive: 0,
    });

    const filterHandler = (categoryId, index) => {
        context.setState(prevState => ({
            ...prevState,
            activeCategory: prevState.activeCategory = {category: categoryId, page: 0},
            showMoreGoodsBtn: prevState.showMoreGoodsBtn = true,
        }));
        
        setTimeout(() => {
                activeLink.linkRefs.current[index].classList.add('active');
        }, 50);
    };

    useEffect(() => {
        setTimeout(() => {
            activeLink.linkRefs.current[0].click();
        }, 100)
    }, [])


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
                        goodsCategories: prevState.goodsCategories = [...data],
                    }));
                    setLoading(false);
                });
            }
            fetchFunc();
        
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
      }, []);

    return (
        <React.Fragment>
        <ul className="catalog-categories nav justify-content-center">
            {!loading ? context.state.categories.map((item, i) => {
                return (
                    <li className="nav-item" key={item.id}>
                        <Link ref={(item) => (activeLink.linkRefs.current[i] = item)}  className={"nav-link"} to = {'#'} onClick={() => filterHandler(item.id, i)}>{item.title}</Link>
                    </li>
                );
            }) : null}
        </ul>
        {loading ? <Preloader /> : null}
        </React.Fragment>
    );
};

export default CatalogFilter;