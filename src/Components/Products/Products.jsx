import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Context/authentication'
import axios from 'axios'
import { Circles } from 'react-loader-spinner';
import { useQuery } from 'react-query';


import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { wishListContext } from '../../Context/wishlistContext';

// const heartIcon = document.querySelector('#heartIcon');

export default function Products() {
  const { addProductToCart } = useContext(cartContext);
  const { addProductToWishList } = useContext(wishListContext);

  const [heartIconColor, setHeartIconColor] = useState(false)
  const [heartIconId, setHeartIconId] = useState(null)
  const [arrayOfId, setArrayOfId] = useState(null)
  

  const [active, setActive] = useState(false)
 


  async function addProduct(productId) {

    const res = await addProductToCart(productId);

    console.log(res);
    if (res.status == 'success') {
      toast.success(res.message)
    }
    else {
      toast.error('Cart Not Added')
    }


  }

  function getAllProducts() {

    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }


  async function addToWishList(productId) {

    const res = await addProductToWishList(productId);
    // console.log(res.data[res.data.length-1]);
    // setArrayOfId(res.data)
    console.log(res.data);
    console.log(productId);
    // console.log(arrayOfId);
    console.log(res.data.includes(productId));
   
    if(res.data.includes(res.data[res.data.length-1])==true){
      setHeartIconColor(true);
      setHeartIconId(res.data[res.data.length-1])
     
    }else{
      setHeartIconColor(false)
    }

    if (res?.status == 'success') {
     
    
      toast.success(res.message);


    }
    else {
      toast.error('Product Not Add to Wishlist')
      setHeartIconColor(false)
    }

  }



  const { data, isLoading, isFetching, isFetched, isError, refetch } = useQuery("allProducts", getAllProducts, {
    enabled: false
  })
  console.log('All Products ', data);
  console.log('ProductId => ', data?.data.data.id);

  if (isLoading) {

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


  return <>
    <Helmet>
      <title>All Products</title>
    </Helmet>
    {<div className="container py-5">
      <div className="row gx-0 pb-5" >
        <div className="col-sm-9">

          <HomeSlider />

        </div>
        <div className="col-sm-3">
          <img style={{ width: '100%', height: '200px' }} src={require('../../images/grocery-banner.png')} alt="" />
          <img style={{ width: '100%', height: '200px' }} src={require('../../images/grocery-banner-2.jpeg')} alt="" />

        </div>
      </div>
      <CategorySlider />
      <div className="row g-5">
        <div>
          <button onClick={refetch} id='getProducts' className=' col-sm-12 btn btn-outline-success w-100 '> Get All Products.... </button>
        </div>

        {data?.data.data.map(function (product, index) {

          return <div key={index} className="col-md-2">
            <Link to={`/ProductDetails/${product.id}`}>
              <div className="product">
                <img src={product.imageCover} alt={product.title} className='w-100' />
                <h6 className='main-color'>{product.category.name}</h6>
                <h5 >{product.title.split(" ").slice(0, 2).join(' ')}</h5>
                <div className='d-flex justify-content-between align-items-center'>
                  <p> {product.price}  EGP</p>
                  <p>  <span><i className="fa-solid fa-star main-color"></i></span> {product.ratingsAverage}</p>

                </div>
              </div>

            </Link>
            <div className="d-flex justify-content-between align-items-center">
              <button onClick={() => addProduct(product.id)} className='btn p-1 me-2 w-100 bg-main-color text-white'>+ ADD to Cart</button>
              <button onClick={() => addToWishList(product.id)} className='btn p-0 ' > {heartIconColor && heartIconId? <i className="fa-solid fa-heart fa-1x text-danger"></i> : <i className="fa-solid fa-heart fa-1x"></i>} </button>
            </div>

          </div>
        })}
      </div>
    </div>}
  </>
}


