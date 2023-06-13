import React from "react";
import { Context } from "../../Context";
import { useContext } from "react";
import { useEffect } from "react";
import Order from "../order/Order";

const Cart = () => {
    const context = useContext(Context);

    const rmPositionHandler = (id) => {
        context.setState(prevState => ({
            ...prevState,
            userCart: prevState.userCart = {
                ...prevState.userCart,
                cartData: prevState.userCart.cartData.filter((item) => item.goodId !== id),
            }
        }));
    }

    

    useEffect(() => {
        console.log(context.state.userCart)
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
                        {context.state.userCart.cartData.map((good) => {
                            return (
                                <tr key={good.goodId}>
                                    <td scope="row">1</td>
                                    <td><a href={`/catalog/${good.goodId}`}>{good.goodName}</a></td>
                                    <td>{good.size}</td>
                                    <td>{good.qnt}</td>
                                    <td>{good.price}руб.</td>
                                    <td>{good.price * good.qnt} руб.</td>
                                    <td><button className="btn btn-outline-danger btn-sm" onClick={() => rmPositionHandler(good.goodId)}>Удалить</button></td>
                                </tr>
                            )
                        })}
    
                        <tr>
                            <td colSpan="5" className="text-right">Общая стоимость</td>
                            <td>{context.state.userCart.cartData.length > 0 ? context.state.userCart.cartSumm : 0} руб.</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <Order></Order>
        </React.Fragment>
    );
};

export default Cart;