import React from "react";
import { Context } from '../../Context';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Preloader from "../preloader/Preloader";


const TopSales = () => {
    const context = useContext(Context);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(null);

    const cardViewHandler = (id) => {
        context.setState(prevState => ({
          ...prevState,
          cardView: prevState.cardView = {...prevState.cardView, cardId: id},
        }));
        localStorage.setItem('currentCardId', id);
        navigate(`/catalog/${id}`);
    }


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
                throw new Error('Error geting data');
            })
            .then((data) => {
                if (data.length > 0) {
                    context.setState(prevState => ({
                        ...prevState,
                        topSalesGoods: prevState.topSalesGoods = [...data],
                    }));
                    setLoading(false);
                };
            })
        }
        fetchFunc();
    // eslint-disable-next-line
    }, []);



    return (
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            <div className="row">
                {context.state.topSalesGoods.map((good) => {
                    return (
                        <React.Fragment key={good.id + Math.random() * 10000}>
                            {loading ? <Preloader /> : 
                                <div className="col-4" key={good.id}>
                                    <div className="card catalog-item-card">
                                        <img src={good.images[0]} className="card-img-top img-fluid" alt={good.title} />
                                    <div className="card-body">
                                        <p className="card-text">{good.title}</p>
                                        <p className="card-text">{good.price}</p>
                                        {/* eslint-disable-next-line */}
                                        <a onClick={() => cardViewHandler(good.id)} className="btn btn-outline-primary">Заказать</a>
                                    </div>
                                </div>
                            </div> 
                            }
                        </React.Fragment>
                    );
                })}
            </div>
        </section>
    );
};

export default TopSales;