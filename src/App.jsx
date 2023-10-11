import React from 'react'

import Layout from './Components/Layout/Layout'
import Products from './Components/Products/Products'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Brands from './Components/Brands/Brands'
import Categoris from './Components/Categories/Categories'
import NotFound from './Components/NotFound/NotFound'
import Profile from './Components/Profile/Profile'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/authentication'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import { CartProvider } from './Context/cartContext'
import { Toaster } from 'react-hot-toast'
import Cart from './Components/Cart/Cart'
import Payment from './Components/Payment/Payment'
import AllOrders from './Components/AllOrders/AllOrders'
import { Offline } from 'react-detect-offline'
import WishList from './Components/WishList/WishList'
import { WishListProvider } from './Context/wishlistContext'




const myRouter = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
                             
      { path: '', element: <ProtectedRoute> <Products /> </ProtectedRoute> },

      { path: 'products', element: <ProtectedRoute>  <WishListProvider> <Products/> </WishListProvider> </ProtectedRoute> },

      { path: 'brands', element: <ProtectedRoute>  <Brands /> </ProtectedRoute> },
      {
        path: 'profile', element: <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      },
      {
        path: 'ProductDetails/:id', element: <ProtectedRoute>
          <ProductDetails />
        </ProtectedRoute>
      },
      { path: 'categories', element: <ProtectedRoute>  <Categoris />  </ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute>  <Cart/> </ProtectedRoute> },
      { path: 'payment', element: <ProtectedRoute>  <Payment/> </ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute>  <AllOrders/> </ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute>  <WishListProvider> <WishList/> </WishListProvider> </ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'login/forget-password', element: <ForgetPassword /> },
      { path: 'login/verify-code', element: <VerifyCode /> },
      { path: 'login/reset-password', element: <ResetPassword /> },

      { path: '*', element: <NotFound /> },
    ]
  }
])
let clientQuery = new QueryClient()
export default function App() {
  return <>

    <QueryClientProvider client={clientQuery}>



      <CartProvider>

        <AuthProvider>

          <RouterProvider router={myRouter} />

        </AuthProvider>

      </CartProvider>
   
    <Toaster/>

    <Offline>
      <div className='position-fixed bottom-0 start-0 p-3 rounded bg-dark text-white'>Oooops you are offline now</div>
    </Offline>



    </QueryClientProvider>


  </>
}

