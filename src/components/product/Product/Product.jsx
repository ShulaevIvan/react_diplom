import React from "react";
import { Context } from "../../../Context";
import { useContext } from "react";
import { useEffect } from "react";

const Product = () => {
    const context = useContext(Context);
    const sizeSelectHandler = (index) => {
        if (!context.state.cardView.sizeActive) {
            context.setState(prevState => ({
                ...prevState,
                cardView: prevState.cardView = {
                    ...prevState.cardView, 
                    sizeActive: prevState.sizeActive = true,
                    cartBtnActive:  prevState.cartBtnActive = index,
                }
            }));
            return;
        }
        context.setState(prevState => ({
            ...prevState,
            cardView: prevState.cardView = {
                ...prevState.cardView, 
                sizeActive: prevState.sizeActive = false,
                cartBtnActive:  prevState.cartBtnActive = index,
            }
        }));
    };



    useEffect(() => {
        const fetchGood = async () => {
            await fetch(`http://localhost:7070/api/items/${context.state.cardView.cardId}`)
            .then((response) => response.json())
            .then((data) => {
                context.setState(prevState => ({
                    ...prevState,
                    cardView: prevState.cardView = {...prevState.cardView, cardData: data}
                }));
                console.log(data)
            });
        }
        fetchGood();
    }, [])

    return (
        <React.Fragment>
            <section className="catalog-item">
                    <h2 className="text-center">{context.state.cardView.cardData ? context.state.cardView.cardData.title : null}</h2>
                    <div className="row">
                        <div className="col-5">
                        <img 
                            src={context.state.cardView.cardData ? context.state.cardView.cardData.images[0] : null} 
                            className="img-fluid" alt={context.state.cardView.cardData ? context.state.cardView.cardData.title : null} 
                        />
                        </div>
                        <div className="col-7">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Артикул</td>
                                        <td>{context.state.cardView.cardData ? context.state.cardView.cardData.sku : null}</td>
                                    </tr>
                                    <tr>
                                        <td>Производитель</td>
                                        <td>{context.state.cardView.cardData ? context.state.cardView.cardData.manufacturer : null}</td>
                                    </tr>
                                    <tr>
                                        <td>Цвет</td>
                                        <td>{context.state.cardView.cardData ? context.state.cardView.cardData.color : null}</td>
                                    </tr>
                                    <tr>
                                        <td>Материалы</td>
                                        <td>{context.state.cardView.cardData ? context.state.cardView.cardData.material : null}</td>
                                    </tr>
                                    <tr>
                                        <td>Сезон</td>
                                        <td>{context.state.cardView.cardData ? context.state.cardView.cardData.season : null}</td>
                                    </tr>
                                    <tr>
                                        <td>Повод</td>
                                        <td>{context.state.cardView.cardData ? context.state.cardView.cardData.reason : null}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <p>Размеры в наличии:
                                    {context.state.cardView.cardData ? context.state.cardView.cardData.sizes.map((item, i) => {
                                        if (item.available) {
                                            return (
                                                <React.Fragment key={i}>
                                                    <span 
                                                        className = {context.state.cardView.sizeActive ? "catalog-item-size selected" : "catalog-item-size"} 
                                                        onClick={() => sizeSelectHandler(i)}>{item.size} 
                                                    </span>
                                                </React.Fragment>
                                            );
                                        }
                                
                                    }) : null}
                                </p>
                                {/* <p>Размеры в наличии: <span className="catalog-item-size selected">18 US</span> <span className="catalog-item-size">20 US</span></p> */}
                                <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                        <button className="btn btn-secondary">-</button>
                                        <span className="btn btn-outline-primary">1</span>
                                        <button className="btn btn-secondary">+</button>
                                    </span>
                                </p>
                            </div>
                            <button className="btn btn-danger btn-block btn-lg">В корзину</button>
                        </div>
                    </div>
                </section>
        </React.Fragment>
    );
};

export default Product;