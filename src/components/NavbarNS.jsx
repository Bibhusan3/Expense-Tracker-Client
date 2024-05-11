import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai' // Importing icons for menu
import { FaHome } from 'react-icons/fa' // Importing icons for home
import { MdFavorite } from 'react-icons/md' // Importing icons for favorite
import { RiContactsBookFill, RiLoginBoxFill } from "react-icons/ri"; // Importing icons for contacts and login
import { PiCashRegisterFill } from "react-icons/pi"; // Importing icons for cash register
import { Link } from 'react-router-dom'; // Importing Link component for routing
import { useAuth } from '../context/ContextProvider';

const Navbar = () => {
    // State to manage mobile menu visibility
    const [nav, setnav] = useState(false)
    const { user, setUserAndStore } = useAuth();
    console.log(user);
    return (
        <div className='max-w-[2560px] mx-auto flex justify-between items-center p-4'>
            {/* Left side of the navbar */}
            <div className='flex items-center'>
                {/* Menu icon */}
                <div onClick={() => setnav(!nav)} className='cursor-pointer'>
                    <AiOutlineMenu size={30} />
                </div>
                {/* Title */}
                <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
                    Expense <span className='font-bold text-yellow-500'>Tracker</span>
                </h1>-
            </div>

            {/* Sign in/out section */}
            {/* Visible only on large screens */}
            {user ? (
                <div className='hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]'>
                    {/* Welcome message */}
                    <p className='px-2'>Welcome, {user.username}</p>
                    {/* Logout button */}
                    <button onClick={() => setUserAndStore(null)} className={`bg-[#1E94FD] text-white rounded-full p-2 px-7 text-xl transition duration-300 hover:bg-blue-600`}>Logout</button>
                </div>
            ) : (
                <div className='hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]'>
                    {/* Login link */}
                    <Link to="/LoginPage" className={`bg-[#1E94FD] text-white rounded-full p-2 px-7 text-xl transition duration-300 hover:bg-blue-600`}>Login</Link>
                    {/* Register link */}
                    <Link to="/RegisterPage" className={`p-2 text-xl transition duration-300 hover:text-blue-600`}>Register</Link>
                </div>
            )
            }


            {/* Mobile menu */}
            {/* Overlay */}
            {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> : ''}
            {/* Slide drawer menu */}
            <div className={nav ? ' fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300' : ' fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300'}>
                {/* Close button */}
                <AiOutlineClose
                    onClick={() => setnav(!nav)} size={30} className='absolute right-4 top-4 cursor-pointer' />
                {/* Title */}
                <h2 className='text-2xl p-4'>Expense<span className='font-bold text-yellow-500'>Tracker</span></h2>
                {/* Navigation links */}
                <nav>
                    <ul className='flex flex-col p-4 text-gray-800'>
                        {/* Home link */}
                        <li className='text-xl py-4 flex'><Link to="/" className='flex items-center'><FaHome size={25} className='mr-4' /> Home </Link></li>
                        {user ? (
                            <li className='text-xl py-4 flex'><Link to="/Dashboard" className='flex items-center'><FaHome size={25} className='mr-4' /> Dashboard</Link></li>
                        ) : (
                            <><li className='text-xl py-4 flex'><Link to="/LoginPage" className='flex items-center'><RiLoginBoxFill size={25} className='mr-4' />Login</Link></li>
                                <li className='text-xl py-4 flex'><Link to="/RegisterPage" className='flex items-center'><PiCashRegisterFill size={25} className='mr-4' />Register</Link></li>
                            </>

                        )}
                        {/* Contact link */}
                        <li className='text-xl py-4 flex'><Link to="/" className='flex items-center'><RiContactsBookFill size={25} className='mr-4' />Contact Us</Link></li>
                        {/* About link */}
                        <li className='text-xl py-4 flex'><Link to="/" className='flex items-center'><MdFavorite size={25} className='mr-4' />About Us</Link></li>
                    </ul>
                </nav>
            </div>
        </div >
    )
}

export default Navbar
