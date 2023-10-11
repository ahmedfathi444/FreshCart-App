import { createContext, useEffect, useState } from "react";


export const authContext = createContext();



export function AuthProvider({ children }) {



    const [token, setToken] = useState(null);
    const [email, seTemail] = useState('')

    // 3lshan lw el user 3ml REFRESH my5rogsh mn el login el 3mlo
    useEffect(function(){ 

        // console.log("refreshed");
        if(localStorage.getItem('tkn') !== null   ){
          
            setToken(localStorage.getItem('tkn'));
            console.log(token);

        }
       
    },[])


    return <authContext.Provider   value={  { token , setToken ,email,seTemail }  } >

        {children}

    </authContext.Provider>
}