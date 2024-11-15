import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id = 'footer'>
        <div className="footer-content">
            <div className="footer-content-left">
            <img src={assets.logo1} alt="" />
            <p>Your Ultimate Food Delivery Experience!
At MunchCraft, we are dedicated to bringing you the most delicious meals from your favorite local restaurants directly to your doorstep. Our platform is designed to make food ordering not just easy but also enjoyable.

With just a few simple clicks, you can explore a diverse range of cuisines, from classic comfort food to exotic international dishes. Whether you're in the mood for a hearty pizza, a fresh salad, or a mouth-watering dessert, MunchCraft has something for everyone.

We prioritize your satisfaction by offering a user-friendly interface, real-time order tracking, and speedy delivery times, ensuring that your food arrives fresh and hot. Plus, with our special promotions and loyalty rewards, you can indulge in your cravings while saving money!

Join us today at MunchCraft and elevate your dining experience. Order now and discover a world of flavors at your fingertips!</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>

            </div>
            
            <div className="footer-content-center">

                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
                
            </div>

            <div className="footer-content-right">

                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-224-556-4775</li>
                    <li>saiabhi1908@gmail.com</li>
                </ul>

            </div>

            
        </div>

      <hr />
      <p className="footer-copyright">
        Copyright 2024 @ Tomato.com, All Rights Reserved
      </p>
    </div>
  )
}

export default Footer
