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
            </div>
        </main>
    );
};

export default HomePage;