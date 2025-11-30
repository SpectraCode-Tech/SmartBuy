import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const products = [
  { id: 1, name: "Nike Air Max Sneakers", price: 45000, image: "/src/assets/goldsneaker.jpg" },
  { id: 2, name: "HP Pavilion Laptop", price: 320000, image: "/src/assets/laptop.webp" },
  { id: 3, name: "Wireless Bluetooth Headset", price: 15000, image: "/src/assets/headset.jpg" },
  { id: 4, name: "Casio Wrist Watch", price: 28000, image: "/src/assets/watch.jpg" },
  { id: 5, name: "Dell Inspiron", price: 295000, image: "/src/assets/laptop2.jpg" },
  { id: 6, name: "Beats Studio Headphones", price: 80000, image: "/src/assets/headset2.jpg" },
  { id: 7, name: "Timberland Boots", price: 65000, image: "/src/assets/boot.jpg" },
  { id: 8, name: "Samsung Smartwatch", price: 90000, image: "/src/assets/swatch.jpg" },
];

const ITEMS_PER_PAGE = 4;
const ROTATION_INTERVAL_MS = 5000; // SLOWER NOW (5 seconds)

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
    }, 350); // match transition duration
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
      {/* Container with smooth slide animation */}
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

      {/* Navigation */}
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

      {/* Indicators */}
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
