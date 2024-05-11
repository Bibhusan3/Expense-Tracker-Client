import { useState } from 'react'; // Importing React and useState hook
import Login_pic from '../assets/Login_pic.png'; // Importing the login image
import { Link } from 'react-router-dom'; // Importing the Link component for navigation
import axios from 'axios'; // Importing axios for making API requests
import { useAuth } from '../context/ContextProvider';
import { Navigate } from 'react-router-dom';

function LoginFunction() {
    const { user, setUserAndStore } = useAuth();

    const [username, setUsername] = useState(''); // Optional: State variable for username (if needed for validation)
    const [password, setPassword] = useState(''); // Optional: State variable for password (if needed for validation)
    const [error, setError] = useState(null); // Optional: State variable for error message (if needed)

    // Function to handle login form submission (if needed)
    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Implement login logic using username and password (if using state variables)
        // Or, handle form submission without state variables based on your requirements

        // Example using a placeholder API call:
        try {
            const response = await axios.post('http://localhost:8080/api/v1/users/login', {
                username,
                password,
            }); // Log response data for debugging

            // Set user data in context and local storage
            setUserAndStore(response.data.user);


            // Login successful, redirect or display success message (based on implementation)
        } catch (error) {
            console.error(error); // Log error for debugging
            setError('Login failed'); // Set error message (replace with specific error handling)
        }
    };

    // Redirect to dashboard if user is already logged in
    if (user) {
        return <Navigate to="/Dashboard" />;
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-full w-full'>
            {/* Login image */}
            <div className='hidden sm:flex justify-center items-center'>
                <img className='object-contain max-h-full max-w-full' src={Login_pic} alt="Login_pic" />
            </div>

            {/* Login form */}
            <div className='flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto p-4'>
                    {/* Login header */}
                    <h2 className='text-4xl font-semibold text-center py-6'>Login</h2>

                    {error && (
                        <div className='text-red-500 text-center mb-4'>
                            {/* Display error message if present */}
                            {error}
                        </div>
                    )}

                    {/* Username input (optional, remove if not needed) */}
                    <div className='flex flex-col py-2'>
                        <label>Username</label>
                        <input
                            className='border p-2 rounded-xl'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Password input (optional, remove if not needed) */}
                    <div className='flex flex-col py-2'>
                        <label>Password</label>
                        <input
                            className='border p-2 rounded-xl'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className='border w-full my-5 py-2 bg-[#1E94FD] transition duration-300 hover:bg-blue-600 text-white'
                        // Replace with appropriate login logic
                        onClick={handleLogin}
                    >
                        Sign in
                    </button>

                    {/* Additional features (optional) */}
                    <div className='flex flex-col py-2'>
                        <Link to="/forgotpassword" className='text-blue-500 hover:underline'>
                            Forgot password?
                        </Link>
                        <p className='text-center'>New User? <Link to="/register" className='font-bold text-[#9947FE]'>Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginFunction;
