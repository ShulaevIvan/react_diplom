import React from "react";
import Banner from "../banner/Banner";
import TopSales from '../topSales/TopSales';
import Catalog from "../catalog/Catalog";
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { useContext } from "react";
import { Context } from "../../Context";

const HomePage = () => {
    const context = useContext(Context);
    let location = useLocation();
    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <Banner />
                    {location.pathname === '/' ? <TopSales /> : null}
                    {location.pathname === '/' ? <Catalog /> : null}
                    <Outlet />
                </div>
            </div>
        </main>
    );
};

export default HomePage;