import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';

export default function Profile() {

  const [name, setName] = useState(null)

  useEffect(function () {

    const myData = jwtDecode(localStorage.getItem('tkn'));

    console.log(myData);

    setName(myData.name);


  }, [])

  if (name == null) {
    return <h2> Loading... </h2>
  }

  return <>

    <Helmet>
      <title>Profile</title>
    </Helmet>



    <h2 className='text-center'>Hallo <span className='main-color'>{name}</span> </h2>
  


  </>

}
