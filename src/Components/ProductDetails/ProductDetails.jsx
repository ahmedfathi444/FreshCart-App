import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Bars, InfinitySpin } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { wishListContext } from '../../Context/wishlistContext';

export default function ProductDetails() {
    // Hna bstlm el id ely mab3ot fe el params mn Component el Products
    const { id } = useParams();
    //   console.log(id);


    const { addProductToCart, setSendinLoader, sendinLoader } = useContext(cartContext);

    



    async function addProduct(productId) {
        setSendinLoader(true);

        const res = await addProductToCart(productId);

        console.log(res);
        if (res.status == 'success') {
            toast.success(res.message)
        }
        else {
            toast.error('Cart Not Added')
        }
        setSendinLoader(false);

    }


    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    const { data, isLoading } = useQuery("productDetails", getProductDetails)

    //   console.log(data.data.data);

    if (isLoading) {
        return <div className='vh-100 d-flex justify-content-center align-items-center'>
            <InfinitySpin
                width='200'
                color="#4fa94d"
            />
        </div>
    }


    console.log(data.data.data.id);

   
    return <>

        <div className="container py-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-3">
                    <figure>
                        <img className='w-100' src={data.data.data.imageCover} alt={data.data.data.title} />
                    </figure>
                </div>

                <Helmet>
                    <title>{data.data.data.title.split(' ').slice(0, 2).join(' ')}</title>
                </Helmet>

                <div className="col-md-9">
                    <div className="details">
                        <h2>{data.data.data.title}</h2>
                        <p className='text-muted'>{data.data.data.description}</p>
                        <h5>{data.data.data.category.name}</h5>

                        <div className='d-flex justify-content-between align-items-center'>
                            <p>{data.data.data.price} EGP</p>
                            <p><span><i className="fa-solid fa-star main-color"></i></span> {data.data.data.ratingsAverage} </p>
                        </div>

                        <div className="col-sm-12 ">
                            <button onClick={() => addProduct(data.data.data.id)} className='btn w-100 bg-main-color text-white'>
                                {sendinLoader ? <div className='d-flex justify-content-center align-items-center p-2'>
                                    <Bars
                                        height="20"
                                        width="80"
                                        color="#4fa94d"
                                        ariaLabel="bars-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />
                                </div> : '+ ADD to Cart'}
                            </button>
                        </div>

                    </div>
                </div>


            </div>
        </div>







    </>
}
