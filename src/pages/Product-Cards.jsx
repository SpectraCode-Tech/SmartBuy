import React from "react";

// Sample product list
const products = [
  {
    id: 1,
    name: "Nike Air Max Sneakers",
    price: 45000,
    image: "/src/assets/goldsneaker.jpg",
  },
  {
    id: 2,
    name: "HP Pavilion Laptop",
    price: 320000,
    image: "/src/assets/laptop.webp",
  },
  {
    id: 3,
    name: "Wireless Bluetooth Headset",
    price: 15000,
    image: "/src/assets/headset.jpg",
  },
  {
    id: 4,
    name: "Casio Wrist Watch",
    price: 28000,
    image: "/src/assets/watch.jpg",
  },
  {
    id: 5,
    name: "Smart LED TV 55''",
    price: 260000,
    image: "/src/assets/tv.jpg",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 18000,
    image: "/src/assets/speaker.jpg",
  },
];

const ProductCards = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-2xl transition duration-300 border"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />

          <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
          <p className="text-gray-700 mb-3 font-medium">
            ₦{product.price.toLocaleString()}
          </p>

          <button className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;