import React from "react";
import Banner from "../banner/Banner";
import TopSales from '../topSales/TopSales';
import Catalog from "../catalog/Catalog";
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const HomePage = () => {
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