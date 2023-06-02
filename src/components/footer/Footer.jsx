import React from "react";
import { NavLink, Link } from "react-router-dom";


const Footer = () => {
    return (
        <footer className="container bg-light footer">
            <div className="row">
                <div className="col">
                    <section>
                        <h5>Информация</h5>
                        <ul className="nav flex-column">
                            <NavLink className={'nav-item nav-link'} to={'/about'}>О магазине</NavLink>
                            <NavLink className={'nav-item nav-link'} to={'/catalog'}>Каталог</NavLink>
                            <NavLink className={'nav-item nav-link'} to={'/contacts'}>Контакты</NavLink>
                        </ul>
                    </section>
                </div>

                <div className="col">
                    <section>
                        <h5>Принимаем к оплате:</h5>
                        <div className="footer-pay">
                            <div className="footer-pay-systems footer-pay-systems-paypal"></div>
                            <div className="footer-pay-systems footer-pay-systems-master-card"></div>
                            <div className="footer-pay-systems footer-pay-systems-visa"></div>
                            <div className="footer-pay-systems footer-pay-systems-yandex"></div>
                            <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
                            <div className="footer-pay-systems footer-pay-systems-qiwi"></div>
                        </div>
                    </section>
                    <section>
                        <div className="footer-copyright">2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.
                            Все права защищены.<br/>Доставка по всей России!
                        </div>
                    </section>
                </div>
            </div>
        </footer>
    );
};

export default Footer;