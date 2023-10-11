import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myLogo from '../../images/freshcart-logo.svg'
import { authContext } from '../../Context/authentication'
import { cartContext } from '../../Context/cartContext';

export default function Navbar() {

  const { token, setToken } = useContext(authContext);
 const{numOfCartItems}= useContext(cartContext);

  const navigateToLogin = useNavigate()

  function logOut() {
    console.log("LogOut");
    localStorage.removeItem("tkn")
    setToken(null)
    navigateToLogin("/login")

  }




  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="#">
          <img src={myLogo} alt="" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mx-auto mb-lg-0">


            {token ? <>  <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/products">Home</Link>
            </li>

              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/categories">Categories</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link position-relative" to="/cart">
                  Cart
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {numOfCartItems}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/brands">Brands</Link>
              </li> 
              
              <li className="nav-item">
                <Link className="nav-link" to="/allorders">AllOrders</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/wishlist">WishList  </Link>
              </li>
              </> : ''}

             




          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">

            <li className=' d-flex justify-content-center align-items-center'>
              <i className='fa-brands me-2 fa-facebook'></i>
              <i className='fa-brands me-2 fa-whatsapp'></i>
              <i className='fa-brands me-2 fa-twitter'></i>
              <i className='fa-brands me-2 fa-linkedin'></i>
            </li>

            {token ? <>
              <li className="nav-item">
                <Link className="nav-link" to="/Profile">Profile</Link>
              </li>

              <li className="nav-item">
                <span onClick={logOut} style={{ cursor: 'pointer' }} className='nav-link'>Logout</span>
              </li>

            </> : <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>}





          </ul>






        </div>
      </div>
    </nav>



  </>
}
