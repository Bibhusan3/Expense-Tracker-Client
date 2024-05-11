// import React, { useState } from 'react';
// import Male_pic from '../assets/Male_pic.png'; // Importing the male profile picture
// import Female_pic from '../assets/Female_pic.png'; // Importing the female profile picture
// import { Link } from 'react-router-dom'; // Importing Link component for routing
// import Select from 'react-select'; // Importing Select component for dropdown selection

// function UserInformation() {
//     const [gender, setGender] = useState(""); // State to manage the selected gender

//     // Options for gender selection dropdown
//     const options = [
//         { value: 'Male', label: 'Male' },
//         { value: 'Female', label: 'Female' }
//     ];

//     // Function to handle gender selection change
//     const handleChange = selectedOption => {
//         setGender(selectedOption.value);
//     };

//     return (
//         <div className='grid grid-cols-1 sm:grid-cols-2 h-full w-full'>
//             {/* Left side: Profile picture */}
//             <div className='hidden sm:flex justify-center items-center relative'>
//                 {/* Displaying profile picture based on selected gender */}
//                 <img className='object-contain max-h-full max-w-full' src={gender === "Male" ? Male_pic : Female_pic} alt="Register_pic" />
//             </div>
//             {/* Right side: User information form */}
//             <div className='flex flex-col justify-center'>
//                 <form className='max-w-[400px] w-full mx-auto p-4'>
//                     {/* Title */}
//                     <h2 className='text-4xl font-semibold text-center pt-6'>User-Information</h2>
//                     {/* Placeholder for ID (to be added) */}
//                     <p className='font-semibold text-center py-5'>ID : 2437682374 [need to be add]</p>
//                     {/* Name input field */}
//                     <div className='flex flex-col py-2'>
//                         <label>Name</label>
//                         <input className='border p-2 rounded-xl' type="text" />
//                     </div>
//                     {/* Surname input field */}
//                     <div className='flex flex-col py-2'>
//                         <label>Surname</label>
//                         <input className='border p-2 rounded-xl' type="text" />
//                     </div>
//                     {/* Age input field */}
//                     <div className='flex flex-col py-2'>
//                         <label>Age</label>
//                         <input className='border p-2 rounded-xl' type="number" min="0" />
//                     </div>
//                     {/* Gender selection dropdown */}
//                     <div className='flex flex-col py-2'>
//                         <label>Sex</label>
//                         <Select
//                             options={options}
//                             onChange={handleChange}
//                             value={options.find(option => option.value === gender)}
//                         />
//                     </div>
//                     {/* Button to create account */}
//                     <button className={'border w-full my-5 py-2 bg-[#1E94FD] transition duration-300 hover:bg-blue-600 text-white '}>Create account</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default UserInformation;
