import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// ✅ Import all product images
import goldSneaker from "../assets/goldsneaker.jpg";
import laptop1 from "../assets/laptop.webp";
import headset1 from "../assets/headset.jpg";
import watch from "../assets/watch.jpg";
import laptop2 from "../assets/laptop.webp";
import headset2 from "../assets/headset.jpg";
import boot from "../assets/boot.jpg";
import swatch from "../assets/watch.jpg";

const products = [
  { id: 1, name: "Nike Air Max Sneakers", price: 45000, image: goldSneaker },
  { id: 2, name: "HP Pavilion Laptop", price: 320000, image: laptop1 },
  { id: 3, name: "Wireless Bluetooth Headset", price: 15000, image: headset1 },
  { id: 4, name: "Casio Wrist Watch", price: 28000, image: watch },
  { id: 5, name: "Dell Inspiron", price: 295000, image: laptop2 },
  { id: 6, name: "Beats Studio Headphones", price: 80000, image: headset2 },
  { id: 7, name: "Timberland Boots", price: 65000, image: boot },
  { id: 8, name: "Samsung Smartwatch", price: 90000, image: swatch },
];

const ITEMS_PER_PAGE = 4;
const ROTATION_INTERVAL_MS = 5000;

const ProductGridCarouselAuto = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animate, setAnimate] = useState(false);
  const intervalRef = useRef(null);

  const nextStep = () => {
    setAnimate(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
      setAnimate(false);
    }, 350);
  };

  const prevStep = () => {
    setAnimate(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
      setAnimate(false);
    }, 350);
  };

  const getVisibleProducts = () => {
    const end = currentIndex + ITEMS_PER_PAGE;
    if (end <= products.length) {
      return products.slice(currentIndex, end);
    }
    return [...products.slice(currentIndex), ...products.slice(0, end - products.length)];
  };

  const visibleProducts = getVisibleProducts();

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => nextStep(), ROTATION_INTERVAL_MS);
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const activePage = Math.floor(currentIndex / ITEMS_PER_PAGE);

  return (
    <div
      className="w-full max-w-6xl mx-auto relative p-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500 ${
          animate ? "opacity-0 -translate-x-3" : "opacity-100 translate-x-0"
        }`}
      >
        {visibleProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-xl p-4 text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 mb-3">₦{product.price.toLocaleString()}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={prevStep}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black bg-opacity-40 p-3 text-white rounded-full hover:bg-opacity-80"
      >
        <ArrowLeft />
      </button>

      <button
        onClick={nextStep}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black bg-opacity-40 p-3 text-white rounded-full hover:bg-opacity-80"
      >
        <ArrowRight />
      </button>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index * ITEMS_PER_PAGE)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
              activePage === index ? "bg-blue-600 scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGridCarouselAuto;
