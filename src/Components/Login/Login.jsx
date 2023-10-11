import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/authentication';
import { cartContext } from '../../Context/cartContext';


export default function Login() {

 
  const { getUserCart } = useContext(cartContext);
  // useEffect(function () {
  //   getUserCart()
  // }, [])


  let user = {
    email: '',
    password: '',
  }


  const { setToken } = useContext(authContext)

  const [errMessage, setErrMessage] = useState(null);
  const [successfulMessage, setSuccessfulMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()




  async function loginToWebsite(values) {
    console.log("Submited...", values);

    setIsLoading(true)

    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch(function (e) {

        setErrMessage(e.response.data.message)

        setIsLoading(false)
      })

    localStorage.setItem('tkn', data.token)
    setToken(data.token)
    await getUserCart();
    // console.log(data.token);
    
    setSuccessfulMessage("Welcome Back")
    setIsLoading(false)
    setTimeout(function () {
      navigate('/products')

    }, 1000)

    
  }









  const formikObj = useFormik({

    initialValues: user,
    onSubmit: loginToWebsite,
    validate: function (values) {

      setErrMessage(null)

      const errors = {}

      if (values.email.includes("@") == false && values.email.includes("@") == false) {
        errors.email = 'Email should be contain @ and .'
      }
      if (values.password.length < 6 || values.password.length > 12) {

        errors.password = 'Password is InValid should be contain from 6 digits to 12 digits'

      }

      // console.log(errors);

      return errors
    }
  })




  return <>
    <div className='w-75 m-auto py-5'>

      {errMessage ? <div className='alert alert-danger p-2 '>{errMessage}</div> : ''}
      {successfulMessage ? <div className='alert alert-success p-2 '>{successfulMessage}</div> : ''}
      <h2>Login:</h2>

      <form onSubmit={formikObj.handleSubmit} >

        <label htmlFor="email">Email :</label>
        <input onChange={formikObj.handleChange} value={formikObj.values.email} onBlur={formikObj.handleBlur} id='email' className='form-control mb-3' type="email" />
        {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger p-1 '>Email should be contain @ and .</div> : ""}

        <label htmlFor="password">Password :</label>
        <input onChange={formikObj.handleChange} value={formikObj.values.password} onBlur={formikObj.handleBlur} id='password' className='form-control mb-3' type="password" />
        {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger p-1 '>Password is InValid should be contain from 6 digits to 12 digits</div> : ""}


        <div className='d-flex justify-content-between align-item-center'>
          <Link className='forget-password' to='forget-password'> Forget your password ? </Link>
          <button disabled={formikObj.isValid == false || formikObj.dirty == false} type='submit' className='btn btn-success'>
            {isLoading ? <FallingLines
              color="#fff"
              width="30"
              visible={true}
              ariaLabel='falling-lines-loading'
            /> : "Login"}

          </button>

        </div>

      </form>

    </div>

  </>
}