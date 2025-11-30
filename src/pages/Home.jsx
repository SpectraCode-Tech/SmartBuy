import React from 'react'
import Hero from '../components/Hero'
import ProductSlider from '../components/Products'
import ProductCards from './Product-Cards'

const Home = () => {
  return (
    <div>
      <Hero />
      <ProductSlider />
      <ProductCards />
    </div>
  )
}

export default Home
