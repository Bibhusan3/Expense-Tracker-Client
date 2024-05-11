import { useState } from 'react';
import { data } from '../data/data.jsx';

const Learning_resource = () => {
    // Initialize state to hold the list of learning resources
    const [learningresources, setlearningresources] = useState(data);

    // Function to filter learning resources by category
    const filterType = (category) => {
        // Update the state with filtered learning resources based on category
        setlearningresources(
            data.filter((item) => {
                return item.category === category;
            })
        );
    };

    // Function to filter learning resources by price
    const filterPrice = (price) => {
        // Update the state with filtered learning resources based on price
        setlearningresources(
            data.filter((item) => {
                return item.price === price;
            })
        );
    };

    return (
        <div className='max-w-[1640px] m-auto px-4 py-12'>
            <h1 className='text-orange-600 font-bold text-[30px] text-center'>Free useful Tips and Fact!!</h1>

            {/* Filter by type */}
            <div>
                <p className='font-bold text-gray-700'>Filter type</p>
                <select onChange={(e) => e.target.value === "all" ? setlearningresources(data) : filterType(e.target.value)} className='m-1 border-orange-600 text-orange-600 '>
                    <option value="all">All</option>
                    <option value="saving">Saving</option>
                    <option value="investment">Investment</option>
                    <option value="fact">Facts</option>
                </select>
            </div>

            {/* Filter by price */}
            <div>
                <p className='font-bold text-gray-700'>Filter Useful tips</p>
                <select onChange={(e) => filterPrice(e.target.value)} className='m-1 border-orange-600 text-orange-600  '>
                    <option value="$">$</option>
                    <option value="$$">$$</option>
                    <option value="$$$">$$$</option>
                    <option value="$$$$">$$$$</option>
                </select>
            </div>

            {/* Display learning resources */}
            <div className='grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1 gap-6 pt-4'>
                {learningresources.map((item, index) => (
                    <div key={index} className='border shadow-lg rounded-lg hover:scale-105 duration-300'>
                        <img src={item.image} alt={item.name} className='w-full h-[200px] object-cover rounded-t-lg' />
                        <div className='flex justify-between px-2 py-4'>
                            <p className='font-bold'>{item.name}</p>
                            <p>
                                <span className='bg-orange-500 text-white p-1 rounded-full'>{item.price}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Learning_resource;