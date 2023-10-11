// import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';

export default function CategorySlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false
    };

    function getAllCategories() {

        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }


    const { data, isLoading } = useQuery("allCategories", getAllCategories, {
        refetchOnMount:false,
        // refetchInterval:200,
        // cacheTime: 2000,
        // enabled:false,
    });

    console.log(data?.data.data);

    if (isLoading) {
        return <div className='d-flex justify-content-center align-items-center'>
            <InfinitySpin
                width='200'
                color="#4fa94d"
            />
        </div>

    }




    return <>
        <h3>Shop Popular Categories</h3>
        <div className='mb-5'>
            <Slider {...settings}>
                {data?.data.data.map(function (category, index) {
                    return <div key={index}>
                        <img style={{ width: '100%', height: '200px' }} src={category.image} alt="" />
                        <h6>{category.name}</h6>
                    </div>
                })}
            </Slider>
        </div></>
}

{/* <div>
    <img style={{ width: '100%', height: '200px' }} src={require('../../images/slider-image-1.jpeg')} alt="" />
</div> */}