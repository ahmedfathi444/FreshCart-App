import React, { useContext, useState } from 'react'
import { cartContext } from '../../Context/cartContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';

export default function Payment() {

    const { getUserCart, cartId, sendinLoader, setSendinLoader } = useContext(cartContext);

     const [paymentCardLoader, setPaymentCardLoader] = useState(false)


    async function confirmPaymentCash(cartId) {



        setSendinLoader(true);

        const phoneValue = document.querySelector('#phone').value;
        const cityValue = document.querySelector('#city').value;
        const detailsValue = document.querySelector('#details').value;

        const shippingAddress = {
            "shippingAddress": {
                "details": detailsValue,
                "phone": phoneValue,
                "city": cityValue
            }
        }

        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, shippingAddress, {
                headers: { token: localStorage.getItem('tkn') }
            })
            setSendinLoader(false);
            console.log(data.data);
            if (data.status == 'success') {
                toast.success('Confirm Successfully');
                await getUserCart()


            }

        }
        catch (error) {
            setSendinLoader(false);
            console.log('Error', error);
            toast.error('Error Occured')
        }






    }

    async function confirmPaymentCard() {

        // setSendinLoader(true);
        setPaymentCardLoader(true)

        const phoneValue = document.querySelector('#phone').value;
        const cityValue = document.querySelector('#city').value;
        const detailsValue = document.querySelector('#details').value;
   
        const shippingAddress = {
            "shippingAddress": {
                "details": detailsValue,
                "phone": phoneValue,
                "city": cityValue
            }
        }

        try {

            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, shippingAddress, {
                headers: { token: localStorage.getItem('tkn') },
                params: { url: `http://localhost:${window.location.port}` }
            })

            // setSendinLoader(false);
            setPaymentCardLoader(false)
            console.log(data.session);
             if (data.status == 'success') {
                toast.success('Confirm Successfully');
                window.open(data.session.url ,'_blank');
                await getUserCart()
            }


        } catch (error) {
            // setSendinLoader(false);
            setPaymentCardLoader(false)
            console.log('Error', error);
            toast.error('Error Occured')

        }





    }





    return <>

        <div className="container py-5">


            <label htmlFor="phone" className='ms-1 mb-1'>Phone :</label>
            <input id='phone' type="tel" className='form-control mb-3' placeholder='Phone' />

            <label htmlFor="city" className='ms-1 mb-1'>City :</label>
            <input id='city' type="text" className='form-control mb-3' placeholder='City' />

            <label htmlFor="details" className='ms-1 mb-1'>Details :</label>
            <textarea id='details' type="text" className='form-control mb-3' placeholder='Details' rows="4" cols="50"></textarea>

            <button onClick={() => (confirmPaymentCash(cartId))} className='btn btn-outline-info '>
                {sendinLoader ? <div className='d-flex justify-content-center align-items-center ' ><Bars
                    height="20"
                    width="80"
                    color="rgb(87, 169, 224)"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                /></div> : "Payment Cash"}

            </button>


            <button onClick={confirmPaymentCard} className='btn btn-outline-success ms-3'>
            {paymentCardLoader ? <div className='d-flex justify-content-center align-items-center ' ><Bars
                    height="20"
                    width="80"
                    color="#fff"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                /></div> : "Payment Card"}

            </button>








        </div>





    </>
}


