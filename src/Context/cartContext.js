import axios from "axios";
import { data } from "jquery";
import { createContext, useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { Link } from "react-router-dom";


export const cartContext = createContext();





export function CartProvider({ children }) {

    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [cartProducts, setCartProducts] = useState(null);
    const [sendinLoader, setSendinLoader] = useState(false)
    const [cartId, setCartId] = useState(null)




    async function getUserCart() {

        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: { token: localStorage.getItem('tkn') }
            })
   
             console.log(data);
            //  console.log(data.data._id);
             setCartId(data.data._id)

            setNumOfCartItems(data.numOfCartItems)
            setTotalCartPrice(data.data.totalCartPrice)
            setCartProducts(data.data.products)
            
        }
        catch (error) {

            setNumOfCartItems(0)
            setTotalCartPrice(0)
            setCartProducts([]);
            console.log('Errorrrrr', error);

        }



    }


    async function addProductToCart(productId) {

        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
                {
                    "productId": productId
                }
                ,
                {
                    headers: { token: localStorage.getItem('tkn') }

                })


            // setCartProducts(data.data.products);
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);

            console.log(data.numOfCartItems);
            console.log(data.data.totalCartPrice);

            return data
        }
        catch (error) {
            console.log('Error ' + error);
        }




    }

    async function deleteItemFromCart(productId) {
        if (cartProducts == null) {
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


        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers: { token: localStorage.getItem('tkn') }
            })
            setCartProducts(data.data.products);
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);

            return data;
        }
        catch (error) {
            console.log('Error ', error);
        }

    }

    async function updateCount(productId, count) {

        try {

            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    "count": count
                },

                {
                    headers: { token: localStorage.getItem('tkn') }
                }
            )

            setCartProducts(data.data.products);
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice)

            return data

        }

        catch (error) {
            console.log('Error', error);
        }


    }

    async function removeCart() {


        try {

            const res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: { token: localStorage.getItem('tkn') }
            })

            setNumOfCartItems(0);
            setTotalCartPrice(0);
            setCartProducts([]);

        } catch (error) {
            console.log('Error ', error);

        }

    }


    useEffect(function () {

        getUserCart();

    }, [])
    return <cartContext.Provider value={{ 
     getUserCart,
     addProductToCart,
     deleteItemFromCart,
     updateCount, 
     removeCart, 
     numOfCartItems, 
     totalCartPrice, 
     cartProducts, 
     setSendinLoader, 
     sendinLoader,
     cartId }}>

        {children}

    </cartContext.Provider>
}