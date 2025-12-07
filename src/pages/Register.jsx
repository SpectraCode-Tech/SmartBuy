import React, { useState } from 'react'
import API from '../api/api'
import { useNavigate } from 'react-router-dom';


function Register(){
    const[formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await API.post('/users/register', formData);
            alert('Registration successful!');

            navigate("/dashboard")
        }catch(error){
            alert(error.response?.data?.message || 'Registration failed.');
        }
    } 
    return(
        <main className='h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='border p-6 w-80'>
            <h2 className='text-xl font-bold mb-4'>Register</h2>

            <input onChange={handleChange} type="text" name="name" className="border p-2 w-full mb-3" placeholder='Full Name'/>

            <input onChange={handleChange} type="text" name="username" className="border p-2 w-full mb-3" placeholder='Username'/>

            <input onChange={handleChange} type="email" name="email" className="border p-2 w-full mb-3" placeholder='Email'/>

            <input onChange={handleChange} type="password" name="password" className="border p-2 w-full mb-3" placeholder='Password'/>

            <button type='submit' className="bg-black text-white w-full p-2">Register</button>
            </form>
        </main>
    )}
export default Register
