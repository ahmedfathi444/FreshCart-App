import axios from 'axios';
import { data } from 'jquery';
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { InfinitySpin } from 'react-loader-spinner';

export default function AllOrders() {

  const [userOrders, setUserOrders] = useState(null)

  useEffect(function () {

    const { id } = jwtDecode(localStorage.getItem('tkn'))
    console.log('UserId => ', id);

    getUserOrders(id);


  }, [])


  async function getUserOrders(userId) {

    try {

      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      console.log('AllOrders => ', data);

      setUserOrders(data)


    } catch (error) {
      console.log('Error', error);
    }


  }

  if (userOrders === null) {
    return <div className='vh-100 d-flex justify-content-center align-items-center'>
      <InfinitySpin
        width='200'
        color="#4fa94d"
      />
    </div>
  }

  return <>

    <Helmet>
      <title>All Orders</title>
    </Helmet>





    <h2>All Orders</h2>

    <div className="container">
      <div className="row g-3">


        {userOrders?.map(function (order, index) {
          return <div key={index} className="col-md-6">

            {/* d-flex align-items-center justify-content-between */}

            <div key={index} className="order bg-dark text-white rounded p-2">
              <div className='container'>
                <div className="row g-3 ">

                  {order.cartItems?.map(function (item, idx) {


                    return <div key={idx} className='col-sm-3 '>

                      <div className="item border rounded p-1 text-center">

                        <img className='w-100' src={item.product.imageCover} alt={item.product.title} />
                        <h5>{item.product.title.split(" ").slice(0, 2).join(' ')}</h5>

                        <h5>Count :{item.count}</h5>
                        <h5>Price :{item.price}</h5>                   </div>

                    </div>

                  })}
                </div>
              </div>




              <p>Order sent to user with phone <span className='main-color'> {order.shippingAddress.phone}  </span> and with details <span className='main-color'> {order.shippingAddress.details} </span> at <span className='main-color'> {order.shippingAddress.city} </span> </p>
              <h5>Payment Method : <span className='main-color'>{order.paymentMethodType}</span></h5>
              <h5>Total Price : <span className='main-color'>{order.totalOrderPrice} EGP</span> </h5>

            </div>
          </div>
        })}








      </div>
    </div>



  </>
}
