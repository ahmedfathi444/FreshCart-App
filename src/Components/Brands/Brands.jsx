import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet';
import { Circles } from 'react-loader-spinner';
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';

export default function Brands() {


  function getAllBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  const { data, isLoading } = useQuery("allBrands", getAllBrands);
  console.log(data?.data.data);

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
      <title>Brands</title>
    </Helmet>

    <h2 className='main-color text-center pt-5'>All Brands</h2>

    <div className="container">
      <div className="row gy-4 py-5">
        {data?.data.data.map((brand, index) => <div key={index} className="col-md-3">

          <div className="brand-item text-center border">
            <Link>
              <img className='w-100' src={brand.image} alt={brand.name} />
              <p>{brand.name}</p>
            </Link>
          </div>

        </div>)}
      </div>
    </div>

  </>
}
