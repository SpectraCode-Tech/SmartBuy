import React, { useState } from 'react'
import API from '../api/api'
import { useNavigate } from 'react-router-dom';

const Login = () => {
const [formData, setFormData] = useState({
  email: "",
  password: ""
});

const navigate = useNavigate()

 const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await API.post('/users/login', formData);
            alert('Login successful!');

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.user.role);

            if(res.data.user.role === 'admin'){
                navigate("/admin-dashboard")
            }else{
                navigate("/customer-dashboard")
            }


        }catch(error){
            alert(error.response?.data?.message || 'Login failed.');
        }
    } 
    return(
        <main className='h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='border p-6 w-80'>
            <h2 className='text-xl font-bold mb-4'>Login</h2>

            <input onChange={handleChange} type="email" name="email" className="border p-2 w-full mb-3" placeholder='Email'/>

            <input onChange={handleChange} type="password" name="password" className="border p-2 w-full mb-3" placeholder='Password'/>

            <button type='submit' className="bg-black text-white w-full p-2">Login</button>
            </form>
        </main>
    )}

export default Login
