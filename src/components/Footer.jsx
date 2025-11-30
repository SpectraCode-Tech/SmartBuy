import React from 'react'
import { FaApple, FaFacebook, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className='hidden md:grid md:grid-cols-4 lg:grid-cols-12 bg-gray-950 text-gray-300 p-4 gap-4'>
       <section className="col-span-9 grid grid-cols-5 gap-1">
         <div>
            <h1 className='mb-5'>ABOUT SMARTBUY</h1>
            <ul className='space-y-3'>
                <li><a href="">Contact Us</a></li>
                <li><a href="">About Us</a></li>
                <li><a href="">About Us</a></li>
                <li><a href="">Careers</a></li>
                <li><a href="">Our Blog</a></li>
                <li><a href="">Forum</a></li>
                <li><a href="">Terms & Conditions</a></li>
            </ul>
        </div>
        <div>
            <h1 className='mb-5'>PAYMENT</h1>
            <ul className='space-y-3'>
                <li><a href="">SmartPay</a></li>
                <li><a href="">Wallet</a></li>
                <li><a href="">Verve</a></li>
                <li><a href="">Mastercard</a></li>
                <li><a href="">Visa</a></li>
            </ul>
        </div>
        <div>
            <h1 className='mb-5'>BUYING ON SMARTBUY</h1>
            <ul className='space-y-3'>
                <li><a href="">Buyer Safety Center</a></li>
                <li><a href="">FAQs</a></li>
                <li><a href="">Delivery</a></li>
                <li><a href="">Smartbuy Return Policy</a></li>
                <li><a href="">Bulk Purchase</a></li>
            </ul>
        </div>
        <div>
            <h1 className='mb-5'>MORE INFO</h1>
            <ul className='space-y-3'>
                <li><a href="">Site Map</a></li>
                <li><a href="">Track My Order</a></li>
                <li><a href="">Privacy Policy</a></li>
                <li><a href="">Authentic Items Policy</a></li>
            </ul>
        </div>
        <div>
            <h1 className='mb-5'>MONEY ON SMARTBUY</h1>
            <ul className='space-y-3'>
                <li><a href="">Become A SmartBuy Affiliate</a></li>
            </ul>
        </div>
       </section>

       <section className="col-span-3 grid grid-cols-2 gap-4  ">
            <div className='flex bg-black self-start justify-center py-3.5'>
            <FaApple className='text-5xl' />
            <p>Download on <br /><strong>App Store</strong></p>
            </div>
            <div className='flex bg-black self-start justify-center py-3.5'>
           <BiLogoPlayStore className='text-5xl' />
            <p>Download on <br /><strong>Play Store</strong></p>
            </div>

            <div className='justify-center py-3.5 col-span-2'>
              <h4>CONNECT WITH US</h4>
              
             <div className='*:bg-gray-800 *:rounded-full *:p-3 flex gap-3'>
                <FaFacebookF className='text-5xl' />
                <FaXTwitter className='text-5xl' />
                <FaInstagram className='text-5xl' />
                <FaYoutube className='text-5xl' />
             </div>
            </div>
       </section>
    </div>
  )
}

export default Footer




        