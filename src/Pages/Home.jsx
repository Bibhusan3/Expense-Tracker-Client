import React from 'react';
import Navbar from '../components/NavbarNS'; // Importing the custom Navbar component
import index from '../assets/Index.png'; // Importing the index image
import { Link } from 'react-router-dom'; // Importing Link component for routing

function Home() {
    return (
        <div>
            {/* Rendering the Navbar component */}
            <Navbar />
            {/* Main content grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 h-full w-full'>
                {/* Right side */}
                <div className='flex flex-col justify-center'>
                    {/* Form for displaying information */}
                    <form className='max-w-[600px] w-full mx-auto p-4'>
                        {/* Title */}
                        <h1 className='text-[90px] font-semibold text-yellow-300'>Money</h1>
                        <p className='text-[70px]'>Tracker</p>
                        {/* Description */}
                        <p className='mt-3 text-gray-500'>If you are facing financial issues like "Where has my money gone?",</p>
                        <p className='text-gray-500'>"How to save money?", or "I forget how did I spend last month?",</p>
                        <p className='text-gray-500'>All of these examples can be solved by using</p>
                        <p className='text-gray-500'>Expense Tracker to track your own money!</p>
                        {/* Login and Register buttons */}
                        <button className='border rounded-[30px] text-xl my-5 p-[20px] mr-2 mt-2 bg-[#1E94FD] transition duration-300 hover:bg-blue-600 text-white '>
                            <Link to="/LoginPage">Login</Link>
                        </button>
                        <button className='border rounded-[30px] text-xl my-5 p-[20px] bg-[#1E94FD] transition duration-300 hover:bg-blue-600 text-white '>
                            <Link to="/RegisterPage">Register</Link>
                        </button>
                    </form>
                </div>
                {/* Left side */}
                <div className='hidden sm:flex justify-center items-center'>
                    {/* Displaying the index image */}
                    <img className='object-contain max-h-full max-w-full' src={index} alt="index_pic" />
                </div>
            </div>
        </div>
    );
}

export default Home;
