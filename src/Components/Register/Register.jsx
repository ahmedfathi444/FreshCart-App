import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';


export default function Register() {

  let user = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
  }


  const [errMessage, setErrMessage] = useState(null);
  const [successfulMessage, setSuccessfulMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()




  async function registerNewUser(values) {
    console.log("Submited...", values);
    
    setIsLoading(true)

    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch(function (e) {
        // console.log("Error Status 409 " + e.response.data.message)
        
        setErrMessage(e.response.data.message)
        
        setIsLoading(false)
      })

    // console.log('Sending to backend');
    // console.log(data.message);
    
    setSuccessfulMessage("Register completed (Accuont is created)")
    
    setIsLoading(false)

    setTimeout(function () {
      navigate('/login')

    }, 1000)
  }

  const formikObj = useFormik({

    initialValues: user,
    onSubmit: registerNewUser,
    validate: function (values) {

      setErrMessage(null)

      const errors = {}

      if (values.name.length < 3 || values.name.length > 12) {

        errors.name = 'Name is InValid should be contain 3 letterrs or 12 letters'
      }

      if (values.email.includes("@") == false && values.email.includes("@") == false) {
        errors.email = 'Email should be contain @ and .'
      }
      if (values.password.length < 6 || values.password.length > 12) {

        errors.password = 'Password is InValid should be contain from 6 digits to 12 digits'

      }
      if (values.rePassword !== values.password) {
        errors.rePassword = 'rePassword diffrence about Password'
      }
      if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
        errors.phone = "Phone Is InValid"
      }

      // console.log(errors);

      return errors
    }
  })


  // console.log(formikObj.values.name);

  return <>
    <div className='w-75 m-auto py-5'>

      {errMessage ? <div className='alert alert-danger p-2 '>{errMessage}</div> : ''}
      {successfulMessage ? <div className='alert alert-success p-2 '>{successfulMessage}</div> : ''}
      <h2>Register Now:</h2>

      <form onSubmit={formikObj.handleSubmit} >

        <label htmlFor="name">Name :</label>
        <input onChange={formikObj.handleChange} value={formikObj.values.name} onBlur={formikObj.handleBlur} id='name' className=' mb-0 form-control mb-3' type="text" />
        {formikObj.errors.name && formikObj.touched.name ? <div className='alert alert-danger p-1 '>Name is InValid should be contain from 3 letterrs to 12 letters</div> : ""}

        <label htmlFor="email">Email :</label>
        <input onChange={formikObj.handleChange} value={formikObj.values.email} onBlur={formikObj.handleBlur} id='email' className='form-control mb-3' type="email" />
        {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger p-1 '>Email should be contain @ and .</div> : ""}

        <label htmlFor="password">Password :</label>
        <input onChange={formikObj.handleChange} value={formikObj.values.password} onBlur={formikObj.handleBlur} id='password' className='form-control mb-3' type="password" />
        {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger p-1 '>Password is InValid should be contain from 6 digits to 12 digits</div> : ""}

        <label htmlFor="rePassword">rePassword :</label>
        <input onChange={formikObj.handleChange} value={formikObj.values.rePassword} onBlur={formikObj.handleBlur} id='rePassword' className='form-control mb-3' type="password" />
        {formikObj.errors.rePassword && formikObj.touched.rePassword ? <div className='alert alert-danger p-1 '>rePassword diffrence about Password</div> : ""}

        <label htmlFor="phone">Phone :</label>
        <input onChange={formikObj.handleChange} value={formikObj.values.phone} onBlur={formikObj.handleBlur} id='phone' className='form-control mb-3' type="tel" />
        {formikObj.errors.phone && formikObj.touched.phone ? <div className='alert alert-danger p-1 '>Phone Is InValid</div> : ""}


        <button disabled={formikObj.isValid == false || formikObj.dirty == false} type='submit' className='btn btn-success'>
          {isLoading?<FallingLines
            color="#fff"
            width="30"
            visible={true}
            ariaLabel='falling-lines-loading'
          /> :"Register"}
          
          
        </button>

      </form>

    </div>

  </>
}
