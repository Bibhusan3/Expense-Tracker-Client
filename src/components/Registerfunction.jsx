import Register_pic from '../assets/Register_pic.png'; // Importing the image for the registration page
import { Link } from 'react-router-dom'; // Importing Link component for routing
import axios from 'axios'; // Importing axios for making API requests
import { useState } from 'react'; // Importing useState hook for managing form state and popup

function RegisterFunction() {
    const [username, setUsername] = useState(''); // State variable for username
    const [password, setPassword] = useState(''); // State variable for password
    const [confirmPassword, setConfirmPassword] = useState(''); // State variable for confirm password
    const [error, setError] = useState(null); // State variable to store error message (if any)

    // Function to handle registration process with validation and error handling
    const handleRegister = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Basic validation for username and password
        if (username.trim() === '') {
            setError('Username cannot be empty');
            return;
        }

        if (password.trim() === '') {
            setError('Password cannot be empty');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/v1/users/register', {
                username, // Username for registration
                password, // Password for registration
            });

            console.log(response.data); // Log response data for debugging

            // Registration successful, redirect to login page
            setError(null); // Clear any previous error messages
            window.location.href = '/LoginPage'; // Redirect on successful registration
        } catch (error) {

            setError(error.response?.data?.message || error.response.data.error || 'Registration failed'); // Set error message from API response or generic message
        }
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-full w-full'>
            {/* Left side: Image */}
            <div className='hidden sm:flex justify-center items-center'>
                <img className='object-contain max-h-full max-w-full' src={Register_pic} alt="Register_pic" />
            </div>

            {/* Right side: Form */}
            <div className='flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto p-4'>
                    {/* Title */}
                    <h2 className='text-4xl font-semibold text-center pt-6'>Welcome</h2>
                    <p className='font-semibold text-center py-5'>to the Expense Tracker Application</p>

                    {/* Username field */}
                    <div className='flex flex-col py-2'>
                        <label>Username</label>
                        <input
                            className='border p-2 rounded-xl'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Password field */}
                    <div className='flex flex-col py-2'>
                        <label>Password</label>
                        <input
                            className='border p-2 rounded-xl'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Confirm Password field */}
                    <div className='flex flex-col py-2'>
                        <label>Confirm Password</label>
                        <input
                            className='border p-2 rounded-xl'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {/* Button to create account */}
                    <button className='border w-full my-5 py-2 bg-[#1E94FD] transition duration-300 hover:bg-blue-600 text-white' onClick={handleRegister}>
                        Create account
                    </button>

                    <div>
                        <p>Already have an account?
                            <Link to="/LoginPage" className='font-semibold text-blue-500'> Login</Link>
                        </p>
                    </div>

                    {/* Error message */}
                    {error && <p className='text-red-500 text-center py-2'>{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default RegisterFunction; // Export the RegisterFunction component