import React, { useContext } from 'react'
import { authContext } from '../../Context/authentication'
import { Navigate } from 'react-router-dom';




export default function ProtectedRoute({ children }) {

    const { token  } = useContext(authContext);
    console.log(token);
 

    if (token === null) {

        return <Navigate to="/login" />
    }

    return <>


        {children}


    </>
}
