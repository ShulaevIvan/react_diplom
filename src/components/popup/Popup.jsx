import React from "react";

const Popup = () => {
    return (
        <React.Fragment>
            <section className="order">
                <h2 className="text-center">Ваш Заказ № {Math.floor(Math.random(1) * 10000)} оформлен</h2>
            </section>
        </React.Fragment>
    )
};

export default Popup;