import React from "react";
import { Context } from "../../Context";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Preloader from "../preloader/Preloader";

const CatalogFilter = () => {
    const context = useContext(Context);
    const [loading, setLoading] = useState(null);

    const filterHandler = (categoryId) => {
        context.setState(prevState => ({
            ...prevState,
            activeCategory: prevState.activeCategory = categoryId
        }));
    }

    useEffect(() => {
        setLoading(true);
        const fetchFunc = async () => {
            await fetch(`http://localhost:7070/api/items?categoryId=${context.state.activeCategory}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                context.setState(prevState => ({
                    ...prevState,
                    goodsCategories: prevState.goodsCategories = data,
                }));
                console.log(context.state.goodsCategories)
                setLoading(false)
            })
        }
        fetchFunc();
    }, [context.state.activeCategory])

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
        <ul className="catalog-categories nav justify-content-center">
            <li className="nav-item">
                <Link className="nav-link active" onClick={() => filterHandler('Все')}>Все</Link>
            </li>
            {loading ? <Preloader /> : context.state.categories.map((item) => {
                return (
                    <li className="nav-item" key={item.id}>
                        <Link className="nav-link" onClick={() => filterHandler(item.id)}>{item.title}</Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default CatalogFilter;