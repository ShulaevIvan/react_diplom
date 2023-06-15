import React from "react";
import logo from '../../img/header-logo.png'
import { NavLink, Link } from "react-router-dom";
import { Context } from "../../Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const context = useContext(Context);
    const navigate = useNavigate();

    const searchInputHandler = () => {
        context.setState(prevState => ({
            ...prevState,
            searchHeader: {
                ...prevState.searchHeader, 
                searchStr: prevState.searchStr = context.state.searchHeader.searchPanel.current.value,
            },
        }));
    }
    const searchIconHandler = () => {
        if (!context.state.searchHeader.searchPanel.current.value.trim() && context.state.searchHeader.searchPanelShow) {
            context.setState(prevState => ({
                ...prevState,
                searchHeader: {
                    ...prevState.searchHeader, 
                    searchPanelShow: prevState.searchPanelShow = false, 
                    searchStr: prevState.searchStr = '',
                },
            }));
            return;
        }
        else if (!context.state.searchHeader.searchPanelShow) {
            context.state.searchHeader.searchPanel.current.value = '';
            context.setState(prevState => ({
                ...prevState,
                searchHeader: {
                    ...prevState.searchHeader, 
                    searchPanelShow: prevState.searchPanelShow = true, 
                    searchStr: prevState.searchStr = '',
                },
            }));
            return;
        }
        
        context.setState(prevState => ({
            ...prevState,
            searchHeader: {
                ...prevState.searchHeader, 
                searchPanelShow: prevState.searchPanelShow = false, 
                searchStr: prevState.searchStr = context.state.searchHeader.searchPanel.current.value.trim(),
            },
        }));
        navigate('/catalog');
    };
    



    return (
        <header className="container">
          <div className="row">
            <div className="col">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <NavLink className="navbar-brand" to={'/'}><img src={logo} alt="Bosa Noga" /></NavLink>
                    <div className="collapse navbar-collapse" id="navbarMain">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink  className="nav-link" to={'/'}>Главная</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/catalog'}>Каталог</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/about'}>О Магазине</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/contacts'}>Контакты</NavLink>
                        </li>
                    </ul>
                    <div>
                        <div className="header-controls-pics">
                            <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={searchIconHandler}></div>
                             {/* <!-- Do programmatic navigation on click to /cart.html --> */}
                            <Link className="header-controls-pic header-controls-cart" to={'/cart'}>
                                {context.state.userCart.cartData.length > 0  ? 
                                     <div className="header-controls-cart-full">{context.state.userCart.cartData.length}</div> :  
                                     <div className="header-controls-cart-full">{JSON.parse(localStorage.getItem('userCart')) ? JSON.parse(localStorage.getItem('userCart')).length : null}</div>}
                                <div className="header-controls-cart-menu"></div>
                            </Link>
                        </div>
                        <form  data-id="search-form" 
                        className={`header-controls-search-form form-inline ${context.state.searchHeader.searchPanelShow ? null : 'invisible'}`}>
                            <input className="form-control" placeholder="Поиск" ref={context.state.searchHeader.searchPanel} onChange={searchInputHandler} />
                        </form>
                    </div>
                    </div>
                </nav>
            </div>
          </div>
        </header>
    );
};

export default Header;