import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { FallingLines } from 'react-loader-spinner';

import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/authentication';




export default function ForgetPassword() {

    const [errMessage, setErrMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const formikObj = useFormik({
        initialValues: { "email": '' },
        onSubmit: verifyPassword,
        validate: function (values) {
            setErrMessage(null)
            // let errors={}
            // return errors
        }
    })

    const {  email, seTemail  } = useContext(authContext);


    async function verifyPassword(values) {

        setIsLoading(true);
 
      

        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
            setIsLoading(false)
            console.log(data);
            // console.log();

            // console.log(data.statusMsg);
            // console.log(values);
            if (data.statusMsg === "success") {
                console.log('ha');
                seTemail(formikObj.values.email)
                
                navigate('/login/verify-code', { replace: true });

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
                <h2>please enter your Email</h2>

                <form onSubmit={formikObj.handleSubmit}>
                    <input onChange={formikObj.handleChange} value={formikObj.values.email} id='email' className='form-control p-3 mb-3' type="email" placeholder='Email' />
                    <button type='submit' className='btn btn-outline-success px-3 py-2'>{isLoading ? <FallingLines
                        color="rgb(0, 128, 0)"
                        width="30"
                        visible={true}
                        ariaLabel='falling-lines-loading'
                    /> : "Verify"}</button>

                </form>

            </div>
        </div>
    </>
}
