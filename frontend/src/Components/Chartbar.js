import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import transaction from './Transaction.json';

function Chartbar() {
  function groupProductsByPriceRange(transaction) {
    // Define the price ranges
    const data = [
        { name: '0-100', min: 0, max: 100, quantity: 0 },
        { name: '101-200', min: 101, max: 200, quantity: 0 },
        
        { name: '201-300', min: 201, max: 300, quantity: 0 },
        { name: '301-400', min: 301, max: 400, quantity: 0 },
        { name: '401-500', min: 401, max: 500, quantity: 0 },
        { name: '501-600', min: 501, max: 600, quantity: 0 },
        { name: '601-700', min: 601, max: 700, quantity: 0 },
        { name: '701-800', min: 701, max: 800, quantity: 0 },
        { name: '801-900', min: 801, max: 900, quantity: 0 },
        { name: '901-above', min: 901, max: Infinity, quantity: 0 }
    ];

    // Iterate over each product in the transaction array
    transaction.forEach(product => {
        // Find the corresponding price range for the product
        const range = data.find(range => product.price >= range.min && product.price <= range.max);
        
        // Increment the quantity for the found range
        if (range) {
            range.quantity += 1;
        }
    });

    return data.map(range => ({ name: range.name, quantity: range.quantity }));
}

const groupedProducts = groupProductsByPriceRange(transaction);

return (
  <div className='flex justify-center items-center p-32'>
    <ResponsiveContainer width="80%" height={500}>
      <BarChart
        width={200}
        height={200}
        data={groupedProducts} // use groupedProducts here
        margin={{ top: 5, right: 60, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
}

export default Chartbar;
