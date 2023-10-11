import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";

export const wishListContext = createContext();

export function WishListProvider({ children }) {

    const [wishListItems, setWishListItems] = useState(null)

    useEffect(function () {
        getUserWishList();
    }, [])


    async function getUserWishList() {

        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
                headers: { token: localStorage.getItem('tkn') }
            })
            console.log(data.data);
            setWishListItems(data?.data)
            console.log(wishListItems);
            return data

        } catch (error) {
            console.log('Error',error);

        }

    }
   

    async function addProductToWishList(productId) {

        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
                {
                    "productId": productId
                },
                {
                    headers: { token: localStorage.getItem('tkn') }

                })

            console.log(data);
            return data

        } catch (error) {

            console.log('Error ', error);

        }

    }

    async function deleteItemFromWishList(productId) {

        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,

                {
                    headers: { token: localStorage.getItem('tkn') }

                })

                console.log(data);
                return data

        } catch (error) {
            toast.error('Product No Remove from Wishlist')
            console.log('Error ', error);

        }

    }



    return <wishListContext.Provider value={{ wishListItems, getUserWishList, addProductToWishList, deleteItemFromWishList }}>

        {children}

    </wishListContext.Provider>
}
