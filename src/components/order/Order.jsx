import React from "react";
import { Context } from "../../Context";
import { useContext } from "react";
import { useState, useEffect, useRef } from "react";

const Order = () => {
  const context = useContext(Context);

  const inlineStyle = {
    maxWidth: '30rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0,
    marginBottom: 0,
  };
  const initialState = {
    checkAgree: false,
    phoneRef: useRef(null),
    addressRef: useRef(null),
    submitRef: useRef(null),
    orderValid: false,
  }
  const [order, setOrder] = useState(initialState);

  const checkboxHandler = () => {
    if (order.checkAgree) {
      setOrder(prevState => ({
        ...prevState,
        checkAgree: prevState.checkAgree = false,
      }));
      return;
    }
    setOrder(prevState => ({
      ...prevState,
      checkAgree: prevState.checkAgree = true,
    }));
  }

  const submitHandler = () => {
    const userPhone = order.phoneRef.current.value;
    const userAddress = order.addressRef.current.value;
    if (userPhone && userAddress && context.state.userCart.cartData.length > 0) {
      setOrder(prevState => ({
        ...prevState,
        oredrValid: prevState.orderValid = true,
      }));
      return;
    }
    setOrder(prevState => ({
      ...prevState,
      oredrValid: prevState.orderValid = false,
    }));
  }

  useEffect(() => {
    if (order.orderValid) {

      const sendOrder = {
        owner: {
          phone: order.phoneRef.current.value,
          address: order.addressRef.current.value,
        },
        items: []
      }
      context.state.userCart.cartData.forEach((item) => {
        const itemObj = {
          id: item.goodId,
          price: item.price,
          count: item.qnt,
        }
        sendOrder.items.push(itemObj)
      });

      context.setState(prevState => ({
        ...prevState,
        userCart: {
          ...prevState.userCart,
          cartData: prevState.userCart.cartData = [],
          cartSumm: prevState.userCart.cartSumm = 0,
        }
      }));

      const fetchFunc = async () => {
        await fetch(`http://localhost:7070/api/order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(sendOrder)
        });
      };

      fetchFunc();
      order.phoneRef.current.value = '';
      order.addressRef.current.value = '';
      localStorage.removeItem('userCart');
      localStorage.removeItem('userCartSumm');
      context.setState(prevState => ({
        ...prevState,
        userCart: {
          ...prevState.userCart,
          orderReady: prevState.userCart.orderReady = true
        },
      }));
    }
  }, [order.orderValid]);


    return (
        <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={inlineStyle}>
              <form className="card-body">
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input ref={order.phoneRef} className="form-control" id="phone" placeholder="Ваш телефон" autoComplete="false" />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input ref={order.addressRef} className="form-control" id="address" placeholder="Адрес доставки" autoComplete="false" />
                </div>
                <div className="form-group form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="agreement" 
                    checked={order.checkAgree} 
                    onChange={checkboxHandler}
                    autoComplete="false"
                    />
                  <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                <button 
                  ref={order.submitRef} 
                  type="button" 
                  className="btn btn-outline-secondary" 
                  onClick={submitHandler}
                  disabled={context.state.userCart.cartData.length === 0 || !order.checkAgree ? true : false} 
                >Оформить</button>
              </form>
            </div>
          </section>
    );
};

export default Order;