import React from "react";
import { Context } from "../../Context";
import { useContext, useEffect } from "react";
import Order from "../order/Order";
import Popup from "../popup/Popup";

const Cart = () => {
    const context = useContext(Context);
    const storage = JSON.parse(localStorage.getItem('userCart'));
    let storageSumm = Number(JSON.parse(localStorage.getItem('userCartSumm')));

    const rmPositionHandler = (id, size, goodName) => {
        console.log(size)
        console.log(id)
        let newSumm = 0;
        context.setState(prevState => ({
            ...prevState,
            userCart: prevState.userCart = {
                ...prevState.userCart,
                cartData: prevState.userCart.cartData.filter((item) => [id].includes(item.goodId) && item.size !== size && item.goodId !== id),
            }
        }));

        context.state.userCart.cartData.forEach((item) => {
            if (item.goodId === id && item.size === size) newSumm -= item.qnt * item.price;
            newSumm += (item.qnt * item.price);
        });

        if (newSumm !== context.state.userCart.cartSumm) {
            context.setState(prevState => ({
                ...prevState,
                userCart: prevState.userCart = {
                    ...prevState.userCart,
                    cartSumm: prevState.cartSumm = newSumm,
                }
            }));
            localStorage.setItem('userCartSumm', JSON.stringify(newSumm));
        }
        
        if (storage.length > 0) localStorage.setItem('userCart', JSON.stringify(storage.filter((item) => [id].includes(item.goodId) && item.size !== size && item.goodName === goodName)));
        
    };

    useEffect(() => {
        console.log(context.state.userCart.cartData)
    }, [])

    useEffect(()=> {
        return () => {
            context.setState(prevState => ({
                ...prevState,
                userCart: {
                  ...prevState.userCart,
                  orderReady: prevState.userCart.orderReady = false,
                },
            }));
        }
      }, []);
    
    
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
                        {storage && storage.length > 0 ? storage.map((good, i) => {
                            return  (
                                <tr key={good.goodId ? Math.random() * 1000 : i}>
                                    <td scope="row">1</td>
                                    <td><a href={`/catalog/${good.goodId}`}>{good.goodName}</a></td>
                                    <td>{good.size}</td>
                                    <td>{good.qnt}</td>
                                    <td>{good.price}руб.</td>
                                    <td>{good.price * good.qnt} руб.</td>
                                    <td><button className="btn btn-outline-danger btn-sm" onClick={() => rmPositionHandler(good.goodId, good.size, good.goodName)}>Удалить</button></td>
                                </tr>
                            );
                        }) : 
                        context.state.userCart.cartData.map((good, i) => {
                            return (
                                <tr key={good.goodId ? Math.random() * 1000 : i}>
                                    <td scope="row">1</td>
                                    <td><a href={`/catalog/${good.goodId}`}>{good.goodName}</a></td>
                                    <td>{good.size}</td>
                                    <td>{good.qnt}</td>
                                    <td>{good.price}руб.</td>
                                    <td>{good.price * good.qnt} руб.</td>
                                    <td><button className="btn btn-outline-danger btn-sm" onClick={() => rmPositionHandler(good.goodId, good.size, good.goodName)}>Удалить</button></td>
                                </tr>
                            );
                        })
                        }
                        {storageSumm ? 
                            <tr>
                                <td colSpan="5" className="text-right">Общая стоимость</td>
                                <td>{storageSumm > 0 ? storageSumm : 0} руб.</td>
                            </tr>
                        : 
                        <tr>
                            <td colSpan="5" className="text-right">Общая стоимость</td>
                            <td>{context.state.userCart.cartData.length > 0 ? context.state.userCart.cartSumm : 0} руб.</td>
                        </tr>
                        }
                        
                    </tbody>
                </table>
            </section>

            {context.state.userCart.orderReady  ? <Popup /> : null}
            {!context.state.userCart.orderReady && context.state.userCart.cartData.length > 0 ? <Order /> : null}

        </React.Fragment>
    );
};

export default Cart;