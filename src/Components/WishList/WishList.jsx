import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { wishListContext } from '../../Context/wishlistContext';
import toast from 'react-hot-toast';

export default function WishList() {


    const { deleteItemFromWishList, wishListItems, getUserWishList } = useContext(wishListContext);




    useEffect(function () {

        getUserWishList()



    }, [])


    async function deleteFromWishList(productId) {

        const res = await deleteItemFromWishList(productId);

        if (res?.status == 'success') {
            await getUserWishList();
            toast.success('Product removed successfully From wishlist');

        }
        else {
            toast.error('Product No Remove from Wishlist')
            console.log(res);

        }
    }


    if (wishListItems == null) {
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

        <div style={{ backgroundColor: '#f8f9fa', color: "#000" }} className="container py-5 mt-5">

            <h2>My wish List</h2>
            {/* <h5>Total Items : {data?.data.count}</h5> */}


            {wishListItems?.map(function (item, index) {
                console.log(item);
                return <div key={index} className="row d-flex justify-content-center align-items-center border-bottom border-3 ">

                    <div className="col-md-2">
                        <figure className='pt-4'>
                            <img className='w-100' src={item.imageCover} alt="" />
                        </figure>
                    </div>
                    <div className="col-md-8">
                        <div>
                            <h5>{item.title.split(' ').slice(0, 2).join(' ')}</h5>
                            <h6 className='main-color'>{item.price} EGP</h6>
                            <button onClick={() => deleteFromWishList(item.id)} className='btn text-danger  p-0 '> <i className="fa-solid fa-trash"></i> Remove</button>
                        </div>

                    </div>
                    <div className="col-md-2">
                        <div>
                            <button className='btn btn-outline-success p-3'>Add To Cart</button>
                        </div>
                    </div>


                </div>
            })}


        </div>



    </>
}
