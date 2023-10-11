import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet';
import { Circles } from 'react-loader-spinner';
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';

export default function Categories() {

  function getAllCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  const { data, isLoading } = useQuery("allCategories", getAllCategories);
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
      <title> Categories </title>
    </Helmet>

    <div className="container">
      <div className="row gy-5 py-4">


        {data?.data.data.map(function (category, index) {
          return <div key={index} className="col-md-4">
            <div className="categoryItem text-center border rounded-2">

              <Link>
                <div className='img' >
                  <img className='w-100 ' style={{ height: "300px" }} src={category.image} alt={category.name} />
                </div>
              </Link>
              <div>
                <h4 className='p-3 main-color'>{category.name}</h4>
              </div>

            </div>
          </div>
        })}


      </div>
    </div>


  </>
}
