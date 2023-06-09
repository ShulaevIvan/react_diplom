import React, { useMemo } from "react";
import { Context } from "../../Context";
import { useContext, useEffect } from "react";
import Order from "../order/Order";
import Popup from "../popup/Popup";

const Cart = () => {
    const context = useContext(Context);
    let storage = JSON.parse(localStorage.getItem('userCart'));
    let storageSumm = 0;

    const RmPositionHandler = (id, size, goodName) => {
        context.setState(prevState => ({
            ...prevState,
            userCart: prevState.userCart = {
                ...prevState.userCart,
                cartData: prevState.userCart.cartData.filter((item) => item.size === size && item.goodId === id ? item.goodId !== id : item),
            },
        }));

        context.setState(prevState => ({
            ...prevState,
            userCart: prevState.userCart = {
                    ...prevState.userCart,
                    cartSumm: prevState.cartSumm = Number(checkSumm()),
            },
        }));
        
        const newStorage = JSON.parse(localStorage.getItem('userCart')).filter((item) => item.size === size && item.goodId === id ? item.goodId !== id : item);
        localStorage.setItem('userCart', JSON.stringify(newStorage));
    };
    
    useEffect(()=> {
        return () => {
            context.setState(prevState => ({
                ...prevState,
                userCart: {
                  ...prevState.userCart,
                  orderReady: prevState.userCart.orderReady = false,
                },
            }));
        };
      }, []);


    const checkSumm = () => {
        let summ = 0;
        if (JSON.parse(localStorage.getItem('userCart'))) {
            JSON.parse(localStorage.getItem('userCart')).forEach((item) => summ += item.qnt * item.price);
            return summ;
        }
        context.state.userCart.cartData.forEach((item) => summ += item.qnt * item.price);

        return summ;
    };

    useMemo(() => {
        storageSumm = checkSumm();
        localStorage.setItem('userCartSumm', JSON.stringify(storageSumm))
    }, [context.state.userCart.cartData]);
    
    
    return (
        <React.Fragment>
            <section className="cart">
                <h2 className="text-center">Корзина</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Размер</th>
                            <th scope="col">Кол-во</th>
                            <th scope="col">Стоимость</th>
                            <th scope="col">Итого</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        storage && storage.length > 0 ? storage.map((good, i) => {
                            return  (
                                <tr key={good.goodId ? Math.random() * 1000 : i}>
                                    <td scope="row">1</td>
                                    <td><a href={`/catalog/${good.goodId}`}>{good.goodName}</a></td>
                                    <td>{good.size}</td>
                                    <td>{good.qnt}</td>
                                    <td>{good.price}руб.</td>
                                    <td>{good.price * good.qnt} руб.</td>
                                    <td><button className="btn btn-outline-danger btn-sm" onClick={() => RmPositionHandler(good.goodId, good.size, good.goodName)}>Удалить</button></td>
                                </tr>
                            );
                        })
                        : 
                        context.state.userCart.cartData.map((good, i) => {
                            return (
                                <tr key={good.goodId ? Math.random() * 1000 : i}>
                                    <td scope="row">1</td>
                                    <td><a href={`/catalog/${good.goodId}`}>{good.goodName}</a></td>
                                    <td>{good.size}</td>
                                    <td>{good.qnt}</td>
                                    <td>{good.price}руб.</td>
                                    <td>{good.price * good.qnt} руб.</td>
                                    <td><button className="btn btn-outline-danger btn-sm" onClick={() => RmPositionHandler(good.goodId, good.size, good.goodName)}>Удалить</button></td>
                                </tr>
                            );
                        })
                    }
                        <tr>
                            <td colSpan="5" className="text-right">Общая стоимость</td>
                            <td>{storageSumm ? storageSumm : context.state.userCart.cartSumm} руб.</td>
                        </tr>
                        
                        
                    </tbody>
                </table>
            </section>

            {context.state.userCart.orderReady  ? <Popup /> : null}
            {!context.state.userCart.orderReady && context.state.userCart.cartData.length > 0 ? <Order /> : null}

        </React.Fragment>
    );
};

export default Cart;