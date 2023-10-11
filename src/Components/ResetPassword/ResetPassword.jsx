import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { FallingLines } from 'react-loader-spinner';

import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/authentication';




export default function ResetPassword() {

    const [errMessage, setErrMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const { token, setToken } = useContext(authContext);
    const { email, setemail } = useContext(authContext);
    const navigate = useNavigate()

    const formikObj = useFormik({
        initialValues: {
            "email": email,
            "newPassword": ""
        },
        onSubmit: verifyPassword,
        validate: function (values) {
            setErrMessage(null)
            // let errors={}
            // return errors
        }
    })


    async function verifyPassword(values) {

        setIsLoading(true);


        try {
            const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
            setIsLoading(false)

            console.log(data);
            console.log(data.token);
            // localStorage.setItem('tkn', data.token)
            setToken(data.token)

            // data.token ? navigate('/products', { replace: true }):"";
            // data.token ? navigate('/products', { replace: true }) : '';

            // console.log(data.statusMsg);
            // console.log(values);

            if (data.token !== null) {
                console.log('ha');

                navigate('/products', { replace: true });

            }

        }
        catch (error) {
            setIsLoading(false)

            console.log('Error ' + error.response.data.message);
            setErrMessage(error.response.data.message)

        }

    }

    return <>

        <div className="container">
            <div className='py-5'>
                {errMessage ? <div className='alert alert-danger p-2 '>{errMessage}</div> : ''}
                <h2>Reset your account password</h2>

                <form onSubmit={formikObj.handleSubmit}>
                    {/* 
                    <input onChange={formikObj.handleChange} value={formikObj.values.email} id='email' formcontrolname='email' className=' form-control p-3 mb-3' type="email" placeholder='Email' /> */}

                    <div className="form-floating mb-3">
                        <input onChange={formikObj.handleChange} value={formikObj.values.email}  type="email" className="form-control" id="email" placeholder="name@example.com" />
                        <label htmlFor="email">Email </label>
                    </div>



                    <div className="form-floating">
                        <input onChange={formikObj.handleChange} value={formikObj.values.newPassword} type="password" className="form-control mb-3" id="newPassword" placeholder="Password" />
                        <label htmlFor="newPassword">NewPassword</label>
                    </div>


                    {/* <input onChange={formikObj.handleChange} value={formikObj.values.newPassword} id='newPassword' className='form-control p-3 mb-3' type="password" placeholder='password' /> */}


                    <button type='submit' className='btn btn-outline-success px-3 py-2'>{isLoading ? <FallingLines
                        color="rgb(0, 128, 0)"
                        width="30"
                        visible={true}
                        ariaLabel='falling-lines-loading'
                    /> : "Reset password"}</button>

                </form>

            </div>
        </div>
    </>
}
