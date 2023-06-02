import React from "react";
import banner from '../../img/banner.jpg'

const Banner = () => {
    return (
        <div class="banner">
            <img src={banner} class="img-fluid" alt="К весне готовы!" />
            <h2 class="banner-header">К весне готовы!</h2>
        </div>
    );
};

export default Banner;