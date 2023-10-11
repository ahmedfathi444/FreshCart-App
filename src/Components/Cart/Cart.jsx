import React, { useContext, useEffect } from 'react'
import { cartContext } from '../../Context/cartContext'
import { Bars, Circles } from 'react-loader-spinner'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';



export default function Cart() {


    useEffect(function () {

        getUserCart();
        console.log('CartId => ', cartId);

    }, [])

    const { cartId, getUserCart, addProductToCart, deleteItemFromCart, updateCount, removeCart, cartProducts, numOfCartItems, totalCartPrice } = useContext(cartContext);


    async function deleteElement(productId) {
        const res = await deleteItemFromCart(productId);

        if (res.status == 'success') {
            toast.success("Prdoduct Deleted Successfuly")
        }
        else {
            toast.error('Error occured')
        }


    }


    async function UpdateProductCount(productId, count) {
        if (count == 0) {

            await deleteItemFromCart(productId);
            return
        }

        const res = await updateCount(productId, count);
        // if (res == null) {

        //     return <div className='d-flex justify-content-center align-items-center p-2'>
        //         <Bars
        //             height="20"
        //             width="80"
        //             color="#4fa94d"
        //             ariaLabel="bars-loading"
        //             wrapperStyle={{}}
        //             wrapperClass=""
        //             visible={true}
        //         />
        //     </div>

        // }

        if (res.status === 'success') {
            toast.success('Counte Updated')
        }
        else {
            toast.error('Error Occured')
        }

    }

    async function deleteCart() {
        await removeCart();

    }

    if (cartProducts == null) {
        return <div className="vh-100 d-flex justify-content-center align-items-center ">
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }

    if (cartProducts.length == 0) {
        return <h2> No Products Found In Your Cart ////// <Link className='special-link' to='/products'>Get products</Link> </h2>
    }



    return <>

        <Helmet>
            <title>Cart</title>
        </Helmet>

        <div style={{ backgroundColor: '#f8f9fa' ,color:"#000" }} className="container py-4 ">
            <h2>Shop Cart</h2>
            <h6 className='main-color'>Total Cart Price : {totalCartPrice} EGP</h6>
            <h6>NumOfCartItems : {numOfCartItems}</h6>

            <div className='d-flex justify-content-between align-items-center'>
                <button onClick={deleteCart} className='btn btn-outline-danger'>Clear Cart</button>
                <Link to='/payment'><button className='btn btn-outline-info'>Confirm Payment</button></Link>
            </div>

            {cartProducts.map(function (product, index) {
                console.log(cartProducts);
                console.log(product);
                return <div key={index} className="row py-3 border-bottom border-3 d-flex justify-content-center align-items-center">

                    <div className='col-sm-1'> <img className='w-100' src={product.product.imageCover} alt="" /> </div>
                    <div className='col-sm-9'>
                        <h6>{product.product.title}</h6>
                        <h6 className='main-color'>Price : {product.price} </h6>
                        <button onClick={() => deleteElement(product.product.id)} className='btn btn-outline-danger'>Remove</button>
                    </div>
                    <div className='col-sm-2 d-flex justify-content-center align-items-center'>
                        <button onClick={() => UpdateProductCount(product.product.id, product.count + 1)} className='btn btn-outline-success'>+ </button>

                        <span className='mx-2'> {product.count} </span>

                        <button onClick={() => UpdateProductCount(product.product.id, product.count - 1)} className='btn btn-outline-success '> -</button>

                    </div>


                </div>
            })}











        </div>



    </>
}
