import React from "react";
import { Context } from '../../Context';
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Preloader from "../preloader/Preloader";


const TopSales = () => {
    const context = useContext(Context);
    const [loading, setLoading] = useState(null)
    useEffect(() => {
        setLoading(true);
        const fetchFunc = async () => {
            await fetch('http://localhost:7070/api/top-sales', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error('Error geting data')
            })
            .then((data) => {
                if (data.length > 0) {
                    context.setState(prevState => ({
                        ...prevState,
                        topSalesGoods: prevState.topSalesGoods = [...data]
                    }));
                    setLoading(false)
                };
            })
        }
        fetchFunc();
    }, []);


    if (loading) {
        return (
            <section className="top-sales">
                 <div className="row">
                    <h2 className="text-center"></h2>
                    <Preloader />
                 </div>
            </section>
        )
    }
    else if (!loading && context.state.topSalesGoods.length > 0) {
        return (
            <section className="top-sales">
                <h2 className="text-center">Хиты продаж!</h2>
                <div className="row">
                    {loading ? <Preloader /> : context.state.topSalesGoods.map((good) => {
                        return (
                            <div className="col-4" key={good.id}>
                                <div className="card catalog-item-card">
                                    <img src={good.images[0]} className="card-img-top img-fluid" alt={good.title} />
                                    <div className="card-body">
                                        <p className="card-text">{good.title}</p>
                                        <p className="card-text">{good.price}</p>
                                        <a href={`/catalog/${good.id}`} className="btn btn-outline-primary">Заказать</a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        );
    }
    return null;
    
};

export default TopSales;