import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link component for routing
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'; // Importing icons for menu
import { FaHome } from 'react-icons/fa'; // Importing icons for home
import { MdFavorite } from 'react-icons/md'; // Importing icons for favorite
import { RiLoginBoxFill } from 'react-icons/ri'; // Importing icons for login
import { Avatar, Dropdown } from 'flowbite-react'; // Importing Avatar and Dropdown components from Flowbite React
import Female_pic from '../assets/Female_pic.png'; // Importing the female avatar image
import { useAuth } from '../context/ContextProvider';
import { Navigate } from 'react-router-dom';

const Navbar = () => {
    const [nav, setNav] = React.useState(false); // State to manage mobile menu visibility
    const { user, setUserAndStore } = useAuth(); // Destructuring user and setUserAndStore from useAuth hook

    // Redirect to login page if user is not logged in
    if (!user) {
        return <Navigate to="/LoginPage" />;
    }


    return (
        <div className='max-w-[2560px] mx-auto flex justify-between items-center p-4'>
            {/* Left side of the navbar */}
            <div className='flex items-center'>
                {/* Menu icon */}
                <div onClick={() => setNav(!nav)} className='cursor-pointer'>
                    <AiOutlineMenu size={30} />
                </div>
                {/* Title */}
                <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
                    Expense <span className='font-bold text-yellow-500'>Tracker</span>
                </h1>
            </div>

            {/* Sign in/out section */}
            {/* Visible only on large screens */}
            <div className='hidden lg:flex items-center p-1 text-[14px]'>
                {/* Avatar and dropdown for user */}
                <div className="flex flex-wrap gap-2">
                    <Avatar img={Female_pic} alt='female.jpg' status="online" />
                </div>
                <Dropdown label={user.username} color="light">
                    {/* Dropdown items */}
                    <Dropdown.Item>Settings [coming soon]</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        {/* Link to sign out */}
                        <Link to="/" onClick={() => setUserAndStore(null)}>Sign out</Link>
                    </Dropdown.Item>
                </Dropdown>
            </div>

            {/* Mobile menu */}
            {/* Overlay */}
            {nav && <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div>}
            {/* Slide drawer menu */}
            <div className={nav ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300' : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300'}>
                {/* Close button */}
                <AiOutlineClose onClick={() => setNav(!nav)} size={30} className='absolute right-4 top-4 cursor-pointer' />
                {/* Title */}
                <h2 className='text-2xl p-4'>Expense<span className='font-bold text-yellow-500'>Tracker</span></h2>
                {/* Navigation links */}
                <nav>
                    <ul className='flex flex-col p-4 text-gray-800'>
                        {/* Dashboard link */}
                        <li className='text-xl py-4 flex'><Link to="/Dashboard" className='flex items-center'><FaHome size={25} className='mr-4' /> Dashboard</Link></li>
                        {/* Learning resource link */}
                        <li className='text-xl py-4 flex'><Link to="/Learningresource" className='flex items-center'><RiLoginBoxFill size={25} className='mr-4' />Learning resource</Link></li>
                        {/* Coming soon link */}
                        <li className='text-xl py-4 flex'><Link to="/Dashboard" className='flex items-center'><MdFavorite size={25} className='mr-4' />Coming soon!</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;
