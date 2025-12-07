import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    stock: 1, // default stock
  });

  const [image, setImage] = useState(null);

  // Only allow admin
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Access denied. Admin Only.");
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("condition", formData.condition);
      data.append("stock", formData.stock);
      if (image) data.append("image", image);

      await API.post("/products/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product added successfully ✅");
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        condition: "",
        stock: 1,
      });
      setImage(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product ❌");
    }
  };

  return (
    <div className='h-screen flex items-center justify-center bg-blue-950'>
      <form onSubmit={handleSubmit} className='rounded bg-white border p-6 w-96'>
        <h2 className='text-2xl font-bold mb-4'>Add New Product</h2>

        <input
          value={formData.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder='Product name'
          className='border p-2 w-full mb-3 rounded'
          required
        />

        <input
          value={formData.description}
          onChange={handleChange}
          type="text"
          name="description"
          placeholder='Product description'
          className='border p-2 w-full mb-3 rounded'
          required
        />

        <input
          value={formData.price}
          onChange={handleChange}
          type="number"
          name="price"
          placeholder='Product price'
          className='border p-2 w-full mb-3 rounded'
          required
        />

        <input
          value={formData.stock}
          onChange={handleChange}
          type="number"
          name="stock"
          placeholder='Stock quantity'
          className='border p-2 w-full mb-3 rounded'
          min={0}
          required
        />

        <select
          value={formData.category}
          onChange={handleChange}
          name="category"
          className='border p-2 w-full mb-3 rounded'
          required
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="beauty">Beauty</option>
          <option value="fashion">Fashion</option>
          <option value="houseware">Houseware</option>
          <option value="others">Others</option>
        </select>

        <select
          value={formData.condition}
          onChange={handleChange}
          name="condition"
          className='border p-2 w-full mb-3 rounded'
          required
        >
          <option value="">Select Condition</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className='mb-3'
          required
        />

        <button
          type="submit"
          className='bg-blue-950 text-white w-full p-2 rounded hover:bg-amber-700 hover:text-cyan-950'
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
