import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// ✅ Import images correctly for Vite
import goldSneaker from "../assets/goldsneaker.jpg";
import laptopImg from "../assets/laptop.webp";
import headsetImg from "../assets/headset.jpg"; // optional if you want 3rd image

const sliderImages = [
  { src: goldSneaker, alt: "Sneaker" },
  { src: laptopImg, alt: "Laptop" },
  { src: headsetImg, alt: "Headset" },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = sliderImages.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden h-96 md:h-[80vh]">
      {sliderImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            currentIndex === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-10"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-10"
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white scale-125" : "bg-gray-400 opacity-70"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default Hero;
