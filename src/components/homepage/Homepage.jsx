import React from "react";
import Banner from "../banner/Banner";
import { Outlet } from "react-router-dom";

const HomePage = () => {
    return (
        <main class="container">
            <div class="row">
                <div class="col">
                    <Banner />
                    <Outlet />
                </div>
                <section class="top-sales">
                    <h2 class="text-center">Хиты продаж!</h2>
                    <div class="preloader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </section>
                <section class="catalog">
                    <h2 class="text-center">Каталог</h2>
                    <div class="preloader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default HomePage;